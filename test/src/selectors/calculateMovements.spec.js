import expect from 'expect'
import calculateMovements from 'src/selectors/calculateMovements'
import chipsReducer from 'src/reducers/chips'

describe('calculateMovements:\n', () => {
  describe('when no chip is selected', () => {
    it('returns an empty array', () => {
      // const noChipSelected = chipsReducer()
      // const target = calculateMovements(noChipSelected)
      // expect(target.length).toBe(0)
    })
  })
  describe('when the ball is selected', () => {
    it('returns all positions in a distance of 4', () => {})
    it('doesn\'t positions outside the board', () => {})
    it('doesn\'t positions where another chip is placed', () => {})
  })
  describe('when a player chip is selected', () => {
    it('returns all positions in a distance of 2', () => {})
    it('doesn\'t positions outside the board', () => {})
    it('doesn\'t positions after finding an obstacle', () => {})
  })
})
