import createReducer from 'src/lib/createReducer'
import {
  SCORE,
  MOVE_PLAYER,
  MOVE_BALL,
  PASS_BALL,
  MOVE_BALL_TO_BONUS
} from 'src/constants'

const initialState = 0

const reducerMap = {
  [PASS_BALL]: (state) => state + 1,
  [MOVE_PLAYER]: (state) => initialState,
  [MOVE_BALL]: (state) => initialState,
  [MOVE_BALL_TO_BONUS]: (state) => initialState,
  [SCORE]: (state) => initialState
}

export default createReducer(reducerMap, initialState)
