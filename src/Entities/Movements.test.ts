import { player, keeper, ball, Movements } from './Movements'
import * as Position from './Position'
import { toString, goal, isBonus, isEmpty } from './Board'

/**
 * Player movements
 */
test('player moves 2 positions per direction in any direction', () => {
  const position = [5, 5]
  const movements = player(position)
  expect(movements.length).toBe(16)
})
test('player cannot move through obstacles', () => {
  const position = [5, 5]
  const { right, bellow } = P(position)

  const obstacles = [right(1), bellow(2)]
  const movements = player(position, obstacles)
  const m = M(movements)

  expect(movements.length).toBe(13)
  expect(m.includes(right(1))).toBe(false)
  expect(m.includes(right(2))).toBe(false)
  expect(m.includes(bellow(2))).toBe(false)
})
// test('player will not return goal nor bonus positions', () => {
//   const position = [2, 4]

//   const movements = player(position)
//   const m = M(movements)

//   expect(movements.length).toBe(10)
//   expect(m.includesBonus()).toBeFalsy()
//   expect(m.includesGoal()).toBeFalsy()
// })
test('player will not return empty positions', () => {
  const position = [7, 0]

  const movements = player(position)
  const m = M(movements)

  expect(movements.length).toBe(10)
  expect(m.includesEmpty()).toBeFalsy()
})
/**
 * Keeper movements
 */
test('keeper moves 2 positions per direction in any direction', () => {
  const position = [5, 5]
  const movements = keeper(position)
  expect(movements.length).toBe(16)
})
test('keeper cannot move through obstacles', () => {
  const position = [5, 5]
  const { right, bellow } = P(position)

  const obstacles = [right(1), bellow(2)]
  const movements = keeper(position, obstacles)
  const m = M(movements)

  expect(movements.length).toBe(13)
  expect(m.includes(right(1))).toBe(false)
  expect(m.includes(right(2))).toBe(false)
  expect(m.includes(bellow(2))).toBe(false)
})
test('keeper cannot return goal but can return bonus positions', () => {
  const position = [2, 4]

  const movements = keeper(position)
  const m = M(movements)

  expect(movements.length).toBe(13)
  expect(m.includesBonus()).toBeTruthy()
  expect(m.includesGoal()).toBeFalsy()
})
test('keeper will not return empty positions', () => {
  const position = [7, 0]

  const movements = keeper(position)
  const m = M(movements)

  expect(movements.length).toBe(10)
  expect(m.includesEmpty()).toBeFalsy()
})
/**
 * Ball movements
 */
test('ball moves 4 positions per direction in any direction', () => {
  const position = [7, 5]
  const movements = ball(position)
  expect(movements.length).toBe(32)
})
test('ball cannot move through obstacles', () => {
  const position = [7, 5]
  const { right, bellow } = P(position)

  const obstacles = [right(1), bellow(2)]
  const movements = ball(position, obstacles)
  const m = M(movements)

  expect(movements.length).toBe(25)
  expect(m.includes(right(1))).toBe(false)
  expect(m.includes(right(2))).toBe(false)
  expect(m.includes(bellow(2))).toBe(false)
})
test('ball can return goal or bonus positions but no empty ones', () => {
  const position = [4, 5]

  const movements = ball(position)
  const m = M(movements)

  expect(movements.length).toBe(30)
  expect(m.includesBonus()).toBeTruthy()
  expect(m.includesGoal()).toBeTruthy()
  expect(m.includesEmpty()).toBeFalsy()
})
/**
 *
 */

function P(position: Position.Position) {
  return {
    left(x: number) {
      return Position.sum(position, [0, -x])
    },
    right(x: number) {
      return Position.sum(position, [0, x])
    },
    above(x: number) {
      return Position.sum(position, [-x, 0])
    },
    bellow(x: number) {
      return Position.sum(position, [x, 0])
    },
    leftAbove(x: number) {
      return Position.sum(position, [-x, -x])
    },
    rightAbove(x: number) {
      return Position.sum(position, [-x, x])
    },
    leftBellow(x: number) {
      return Position.sum(position, [x, -x])
    },
    rightBellow(x: number) {
      return Position.sum(position, [x, x])
    }
  }
}

function M(m: Movements) {
  return {
    includesType(type: string): boolean {
      return !!m.find(mm => toString(mm) === type)
    },
    includesGoal(): boolean {
      return !!m.find(p => !!goal(p))
    },
    includesBonus(): boolean {
      return !!m.find(isBonus)
    },
    includesEmpty(): boolean {
      return !!m.find(isEmpty)
    },
    includes(p: Position.Position) {
      return !!m.find(mm => Position.equals(p, mm))
    }
  }
}
