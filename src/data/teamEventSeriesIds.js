// @flow

// Series IDs for team events (minimum 2 members required).
// Uses seriesid (stable across seasons), not seasonid (which changes each season).
// Update each season as series are added or discontinued.
const teamEventSeriesIds: Set<number> = new Set([
  331, // Global Endurance Tour
  275, // Nurburgring Endurance Championship
  584, // Production Endurance Challenge
  237, // GT Endurance Series by Simucube
]);

export default teamEventSeriesIds;
