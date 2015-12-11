import { SHOW_MOVE, CLEAN_HIGHLIGHTS } from '../actions/ChipsActions'
import { BOARD_ROWS, BOARD_COLS } from '../utils/constants'
import { calculatePositionsFrom } from '../utils/position'

const showMovesReducer = (state, action) => {
  const {chip} = action
  const highlights = calculatePositionsFrom(chip)
    .filter(({row, col}) => {
      return (
        col >= 0 &&
        col < BOARD_COLS &&
        row > 0 &&
        row < BOARD_ROWS
      )
    })
  return highlights
}

const defaultHighlights = []

const highlights = (state = defaultHighlights, action) => {
  switch (action.type) {
    case SHOW_MOVE:
      return showMovesReducer(state, action)
    case CLEAN_HIGHLIGHTS:
      return defaultHighlights
    default:
      state
  }
  return state
}

export default highlights
