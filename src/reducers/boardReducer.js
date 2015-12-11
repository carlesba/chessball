import { SHOW_MOVE, CLEAN_HIGHLIGHTS } from '../actions/ChipsActions'

import {cleanHighlightsReducer} from './actionsReducers/cleanHighlightsReducer'
import showMovesReducer from './actionsReducers/showMovesReducer'

import boardDataBuilder from '../builders/boardDataBuilder'

const defaultBoardData = boardDataBuilder()

const board = (state = defaultBoardData, action) => {
  switch (action.type) {
    case SHOW_MOVE:
      return showMovesReducer(state, action)
    case CLEAN_HIGHLIGHTS:
      return cleanHighlightsReducer(state)
    default:
      state
  }
  return state
}

export default board
