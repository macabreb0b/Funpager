import { combineReducers } from 'redux';

import entitiesReducer from './EntitiesReducer';

export default combineReducers({
  entities: entitiesReducer,
})