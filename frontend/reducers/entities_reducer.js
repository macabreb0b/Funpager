import { combineReducers } from 'redux';

import widgetsReducer from './widgets_reducer';
import pagesReducer from './pages_reducer';

export default combineReducers({
  widgets: widgetsReducer,
  pages: pagesReducer
})