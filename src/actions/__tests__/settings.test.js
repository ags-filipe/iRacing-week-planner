import { describe, test } from '@jest/globals';

import {
  RESET_FILTERS,
  RESET_SETTINGS,
  UPDATE_FILTERS,
  UPDATE_SETTING,
  resetFilters,
  resetSettings,
  updateFilters,
  updateSetting,
} from '../settings';

describe('settingsActions', () => {
  test('resetSettings', () => {
    expect(resetSettings()).toEqual({ type: RESET_SETTINGS });
  });

  test('updateSetting', () => {
    expect(updateSetting('jonHamm', true)).toEqual({
      type: UPDATE_SETTING,
      payload: { key: 'jonHamm', value: true },
    });
  });

  test('resetFilters', () => {
    expect(resetFilters()).toEqual({ type: RESET_FILTERS });
  });

  test('updateFilters', () => {
    expect(updateFilters({ road: true })).toEqual({
      type: UPDATE_FILTERS,
      payload: { filters: { road: true } },
    });
  });
});
