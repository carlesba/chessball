import { MOVE_CHIP } from '../actions/ChipsActions'
import { moveChipReducer } from './boardReducerUtils'
import boardDataBuilder from '../builders/boardDataBuilder'

const defaultBoardData = boardDataBuilder()

const board = (state = defaultBoardData, action) => {
  switch (action.type) {
    case MOVE_CHIP:
      return moveChipReducer(state, action)
    default:
      state
  }
  return state
}

export default board
