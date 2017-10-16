import { combineReducers } from 'redux';

import widgetsReducer from './WidgetsReducer';
import pagesReducer from './PageReducer';

export default combineReducers({
  widgets: widgetsReducer,
  pages: pagesReducer
})