import { MOVE_CHIP, SHOW_MOVES, CLEAN_MOVEMENTS } from '../actions/ChipsActions'
import {MAX_BALL_PASSES} from '../utils/constants'
import boardDataBuilder from '../builders/boardDataBuilder'
import defaultChips from '../builders/defaultChips'
import moveChipReducer from './moveChipReducer'
import showMovesReducer from './showMovesReducer'
import {update} from '../utils/immutable'

const defaultBoardData = boardDataBuilder()
const defaultGame = {
  turnOwner: 0,
  ballOwner: null,
  scoreTeamA: 0,
  scoreTeamB: 0,
  ballPasses: MAX_BALL_PASSES
}
const defaultState = {
  board: defaultBoardData,
  chips: defaultChips,
  movements: [],
  game: defaultGame
}

const indexReducer = (state = defaultState, action) => {
  switch (action.type) {
    case MOVE_CHIP:
      return update(state, moveChipReducer(state, action))
    case SHOW_MOVES:
      return update(state, showMovesReducer(state, action))
    case CLEAN_MOVEMENTS:
      return update(state, {movements: []})
    default:
      return state
  }
}
export default indexReducer
