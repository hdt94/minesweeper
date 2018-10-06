import { combineReducers } from 'redux';
import dashboard from './dashboard';
import hidden from './hidden';
import status from './status';

export default combineReducers({
  dashboard,
  hidden,
  status,
});
