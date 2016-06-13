import {
  BOARD_ROWS,
  BOARD_COLS,
  TEAM_A,
  TEAM_B,
  TILE_SIZE
} from 'src/constants'

export const isBonus = (row, col) => {
  const allowedRows = [1, BOARD_ROWS - 2]
  const allowedCols = [0, 3, 4, 5, 6, 7, 10]
  return allowedRows.includes(row) && allowedCols.includes(col)
}

export const calcTeam = (row, col) => {
  if (row === 7) return null
  return row < 7
    ? TEAM_A
    : TEAM_B
}

export const switchTeam = (team) => {
  return team !== TEAM_A ? TEAM_A : TEAM_B
}

export const isArea = (row, col) => {
  return ((row > 0 && row < 5) || (row > 9 && row < BOARD_ROWS)) &&
  (col > 0 && col < BOARD_COLS - 1)
}

export const isGoal = (row, col) => {
  return (row === 0 || row === BOARD_ROWS - 1) &&
  (col > 2 && col < 8)
}

export const isBlank = (row, col) => {
  return (row === 0 || row === BOARD_ROWS - 1) &&
  (col < 3 || col > 7)
}

export const insideBoard = (row, col) =>
  (row >= 0 && row < BOARD_ROWS && col >= 0 && col < BOARD_COLS && !isBlank(row, col))

export const distance = (a, b) => {
  const d0 = Math.abs(a[0] - b[0])
  const d1 = Math.abs(a[1] - b[1])
  return d0 === 0 || d1 === 0 || d0 === d1
    ? Math.max(d0, d1)
    : -1
}

export const isEqual = ([a, b], [c, d]) => a === c && b === d

export const containedIn = (position, list) =>
  !!list.find((p) => isEqual(p, position))

export const positionInBetween = ([a, b], [c, d]) =>
  ([(a + c) / 2, (b + d) / 2])

export const positionToPixels = ([a, b]) =>
  ([a * TILE_SIZE + 'px', b * TILE_SIZE + 'px'])
