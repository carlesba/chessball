import {createPosition} from 'src/models/position'
import expect from 'expect'

describe('position', () => {
  describe('isInBetween', () => {
    it('returns true when it\'s between 2 vertical positions', () => {
      const source = createPosition([5, 5])
      const obstacle = createPosition([3, 5])
      const target = createPosition([1, 5])
      expect(obstacle.isInBetween(source, target)).toBe(true)
      expect(obstacle.isInBetween(target, source)).toBe(true)
    })
    it('returns true when it\'s between 2 horizontal positions', () => {
      const source = createPosition([5, 5])
      const obstacle = createPosition([5, 3])
      const target = createPosition([5, 1])
      expect(obstacle.isInBetween(source, target)).toBe(true)
      expect(obstacle.isInBetween(target, source)).toBe(true)
    })
    it('returns true when it\'s between 2 diaonal positions', () => {
      const source = createPosition([3, 3])
      const obstacle = createPosition([4, 4])
      const target = createPosition([5, 5])
      expect(obstacle.isInBetween(source, target)).toBe(true)
      expect(obstacle.isInBetween(target, source)).toBe(true)
    })
    it('returns false when position is not in between', () => {
      const source = createPosition([5, 5])
      const obstacle = createPosition([1, 1])
      const target = createPosition([1, 5])
      expect(obstacle.isInBetween(source, target)).toBe(false)
      expect(obstacle.isInBetween(target, source)).toBe(false)
    })
    it('returns false when position is not in between in a distance of 1', () => {
      const source = createPosition([5, 5])
      const obstacle = createPosition([4, 4])
      const target = createPosition([3, 5])
      expect(obstacle.isInBetween(source, target)).toBe(false)
      expect(obstacle.isInBetween(target, source)).toBe(false)
    })
  })
})
