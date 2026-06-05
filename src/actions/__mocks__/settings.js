export const UPDATE_FILTERS = 'SETTINGS/UPDATE_FILTERS';
export const RESET_FILTERS = 'SETTINGS/RESET_FILTERS';
export const RESET_SETTINGS = 'SETTINGS/RESET_SETTINGS';
export const UPDATE_SETTING = 'SETTINGS/UPDATE_SETTING';

export const updateFilters = jest.fn((filters) => ({ type: UPDATE_FILTERS, payload: { filters } }));
export const resetFilters = jest.fn(() => ({ type: RESET_FILTERS }));
export const resetSettings = jest.fn(() => ({ type: RESET_SETTINGS }));
export const updateSetting = jest.fn((key, value) => ({ type: UPDATE_SETTING, payload: { key, value } }));
