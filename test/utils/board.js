import expect from 'expect'
import {
  calculateStraightDistance,
  isAllowedTile,
  positionsInsideBoard,
  getTilesInBetween,
  isObstacleFree
} from '../../src/utils/board'
import {BOARD_ROWS, BOARD_COLS} from '../../src/utils/constants'

const buildPoint = (row, col) => { return {row, col} }

describe('calculateStraightDistance', () => {
  it('returns distance when a point is the diagonal from the other one', () => {
    expect(calculateStraightDistance(buildPoint(5, 5), buildPoint(4, 4))).toBe(1)
    expect(calculateStraightDistance(buildPoint(5, 5), buildPoint(6, 6))).toBe(1)
    expect(calculateStraightDistance(buildPoint(5, 5), buildPoint(6, 4))).toBe(1)
    expect(calculateStraightDistance(buildPoint(5, 5), buildPoint(3, 7))).toBe(2)
  })
  it('returns distance when a point is in the vertical from the other one', () => {
    expect(calculateStraightDistance(buildPoint(5, 5), buildPoint(5, 0))).toBe(5)
    expect(calculateStraightDistance(buildPoint(5, 5), buildPoint(5, 10))).toBe(5)
    expect(calculateStraightDistance(buildPoint(9, 9), buildPoint(9, 8))).toBe(1)
  })
  it('returns -1 when a point is not straight away the other one', () => {
    expect(calculateStraightDistance(buildPoint(5, 5), buildPoint(7, 0))).toBe(-1)
  })
  it('returns -1 when the two points are the same', () => {
    expect(calculateStraightDistance(buildPoint(5, 5), buildPoint(5, 5))).toBe(-1)
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

describe('getTilesInBetween', (origin, target, tiles) => {
  const list = []
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      list.push(buildPoint(i, j))
    }
  }
  it('returns tiles between 2 positions when they\'re straight-aligned', () => {
    const result = getTilesInBetween(buildPoint(2, 2), buildPoint(4, 4), list)
    expect(result.length).toBe(1)
    expect(result[0]).toEqual(buildPoint(3, 3))
  })
})
describe('isObstacleFree', () => {
  const buildMockTiles = () => {
    return [
      buildPoint(1, 1),
      buildPoint(2, 1),
      buildPoint(3, 1),
      buildPoint(4, 1),
      buildPoint(5, 1),
      buildPoint(6, 1)
    ]
  }
  it('returns true when tiles between two positions have no chips', () => {
    expect(isObstacleFree(
      buildPoint(1, 1),
      buildPoint(4, 1),
      buildMockTiles()
    )).toBe(true)
  })
  it('returns false when some of the tiles between two positions owns a chip', () => {
    let mockChips = buildMockTiles()
    mockChips[3].chipId = 'chipdId'
    expect(isObstacleFree(
      buildPoint(1, 1),
      buildPoint(4, 1),
      mockChips
    )).toBe(true)
  })
})
