import { MOVE_CHIP } from '../actions/ChipsActions'

const initialChips = [{
  chipId: 0,
  kind: 'ball',
  top: 0,
  left: 0
}, {
  chipId: 1,
  kind: 'player',
  team: 0,
  top: 50,
  left: 50
}, {
  chipId: 2,
  kind: 'player',
  team: 1,
  top: 0,
  left: 50
}]

const moveChip = (chips, action) => {
  const { top, left } = action
  return chips.map((chip) => {
    if (chip.chipId === action.chipId) {
      return {...chip, top, left}
    } else {
      return chip
    }
  })
}

const chips = (state = initialChips, action) => {
  switch (action.type) {
    case MOVE_CHIP:
      return moveChip(state, action)
    default:
      return state
  }
}

export default chips
