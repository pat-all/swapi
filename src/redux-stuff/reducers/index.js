import {combineReducers} from 'redux'

import categoriesReducer from './category-slice'
import errorsReducer from './error-slice'

export default combineReducers({
  errors: errorsReducer,
  categories: categoriesReducer,
});