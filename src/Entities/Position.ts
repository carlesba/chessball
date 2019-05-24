export type Position = number[]

export function sum(p: Position, q: Position): Position {
  const [p0, p1] = p
  const [q0, q1] = q
  return [p0 + q0, p1 + q1]
}

export function multiply(p: Position, factor: number): Position {
  const [p0, p1] = p
  return [p0 * factor, p1 * factor]
}

export function equals(p: Position, q: Position): boolean {
  const [p0, p1] = p
  const [q0, q1] = q
  return p0 === q0 && p1 === q1
}

export function areNeighbors(p: Position, q: Position): boolean {
  const [p0, p1] = p
  const [q0, q1] = q
  const diffRows = Math.abs(p0 - q0)
  const diffCols = Math.abs(p1 - q1)
  return !equals(p, q) && diffRows <= 1 && diffCols <= 1
}
