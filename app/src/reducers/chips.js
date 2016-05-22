import {createChips} from 'src/models'
import createReducer from 'src/lib/createReducer'

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

const reducerMap = {
  SELECT_CHIP: (state, {chipId}) => {
    const prevSelectedChipIndex = state.findIndex(({isSelected}) => isSelected)
    const targetChipIndex = state.findIndex(({id}) => id === chipId)
    return prevSelectedChipIndex < 0
      ? state.setIn([targetChipIndex, 'isSelected'], true)
      : state
        .setIn([prevSelectedChipIndex, 'isSelected'], false)
        .setIn([targetChipIndex, 'isSelected'], true)
  },
  MOVE_SELECTED_CHIP: (state, {deltaPosition}) => {
    const selectedPlayerIndex = state.findIndex(({isSelected}) => isSelected)
    return selectedPlayerIndex < 0
      ? state
      : state.updateIn(
        [selectedPlayerIndex, 'position'],
        ([a, b]) => [a + deltaPosition[0], b + deltaPosition[1]]
      )
  }
}

export default createReducer(reducerMap, initialState)
