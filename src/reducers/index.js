import { MOVE_CHIP, SHOW_MOVES } from '../actions/ChipsActions'
import boardDataBuilder from '../builders/boardDataBuilder'
import defaultChips from '../builders/defaultChips'
import moveChipReducer from './moveChipReducer'
import showMovesReducer from './showMovesReducer'

const defaultBoardData = boardDataBuilder()
const defaultGame = {
  turnOwner: 0,
  ballOwner: null,
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
  const {chips, game} = state
  switch (action.type) {
    case MOVE_CHIP:
      return Object.assign({}, state, moveChipReducer(state, action))
    case SHOW_MOVES:
      return Object.assign({}, state, {
        highlights: showMovesReducer(action.chip, chips, game)
      })
    default:
      return state
  }
}
export default indexReducer
