import expect from 'expect'
import {
  buildPoint,
  buildMovement
} from '../testUtils'
import {
  pixelsToMovement,
  pixelsToPosition,
  positionToPixels,
  calculatePositionDistance,
  applyMoveToPosition
} from '../../src/utils/position'

describe('pixelsToMovement', () => {
  describe('should count how many tiles are given pixels distance', () => {
    it('move vertical', () => {
      const input = pixelsToMovement({x: 2, y: 549})
      const expectedOutput = { cols: 0, rows: 11 }
      expect(input).toEqual(expectedOutput, 'bad vertical move')
    })
    it('move Up', () => {
      const input = pixelsToMovement({x: 982, y: 0})
      const expectedOutput = { cols: 20, rows: 0 }
      expect(input).toEqual(expectedOutput, 'bad horizontal move')
    })
    it('move diagonal', () => {
      const input = pixelsToMovement({x: 332, y: 798})
      const expectedOutput = { cols: 7, rows: 16 }
      expect(input).toEqual(expectedOutput, 'bad diagonal move')
    })
  })
})

describe('applyMoveToPosition', () => {
  it('should return a valid position when movement is right', () => {
    expect(applyMoveToPosition(buildPoint(3, 3), buildMovement(6, 6))).toEqual({row: 9, col: 9})
    expect(applyMoveToPosition(buildPoint(3, 3), buildMovement(6, -1))).toEqual({row: 9, col: 2})
    expect(applyMoveToPosition(buildPoint(7, 0), buildMovement(2, 0))).toEqual({row: 9, col: 0})
  })
})

describe('positionToPixels', () => {
  it('translates pixels to position according the tile size', () => {
    const input = {row: 2, col: 8}
    const output = {top: 100, left: 400}
    expect(positionToPixels(input)).toEqual(output)
  })
  it('translates pixels to position according the tile size', () => {
    const input = {row: -14, col: 0}
    const output = {top: -700, left: 0}
    expect(positionToPixels(input)).toEqual(output)
  })
})

describe('pixelsToPosition', () => {
  it('translates pixels to position according the tile size', () => {
    const input = {top: 413, left: 78}
    const output = {row: 2, col: 8}
    expect(pixelsToPosition(input)).toEqual(output)
  })
  it('translates pixels to position according the tile size', () => {
    const input = {top: -3, left: -678}
    const output = {row: -14, col: 0}
    expect(pixelsToPosition(input)).toEqual(output)
  })
})

describe('calculatePositionDistance', () => {
  it('returns number of tiles between two positions', () => {
    expect(calculatePositionDistance(buildPoint(1, 1), buildPoint(2, 2))).toBe(1)
    expect(calculatePositionDistance(buildPoint(1, 1), buildPoint(0, 0))).toBe(1)
    expect(calculatePositionDistance(buildPoint(5, 4), buildPoint(4, 4))).toBe(1)
    expect(calculatePositionDistance(buildPoint(8, 2), buildPoint(2, 8))).toBe(6)
    expect(calculatePositionDistance(buildPoint(3, 0), buildPoint(0, 0))).toBe(3)
  })
})
