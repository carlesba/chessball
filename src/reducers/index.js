import { combineReducers } from 'redux'
import {default as chips} from './chipsReducer'
import {default as board} from './boardReducer'

export default combineReducers({ chips, board })
