import { Position, sum } from './Position'
type Team = string

export type Square = {
  bonus: boolean
  area: 'big' | 'small' | null
  goal: Team | null
}
type Squares = Array<Array<Square>>

const Empty: Square = {
  area: null,
  bonus: false,
  goal: null
}
const Field: Square = {
  area: null,
  bonus: false,
  goal: null
}
const GoalRed: Square = { ...Field, goal: 'red' }
const GoalBlue: Square = { ...Field, goal: 'blue' }
const Bonus: Square = { ...Field, bonus: true }
const SmallArea: Square = { ...Field, area: 'small' }
const SmallAreaBonus: Square = { ...Field, area: 'small', bonus: true }
const BigArea: Square = { ...Field, area: 'big' }

// alias
const E = Empty
const F = Field
const GR = GoalRed
const GB = GoalBlue
const B = Bonus
const SA = SmallArea
const SAB = SmallAreaBonus
const BA = BigArea
export const squares: Squares = [
  // 0
  [E, E, E, GB, GB, GB, GB, GB, E, E, E],
  // 1
  [B, BA, SA, SAB, SAB, SAB, SAB, SAB, SA, BA, B],
  // 2
  [F, BA, SA, SA, SA, SA, SA, SA, SA, BA, F],
  // 3
  [F, BA, BA, BA, BA, BA, BA, BA, BA, BA, F],
  // 4
  [F, BA, BA, BA, BA, BA, BA, BA, BA, BA, F],
  // 5
  [F, F, F, F, F, F, F, F, F, F, F],
  // 6
  [F, F, F, F, F, F, F, F, F, F, F],
  // 7
  [F, F, F, F, F, F, F, F, F, F, F],
  // 8
  [F, F, F, F, F, F, F, F, F, F, F],
  // 9
  [F, F, F, F, F, F, F, F, F, F, F],
  // 10
  [F, BA, BA, BA, BA, BA, BA, BA, BA, BA, F],
  // 11
  [F, BA, BA, BA, BA, BA, BA, BA, BA, BA, F],
  // 12
  [F, BA, SA, SA, SA, SA, SA, SA, SA, BA, F],
  // 13
  [B, BA, SA, SAB, SAB, SAB, SAB, SAB, SA, BA, B],
  // 14
  [E, E, E, GR, GR, GR, GR, GR, E, E, E]
]

function get(row: number, column: number): Square {
  const r = squares[row]
  return (r && r[column]) || Empty
}

export function isEmpty(p: Position): boolean {
  const [row, column] = p
  const square = get(row, column)
  return square === Empty
}

export function isBonus(p: Position): boolean {
  const [row, column] = p
  const square = get(row, column)
  return square.bonus
}

export function goal(p: Position): Team | null {
  const [row, column] = p
  const square = get(row, column)
  return square.goal
}

export function isArea(p: Position): boolean {
  const [row, column] = p
  const square = get(row, column)
  return !!square.area
}

const types = [
  Empty,
  Field,
  GoalRed,
  GoalBlue,
  Bonus,
  SmallArea,
  SmallAreaBonus,
  BigArea
]
const names = [
  'Empty',
  'Field',
  'GoalRed',
  'GoalBlue',
  'Bonus',
  'SmallArea',
  'SmallAreaBonus',
  'BigArea'
]
export function toString(p: Position): string {
  const [row, column] = p
  const square = get(row, column)
  const index = types.indexOf(square)
  return names[index]
}

const DIRECTIONS = [
  [0, -1],
  [0, 1],
  [-1, 0],
  [1, 0],
  [-1, -1],
  [-1, 1],
  [1, -1],
  [1, 1]
]

export function positionsAround(p: Position): Position[] {
  return DIRECTIONS.map(direction => sum(p, direction)).filter(p => !isEmpty(p))
}
