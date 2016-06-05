import expect from 'expect'
import calculateMovements from 'src/selectors/calculateMovements'
import chipsReducer from 'src/reducers/chips'

describe('calculateMovements:\n', () => {
  describe('when no chip is selected', () => {
    it('returns an empty array', () => {
      const noChipSelected = chipsReducer()
      const target = calculateMovements(noChipSelected)
      expect(target.length).toBe(0)
    })
  })
  describe('when the ball is selected', () => {
    it('returns all positions in a distance of 4', () => {
      const ballSelected = chipsReducer().setIn([0, 'isSelected'], true)
      const target = calculateMovements(ballSelected)
      expect(target.length).toBe(32, 'bad length')
      const expectedMovements = [
        [6, 5], [5, 5], [4, 5], [3, 5],
        [8, 5], [9, 5], [10, 5], [11, 5],
        [7, 4], [7, 3], [7, 2], [7, 1],
        [7, 6], [7, 7], [7, 8], [7, 9],
        [6, 4], [5, 3], [4, 2], [3, 1],
        [6, 6], [5, 7], [4, 8], [3, 9],
        [8, 4], [9, 3], [10, 2], [11, 1],
        [8, 6], [9, 7], [10, 8], [11, 9]
      ]
      expectedMovements.forEach(([m0, m1]) => {
        const move = target.find(([a, b]) => m0 === a && m1 === b)
        expect(move).toBeTruthy(`${[m0, m1]} not found`)
      })
    })
    it('doesn\'t return positions outside the board', () => {})
    it('can return goal positions', () => {})
    it('doesn\'t return positions where another chip is placed', () => {})
  })
  describe('when a player chip is selected', () => {
    it('returns all positions in a distance of 2', () => {})
    it('doesn\'t positions outside the board', () => {})
    it('doesn\'t positions after finding an obstacle', () => {})
  })
})
