import {createChips} from 'src/models'
import createReducer from 'src/lib/createReducer'
import {SELECT_CHIP, MOVE_SELECTED_CHIP, TEAM_A, TEAM_B} from 'src/constants'

const initialState = createChips([
  {position: [7, 5], team: null, type: 'ball'},
  {position: [2, 5], team: TEAM_A, type: 'player', isKeeper: true},
  {position: [4, 3], team: TEAM_A, type: 'player'},
  {position: [4, 7], team: TEAM_A, type: 'player'},
  {position: [6, 1], team: TEAM_A, type: 'player'},
  {position: [6, 9], team: TEAM_A, type: 'player'},
  {position: [12, 5], team: TEAM_B, type: 'player', isKeeper: true},
  {position: [10, 3], team: TEAM_B, type: 'player'},
  {position: [10, 7], team: TEAM_B, type: 'player'},
  {position: [8, 1], team: TEAM_B, type: 'player'},
  {position: [8, 9], team: TEAM_B, type: 'player'}
])

const reducerMap = {
  [SELECT_CHIP]: (state, {chipId}) => {
    const prevSelectedChipIndex = state.findIndex(({isSelected}) => isSelected)
    const targetChipIndex = state.findIndex(({id}) => id === chipId)
    return prevSelectedChipIndex < 0
      ? state.setIn([targetChipIndex, 'isSelected'], true)
      : state
        .setIn([prevSelectedChipIndex, 'isSelected'], false)
        .setIn([targetChipIndex, 'isSelected'], true)
  },
  [MOVE_SELECTED_CHIP]: (state, {deltaPosition}) => {
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
