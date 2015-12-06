import expect from 'expect'
import {BOARD_ROWS, BOARD_COLS} from '../../../src/utils/constants'
import {
  calculateMovePositionsFrom,
  isAllowedTile,
  positionsInsideBoard
} from '../../../src/reducers/actionsReducers/showMovesReducer'

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

describe('isAllowedTile', () => {
  it('should return false when tile is not on the list', () => {
    const list = [{row: 2, col: 3}]
    const tile = {row: 2, col: 2, chipId: 1}
    expect(isAllowedTile(tile, list)).toBe(false)
  })
  it('should return false when tile is not empty', () => {
    const list = [{row: 2, col: 2}]
    const tile = {row: 2, col: 2, chipId: 1}
    expect(isAllowedTile(tile, list)).toBe(false)
  })
  it('should return true if is in the list and empty', () => {
    const list = [{row: 2, col: 2}]
    const tile = {row: 2, col: 2, chipId: null}
    expect(isAllowedTile(tile, list)).toBe(true)
  })
})

describe('positionsInsideBoard', () => {
  it('returns true when position is inside the board', () => {
    expect(positionsInsideBoard({row: 5, col: 8})).toBe(true)
  })
  it('returns false when position is outside the board', () => {
    expect(positionsInsideBoard({row: -1, col: 0})).toBe(false)
    expect(positionsInsideBoard({row: 0, col: -10})).toBe(false)
    expect(positionsInsideBoard({row: BOARD_ROWS, col: 0})).toBe(false)
    expect(positionsInsideBoard({row: 0, col: BOARD_COLS})).toBe(false)
  })
})
