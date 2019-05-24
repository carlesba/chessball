import { goal, isBonus } from './Board'

test('goal when square is goal', () => {
  expect(goal([1, 1])).toBe(null)
  expect(goal([0, 6])).toBe('blue')
})
test('isBonus when square is Bonus', () => {
  expect(isBonus([1, 1])).toBe(false)
  expect(isBonus([1, 6])).toBe(true)
  expect(isBonus([13, 10])).toBe(true)
})
