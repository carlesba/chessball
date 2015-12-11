import { combineReducers } from 'redux'
import {default as chips} from './chipsReducer'
import {default as board} from './boardReducer'
import {default as highlights} from './highlightsReducer'
// TODO: update this to be able to read other parts of the state from any reducer
export default combineReducers({ chips, board, highlights })
