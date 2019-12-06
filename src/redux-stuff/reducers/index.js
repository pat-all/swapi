import { combineReducers } from 'redux'

import categoriesReducer from './category-slice'
import errorsReducer from './error-slice'
import featuresSlice from './features-slice'

export default combineReducers({
  features: featuresSlice,
  errors: errorsReducer,
  categories: categoriesReducer,
});