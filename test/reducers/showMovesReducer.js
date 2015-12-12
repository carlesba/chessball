import expect from 'expect'
import {buildPoint} from '../testUtils'
import showMovesReducer from '../../src/reducers/showMovesReducer'

describe('showMovesReducer', () => {
  it('should return all possible', () => {
    expect(showMovesReducer(buildPoint(5, 5)).length).toBe(32)
  })
  it('should not return values outside board', () => {
    const result = showMovesReducer(buildPoint(0, 0))
    expect(result.length).toBe(12)
    expect(result).toInclude(buildPoint(1, 1))
    expect(result).toInclude(buildPoint(2, 2))
    expect(result).toInclude(buildPoint(3, 3))
    expect(result).toInclude(buildPoint(4, 4))
    expect(result).toInclude(buildPoint(1, 0))
    expect(result).toInclude(buildPoint(2, 0))
    expect(result).toInclude(buildPoint(3, 0))
    expect(result).toInclude(buildPoint(4, 0))
    expect(result).toInclude(buildPoint(0, 1))
    expect(result).toInclude(buildPoint(0, 2))
    expect(result).toInclude(buildPoint(0, 3))
    expect(result).toInclude(buildPoint(0, 4))
  })
  it('should not return values that are already taken by another chip', () => {
    const origin = buildPoint(0, 0)
    const positionsTaken = [buildPoint(1, 1)]
    const result = showMovesReducer(origin, positionsTaken)
    expect(result.length).toBe(8)
    expect(result).toExclude(buildPoint(2, 2))
    expect(result).toExclude(buildPoint(3, 3))
  })
})
