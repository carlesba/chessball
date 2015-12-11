import { MOVE_CHIP, SHOW_MOVE } from '../actions/ChipsActions'
import boardDataBuilder from '../builders/boardDataBuilder'
import defaultChips from '../builders/defaultChips'
import moveChipReducer from './actionsReducers/moveChipReducer'
import showMovesReducer from './actionsReducers/showMovesReducer'
import gameReducer from './actionsReducers/gameReducer'

const defaultBoardData = boardDataBuilder()
const defaultGame = {
  turnOwner: 0,
  scoreTeamA: 0,
  scoreTeamB: 0
}
const defaultState = {
  board: defaultBoardData,
  chips: defaultChips,
  highlights: [],
  game: defaultGame
}

const indexReducer = (state = defaultState, action) => {
  const {chips, highlights} = state
  switch (action.type) {
    case MOVE_CHIP:
      return Object.assign({}, state, {
        highlights: [],
        chips: moveChipReducer(chips, action, highlights),
        game: gameReducer(state, action)
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
