import {freeze} from 'freezr'
import {SCORE, TEAM_A, TEAM_B} from 'src/constants'
const initialState = freeze({
  [TEAM_A]: 0,
  [TEAM_B]: 0
})

function scoreReducer (state = initialState, {type, payload}) {
  if (type !== SCORE) return state
  const {team} = payload
  return state.updateIn([team], (teamScore) => teamScore + 1)
}

export default scoreReducer
