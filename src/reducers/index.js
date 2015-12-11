import { combineReducers } from 'redux'
import {default as chips} from './chipsReducer'
import {default as board} from './boardReducer'
import {default as highlights} from './highlightsReducer'

export default combineReducers({ chips, board, highlights })
