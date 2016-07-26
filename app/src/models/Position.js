import {
  BOARD_ROWS,
  BOARD_COLS,
  TEAM_A,
  TEAM_B,
  TILE_SIZE
} from 'src/constants'

export const createPosition = ([row, col]) => ({
  row, col,
  value: [row, col],
  isBonus () {
    const allowedRows = [1, BOARD_ROWS - 2]
    const allowedCols = [0, 3, 4, 5, 6, 7, 10]
    return allowedRows.includes(row) && allowedCols.includes(col)
  },
  field () {
    if (row === 7) return null
    return row < 7
      ? TEAM_A
      : TEAM_B
  },
  isArea () {
    return ((row > 0 && row < 5) || (row > 9 && row < BOARD_ROWS)) &&
    (col > 0 && col < BOARD_COLS - 1)
  },
  isGoal () {
    return (row === 0 || row === BOARD_ROWS - 1) && (col > 2 && col < 8)
  },
  isBlank () {
    return (row === 0 || row === BOARD_ROWS - 1) &&
    (col < 3 || col > 7)
  },
  isInsideBoard () {
    return (
      row >= 0 && row < BOARD_ROWS &&
      col >= 0 && col < BOARD_COLS && !this.isBlank()
    )
  },
  distanceTo (position) {
    const [a, b] = this.value
    const [c, d] = position.value
    const d0 = Math.abs(a - c)
    const d1 = Math.abs(b - d)
    return d0 === 0 || d1 === 0 || d0 === d1
      ? Math.max(d0, d1)
      : -1
  },
  getInBetween (position) {
    const {row, col} = position
    return createPosition([(row + this.row) / 2, (col + this.col) / 2])
  },
  isEqual (position) {
    const [a, b] = this.value
    const [c, d] = position.value
    return a === c && b === d
  },
  calculatePositionInBetween (position) {
    const [a, b] = this.value
    const [c, d] = position.value
    return ([(a + c) / 2, (b + d) / 2])
  },
  owner (chips) {
    const closerPlayers = chips
      .filter((chip) => chip.isPlayer())
      .filter((chip) => this.distance(chip.position) === 1)
    return closerPlayers.length === 0
      ? null
      : getMostRepeatedTeam(closerPlayers)
  },
  increase ([a, b]) {
    const row = this.row + a
    const col = this.col + b
    return createPosition([row, col])
  },
  isIn (list) {
    return list.findIndex((position) => position.isEqual(this)) >= 0
  },
  toPixels () {
    const [a, b] = this.value
    return ([a * TILE_SIZE + 'px', b * TILE_SIZE + 'px'])
  }
})

// export const switchTeam = (team) => {
//   return team !== TEAM_A ? TEAM_A : TEAM_B
// }

function getMostRepeatedTeam (chips) {
  let teamA = 0
  let teamB = 0
  chips.forEach(({team}) => {
    if (team === TEAM_A) teamA += 1
    else teamB += 1
  })
  if (teamA === teamB) return null
  return teamA > teamB ? TEAM_A : TEAM_B
}
