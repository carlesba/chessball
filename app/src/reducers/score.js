import {freeze} from 'freezr'
const initialState = freeze([0, 0])

function scoreReducer (state = initialState, action) {
  return state
}

export default scoreReducer
