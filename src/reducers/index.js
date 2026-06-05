import { combineReducers } from 'redux';
import app from './app';
import settings from './settings';

export default combineReducers({
  settings,
  app,
});
