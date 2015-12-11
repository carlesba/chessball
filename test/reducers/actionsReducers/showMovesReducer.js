import expect from 'expect'
import {buildPoint} from '../../testUtils'
// import buildBoard from '../../../src/builders/boxDataBuilder'
import showMovesReducer from '../../../src/reducers/actionsReducers/showMovesReducer'

describe('showMovesReducer', () => {
  it('should return all possible', () => {
    expect(showMovesReducer(buildPoint(5, 5)).length).toBe(32)
  })
  it('should not return values outside board', () => {
    expect(showMovesReducer(buildPoint(0, 0)).length).toBe(12)
  })
  it('should not return values that are already taken by another chip', () => {
    const origin = buildPoint(0, 0)
    const positionsTaken = [buildPoint(1, 1)]
    expect(showMovesReducer(origin, positionsTaken).length).toBe(8)
  })
})
