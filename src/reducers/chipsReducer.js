// import { MOVE_CHIP } from '../actions/ChipsActions'

const initialChips = [{
  chipId: 0,
  kind: 'ball'
}, {
  chipId: 1,
  kind: 'player',
  team: 0
}, {
  chipId: 2,
  kind: 'player',
  team: 1
}]

// const moveChip = (chips, action) => {
//   const { chipId, rows, cols } = action
//   return chips.map((chip) => {
//     if (chip.chipId === chipId) {
//       return {...chip, top, left}
//     } else {
//       return chip
//     }
//   })
// }

const chips = (state = initialChips, action) => {
  return state
  // switch (action.type) {
  //   case MOVE_CHIP:
  //     return moveChip(state, action)
  //   default:
  //     return state
  // }
}

export default chips
