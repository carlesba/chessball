import expect from 'expect'
import {
  calculateTiles,
  isInBetween,
  applyMoveToPosition
} from '../../src/utils/position'

describe('calculateTiles', () => {
  describe('should count how many tiles are given pixels distance', () => {
    it('move vertical', () => {
      const input = calculateTiles(2, 549)
      const expectedOutput = { cols: 0, rows: 11 }
      expect(input).toEqual(expectedOutput, 'bad vertical move')
    })
    it('move Up', () => {
      const input = calculateTiles(982, 0)
      const expectedOutput = { cols: 20, rows: 0 }
      expect(input).toEqual(expectedOutput, 'bad horizontal move')
    })
    it('move diagonal', () => {
      const input = calculateTiles(332, 798)
      const expectedOutput = { cols: 7, rows: 16 }
      expect(input).toEqual(expectedOutput, 'bad diagonal move')
    })
  })
})

describe('isInBetween', () => {
  it('should return true when value is in between', () => {
    expect(isInBetween(2, -1, 4)).toBe(true)
  })
  it('should return true when value is in lower Edge', () => {
    expect(isInBetween(2, 2, 4)).toBe(true)
  })
  it('should return true when value is in higher Edge', () => {
    expect(isInBetween(4, 2, 4)).toBe(true)
  })
  it('should return false when value is out', () => {
    expect(isInBetween(5, 0, 4)).toBe(false)
  })
  it('should throw expection when edges are wrong', () => {
    expect(() => isInBetween(5, 5, 1)).toThrow(/invalid arguments/)
  })
})

describe('applyMoveToPosition', () => {
  const buildPoint = (row, col) => { return {row, col} }
  const buildMovement = (rows, cols) => { return {rows, cols} }
  it('should return a valid position when movement is right', () => {
    expect(applyMoveToPosition(buildPoint(3, 3), buildMovement(6, 6))).toEqual({row: 9, col: 9})
    expect(applyMoveToPosition(buildPoint(3, 3), buildMovement(6, -1))).toEqual({row: 9, col: 2})
    expect(applyMoveToPosition(buildPoint(7, 0), buildMovement(2, 0))).toEqual({row: 9, col: 0})
  })
})
