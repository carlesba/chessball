import { MOVE_CHIP, SHOW_MOVE } from '../actions/ChipsActions'
import { moveChipReducer } from './actionsReducers/moveChipReducer'
import showMovesReducer from './actionsReducers/showMovesReducer'
import boardDataBuilder from '../builders/boardDataBuilder'

const defaultBoardData = boardDataBuilder()
const initialChips = [{
  chipId: 0,
  kind: 'ball',
  row: 3,
  col: 3
}, {
  chipId: 1,
  kind: 'player',
  team: 0,
  row: 6,
  col: 4
}, {
  chipId: 2,
  kind: 'player',
  team: 1,
  row: 5,
  col: 5
}]
const defaultState = {
  board: defaultBoardData,
  chips: initialChips,
  highlights: []
}

// TODO: update this to be able to read other parts of the state from any reducer
// export default combineReducers({ chips, board, highlights })
const indexReducer = (state = defaultState, action) => {
  const {chips, highlights} = state
  switch (action.type) {
    case MOVE_CHIP:
      return Object.assign({}, state, {
        highlights: [],
        chips: moveChipReducer(chips, action, highlights)
      })
    case SHOW_MOVE:
      return Object.assign({}, state, {
        highlights: showMovesReducer(action.chip, chips)
      })
    default:
      return state
  }
}
export default indexReducer
