import expect from 'expect'
import {calculateMovePositionsFrom} from '../../../src/reducers/actionsReducers/showMovesReducer'

describe('calculateMovePositionsFrom', () => {
  it('should return array of positions given one valid position', () => {
    const positions = [
      {row: 9, col: 10}, // horizontal
      {row: 8, col: 10},
      {row: 7, col: 10},
      {row: 6, col: 10},
      {row: 11, col: 10},
      {row: 12, col: 10},
      {row: 13, col: 10},
      {row: 14, col: 10},
      {row: 10, col: 9}, // vertical
      {row: 10, col: 8},
      {row: 10, col: 7},
      {row: 10, col: 6},
      {row: 11, col: 10},
      {row: 12, col: 10},
      {row: 13, col: 10},
      {row: 14, col: 10},
      {row: 9, col: 9}, // diagonal
      {row: 8, col: 8},
      {row: 7, col: 7},
      {row: 6, col: 6},
      {row: 11, col: 11},
      {row: 12, col: 12},
      {row: 13, col: 13},
      {row: 14, col: 14},
      {row: 9, col: 11},
      {row: 8, col: 12},
      {row: 7, col: 13},
      {row: 6, col: 14},
      {row: 11, col: 9},
      {row: 12, col: 8},
      {row: 13, col: 7},
      {row: 14, col: 6}
    ]
    const result = calculateMovePositionsFrom({row: 10, col: 10})
    expect(result.length).toBe(32)
    positions.forEach(position => expect(result).toInclude(position))
  })
})
