import { PASS_BALL } from 'src/constants'

const initialState = 0

export default function passCountReducer (state = initialState, action) {
  if (action.type === PASS_BALL) return state + 1
  else return initialState
}
