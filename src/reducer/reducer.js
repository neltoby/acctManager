import {enableMapSet} from 'immer'
import { combineReducers } from 'redux'
import createReducer from './createReducer'
import transReducer from './transReducer'
import homeReducer from './homeReducer'
import tokenReducer from './tokenReducer'

enableMapSet()
export default combineReducers({
  create: createReducer,
  trans: transReducer,
  home: homeReducer,
  token: tokenReducer,
})