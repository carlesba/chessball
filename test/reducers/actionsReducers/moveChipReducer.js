import expect from 'expect'
import { buildPoint } from '../../testUtils'
import moveChipReducer from '../../../src/reducers/actionsReducers/moveChipReducer'

const mockData = () => {
  const chips = [
    Object.assign({}, buildPoint(1, 1), {chipId: 1}),
    Object.assign({}, buildPoint(1, 2), {chipId: 2}),
    Object.assign({}, buildPoint(1, 3), {chipId: 3}),
    Object.assign({}, buildPoint(2, 1), {chipId: 4}),
    Object.assign({}, buildPoint(2, 2), {chipId: 5}),
    Object.assign({}, buildPoint(2, 3), {chipId: 6})
  ]
  const action = {nextPosition: buildPoint(4, 4), chipId: 1}
  return { chips, action }
}

describe('moveChipReducer', () => {
  it('should update position for the targetted chip', () => {
    const {chips, action} = mockData()
    const highlights = [buildPoint(4, 4)]
    const result = moveChipReducer(chips, action, highlights)
    expect(result[0].row).toBe(4)
    expect(result[0].col).toBe(4)
  })
  it('should not modify chips when there\'re not highlights', () => {
    const {chips, action} = mockData()
    expect(moveChipReducer(chips, action)).toEqual(chips)
  })
})

// const moveChipReducer = (chips, action, highlights = []) => {
//   const {nextPosition, chipId} = action
//   if (isAllowed(nextPosition, highlights)) {
//     return chips.map((chip) => {
//       if (chip.chipId === chipId) {
//         return Object.assign({}, chip, nextPosition)
//       } else {
//         return chip
//       }
//     })
//   } else {
//     return chips
//   }
// }
