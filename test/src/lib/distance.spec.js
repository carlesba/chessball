import expect from 'expect'
import distance from 'src/lib/distance'

describe('distance', () => {
  it('returns -1 when elements are not ortogonal', () => {
    const a = [3, 3]
    const b = [5, 6]
    expect(distance(a, b)).toBe(-1)
  })
  it('returns distance between ortogonal elements', () => {
    expect(
      distance([3, 3], [6, 6])
    ).toBe(3)
    expect(
      distance([3, 3], [3, 0])
    ).toBe(3)
    expect(
      distance([6, 6], [0, 6])
    ).toBe(6)
  })
})
