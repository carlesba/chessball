import expect from 'expect'
import { buildPoint } from '../testUtils'
import moveChipReducer, {
  isPositionInList,
  calculateTeamOwner,
  calculateBallOwners,
  updateBallOwner
} from '../../src/reducers/moveChipReducer'

const mockData = () => {
  const chips = [
    Object.assign({}, buildPoint(1, 1), {chipId: 1, kind: 'ball'}),
    Object.assign({}, buildPoint(1, 2), {chipId: 2, kind: 'player'}),
    Object.assign({}, buildPoint(1, 3), {chipId: 3, kind: 'player'}),
    Object.assign({}, buildPoint(2, 1), {chipId: 4, kind: 'player'}),
    Object.assign({}, buildPoint(2, 2), {chipId: 5, kind: 'player'}),
    Object.assign({}, buildPoint(2, 3), {chipId: 6, kind: 'player'})
  ]
  const action = {nextPosition: buildPoint(4, 4), chipId: 1}
  return { chips, action }
}

describe('moveChipReducer', () => {
  it('should update position for the targetted chip', () => {
    const {chips, action} = mockData()
    const highlights = [buildPoint(4, 4)]
    const result = moveChipReducer(chips, action, highlights)
    expect(result[0].row).toBe(4)
    expect(result[0].col).toBe(4)
  })
  it('should not modify chips when there\'re not highlights', () => {
    const {chips, action} = mockData()
    expect(moveChipReducer(chips, action)).toEqual(chips)
  })
})

describe('isPositionInList', () => {
  it('returns true when position passed is in the list', () => {
    const point = buildPoint(4, 2)
    const list = [
      buildPoint(3, 2),
      buildPoint(4, 2),
      buildPoint(1, 1),
      buildPoint(5, 2)
    ]
    expect(isPositionInList(point, list)).toBe(true)
  })
  it('returns false when position passed is not in the list', () => {
    const point = buildPoint(0, 0)
    const list = [
      buildPoint(3, 2),
      buildPoint(4, 3),
      buildPoint(1, 1),
      buildPoint(5, 2)
    ]
    expect(isPositionInList(point, list)).toBe(false)
  })
})
describe('calculateTeamOwner', () => {
  it('returns 0 when first element is bigger', () => {
    expect(calculateTeamOwner([2, 0])).toBe(0)
    expect(calculateTeamOwner([7, 1])).toBe(0)
  })
  it('returns 1 when second element is bigger', () => {
    expect(calculateTeamOwner([0, 8])).toBe(1)
    expect(calculateTeamOwner([4, 8])).toBe(1)
  })
  it('returns null when they\'re equal', () => {
    expect(calculateTeamOwner([0, 0])).toBe(null)
    expect(calculateTeamOwner([3, 3])).toBe(null)
  })
})
describe('calculateBallOwners', () => {
  describe('return number of chips around the ball for each team (without counting the ball)', () => {
    it('case 1', () => {
      const chips = [
        Object.assign({}, buildPoint(3, 3), {team: 0}),
        Object.assign({}, buildPoint(2, 2), {team: 0}),
        Object.assign({}, buildPoint(2, 3), {team: 0}),
        Object.assign({}, buildPoint(3, 4), {team: 1}),
        Object.assign({}, buildPoint(3, 4), {team: 1})
      ]
      const ball = chips[0]
      expect(calculateBallOwners(chips, ball)).toEqual([2, 2])
    })
    it('case 2', () => {
      const chips = [
        Object.assign({}, buildPoint(3, 3), {team: 1}),
        Object.assign({}, buildPoint(2, 1), {team: 0}),
        Object.assign({}, buildPoint(2, 0), {team: 0}),
        Object.assign({}, buildPoint(3, 4), {team: 1}),
        Object.assign({}, buildPoint(8, 9), {team: 1})
      ]
      const ball = chips[0]
      expect(calculateBallOwners(chips, ball)).toEqual([0, 1])
    })
  })
})
describe('updateBallOwner', () => {
  it('change ball owner when ther\'re some chips around', () => {
    const list = [
      Object.assign({}, buildPoint(3, 3), {team: null, kind: 'ball'}),
      Object.assign({}, buildPoint(2, 3), {team: 1, kind: 'player'})
    ]
    expect(updateBallOwner(list)[0].team).toBe(1)
  })
  it('return same list when majority around has no change', () => {
    const list = [
      Object.assign({}, buildPoint(3, 3), {team: 1, kind: 'ball'}),
      Object.assign({}, buildPoint(2, 3), {team: 1, kind: 'player'})
    ]
    expect(updateBallOwner(list)).toBe(list)
  })
  it('return same list passed when no update is required', () => {
    const list = [
      Object.assign({}, buildPoint(4, 4), {team: null, kind: 'ball'}),
      Object.assign({}, buildPoint(2, 3), {team: 1, kind: 'player'})
    ]
    expect(updateBallOwner(list)).toBe(list)
  })
})

