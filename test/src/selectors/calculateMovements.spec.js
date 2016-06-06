import expect from 'expect'
import calculateMovements from 'src/selectors/calculateMovements'
import chipsReducer from 'src/reducers/chips'
import {BOARD_ROWS, BOARD_COLS} from 'src/constants'

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

    it('doesn\'t return positions outside the board', () => {
      const ball = chipsReducer()[0].merge({position: [1, 0], isSelected: true})
      const target = calculateMovements([ball])
      expect(target.length)
        .toBe(12, `bad length on edges. ${target.length} when it should be 12`)
      const expectedMovements = [
        [2, 0], [3, 0], [4, 0], [5, 0],
        [1, 1], [1, 2], [1, 3], [1, 4],
        [2, 1], [3, 2], [4, 3], [5, 4]
      ]
      expectedMovements.forEach(([m0, m1]) => {
        const move = target.find(([a, b]) => m0 === a && m1 === b)
        expect(move).toBeTruthy(`${[m0, m1]} not found`)
      })
      // bottom left corner
      expect(
        calculateMovements(
          [chipsReducer()[0].merge({position: [BOARD_ROWS - 2, 0], isSelected: true})]
        ).length
      ).toBe(12, 'Bad length on bottom left corner: %s instead of 12')
      // top right corner
      expect(
        calculateMovements(
          [chipsReducer()[0].merge({position: [1, BOARD_COLS - 1], isSelected: true})]
        ).length
      ).toBe(12, 'Bad length on top right corner: %s instead of 12')
      // middle right side
      expect(
        calculateMovements(
          [chipsReducer()[0].merge({position: [6, BOARD_COLS - 1], isSelected: true})]
        ).length
      ).toBe(20, 'Bad length on middle right corner: %s instead of 20')
    })

    it('can return goal positions', () => {
      const target = calculateMovements(
        [chipsReducer()[0].merge({position: [1, 6], isSelected: true})]
      )
      expect(target.length)
        .toBe(23, 'Bad length on goal position: %s instead of 23')
    })

    it('doesn\'t return positions where another chip is placed', () => {
      const initialState = chipsReducer()
      const target = calculateMovements([
        initialState[0].merge({position: [7, 5], isSelected: true}),
        initialState[1].merge({position: [7, 6]})
      ])
      expect(target.length)
        .toBe(31, 'Bad length filtering other chips position: %s instead of 31')
    })
  })
  describe('when a player chip is selected', () => {
    it('returns all positions in a distance of 2', () => {})
    it('doesn\'t positions outside the board', () => {})
    it('doesn\'t positions after finding an obstacle', () => {})
  })
})
