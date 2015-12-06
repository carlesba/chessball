import { MOVE_CHIP, SHOW_MOVE, CLEAN_HIGHLIGHTS } from '../actions/ChipsActions'
import {
  moveChipReducer,
  showMoves,
  cleanHighlights
} from './boardReducerUtils'
import boardDataBuilder from '../builders/boardDataBuilder'

const defaultBoardData = boardDataBuilder()

const board = (state = defaultBoardData, action) => {
  switch (action.type) {
    case MOVE_CHIP:
      return cleanHighlights(moveChipReducer(state, action))
    case SHOW_MOVE:
      return showMoves(state, action)
    case CLEAN_HIGHLIGHTS:
      return cleanHighlights(state)
    default:
      state
  }
  return state
}

export default board
