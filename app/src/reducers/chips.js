import {createChips} from 'src/models'

const initialState = createChips([
  {position: [0, 0], team: null, type: 'ball'},
  {position: [0, 0], team: 0, type: 'player', isKeeper: true},
  {position: [0, 0], team: 0, type: 'player'},
  {position: [0, 0], team: 0, type: 'player'},
  {position: [0, 0], team: 0, type: 'player'},
  {position: [0, 0], team: 0, type: 'player'},
  {position: [0, 0], team: 1, type: 'player', isKeeper: true},
  {position: [0, 0], team: 1, type: 'player'},
  {position: [0, 0], team: 1, type: 'player'},
  {position: [0, 0], team: 1, type: 'player'},
  {position: [0, 0], team: 1, type: 'player'}
])

function chipsReducer (state = initialState, action) {
  return state
}

export default chipsReducer
