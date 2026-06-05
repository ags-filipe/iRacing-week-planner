#!/usr/bin/env python3
"""
Extract iRacing season data from the live iracing-week-planner site bundle.
No authentication required.

Usage: python scrape.py
"""

import json
import re
import sys
import requests
from pathlib import Path

OUTPUT_DIR = Path(__file__).parent / "src" / "data"
SITE_URL = "https://iracing-week-planner.tmo.lol"


def fetch_bundle():
    print("Fetching page...")
    resp = requests.get(SITE_URL + "/")
    resp.raise_for_status()

    match = re.search(r'src="(/main\.js[^"]*)"', resp.text)
    if not match:
        raise ValueError("Could not find main.js in page HTML")

    bundle_url = SITE_URL + match.group(1)
    print(f"Fetching bundle: {bundle_url}")
    resp = requests.get(bundle_url)
    resp.raise_for_status()
    return resp.text


def unescape_js_string(s):
    def replace(m):
        c = m.group(1)
        if c == "'":  return "'"
        if c == "\\":  return "\\"
        if c == "n":  return "\n"
        if c == "r":  return "\r"
        if c == "t":  return "\t"
        if c == "/":  return "/"
        if len(c) == 5 and c[0] == "u":
            return chr(int(c[1:], 16))
        return m.group(0)
    return re.sub(r"\\(.)", replace, s)


def extract_json_blocks(bundle):
    pattern = re.compile(r"JSON\.parse\('((?:[^'\\]|\\.)*)'\)", re.DOTALL)
    blocks = []
    for m in pattern.finditer(bundle):
        try:
            data = json.loads(unescape_js_string(m.group(1)))
            if isinstance(data, list) and data:
                blocks.append(data)
        except (json.JSONDecodeError, ValueError):
            pass
    return blocks


def save_blocks(blocks):
    saved = []
    for data in blocks:
        first = data[0]
        if not isinstance(first, dict):
            continue

        if "seriesid" in first:
            name, label = "season.json", f"{len(data)} series"
        elif "freeWithSubscription" in first:
            name, label = "cars.json", f"{len(data)} cars"
        elif "pkgid" in first and "primaryType" in first:
            name, label = "tracks.json", f"{len(data)} tracks"
        elif "login" in first:
            name, label = "contributors.json", f"{len(data)} contributors"
        else:
            continue

        (OUTPUT_DIR / name).write_text(json.dumps(data, indent=2), encoding="utf-8")
        print(f"  {name}: {label}")
        saved.append(name)

    return saved


def main():
    OUTPUT_DIR.mkdir(exist_ok=True)
    bundle = fetch_bundle()
    blocks = extract_json_blocks(bundle)

    if not blocks:
        print("ERROR: no JSON.parse blocks found in bundle", file=sys.stderr)
        sys.exit(1)

    print(f"Found {len(blocks)} data blocks, saving...")
    saved = save_blocks(blocks)

    missing = {"cars.json", "tracks.json", "season.json"} - set(saved)
    if missing:
        print(f"WARNING: could not identify blocks for: {', '.join(missing)}", file=sys.stderr)
        sys.exit(1)

    print("\nDone! Run 'yarn start' to launch the app.")


if __name__ == "__main__":
    main()
