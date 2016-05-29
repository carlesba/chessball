import {freeze} from 'freezr'
import {
  BOARD_ROWS,
  BOARD_COLS,
  TEAM_A,
  TEAM_B
} from 'src/constants'

export default function createTile (row, col) {
  return freeze({
    row, col,
    team: calcTeam(row, col),
    isArea: isAreaPosition(row, col),
    isBonus: isBonus(row, col),
    isGoal: isGoalPosition(row, col),
    isBlank: isBlankPosition(row, col)
  })
}

const isBonus = (row, col) => {
  const allowedRows = [1, BOARD_ROWS - 2]
  const allowedCols = [0, 3, 4, 5, 6, 7, 10]
  return allowedRows.includes(row) && allowedCols.includes(col)
}
const calcTeam = (row, col) => {
  if (row === 7) return null
  return row < 7
    ? TEAM_A
    : TEAM_B
}

const isAreaPosition = (row, col) => {
  return ((row > 0 && row < 5) || (row > 9 && row < BOARD_ROWS)) &&
  (col > 0 && col < BOARD_COLS - 1)
}

const isGoalPosition = (row, col) => {
  return (row === 0 || row === BOARD_ROWS - 1) &&
  (col > 2 && col < 8)
}

const isBlankPosition = (row, col) => {
  return (row === 0 || row === BOARD_ROWS - 1) &&
  (col < 3 || col > 7)
}
