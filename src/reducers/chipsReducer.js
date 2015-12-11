import { MOVE_CHIP } from '../actions/ChipsActions'
import { moveChipReducer } from './actionsReducers/moveChipReducer'

const initialChips = [{
  chipId: 0,
  kind: 'ball',
  row: 3,
  col: 3
}, {
  chipId: 1,
  kind: 'player',
  team: 0,
  row: 6,
  col: 4
}, {
  chipId: 2,
  kind: 'player',
  team: 1,
  row: 5,
  col: 5
}]

const chips = (state = initialChips, action) => {
  switch (action.type) {
    case MOVE_CHIP:
      return moveChipReducer(state, action)
    default:
      return state
  }
}

export default chips
