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
    return (
      (row > 0 && row < 5) || (row > 9 && row < BOARD_ROWS - 1)
    ) &&
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
    const closerPlayers = this.around(chips)
    return closerPlayers.length === 0
      ? null
      : getMostRepeatedTeam(closerPlayers)
  },
  around (chips) {
    return chips.list
      .filter((chip) => chip.isPlayer())
      .filter((chip) => this.distanceTo(chip.position) === 1)
  },
  increase ([a, b]) {
    const row = this.row + a
    const col = this.col + b
    return createPosition([row, col])
  },
  isIn (list) {
    return list.findIndex((position) => position.isEqual(this)) >= 0
  },
  isValidBallPosition (usedPositions) {
    return this.isInsideBoard() && !this.isIn(usedPositions)
  },
  isValidPlayerPosition (usedPositions) {
    return this.isInsideBoard() &&
      !this.isGoal() &&
      !this.isIn(usedPositions)
  },
  isObstacleFreeFrom (position, obstacles) {
    const distance = this.distanceTo(position)
    return (
      distance === 1 ||
      (
        distance === 2 && !this.getInBetween(position).isIn(obstacles)
      )
    )
  },
  isPathFreeUntil (position, obstacles) {
    return obstacles
      .findIndex((obstacle) => obstacle.isInBetween(this, position)) < 0
  },
  isHorizontallyAligned (target) {
    return this.row === target.row
  },
  isVerticallyAligned (target) {
    return this.col === target.col
  },
  isDiagonallyAligned (target) {
    return target.row - this.row === target.col - this.col
  },
  isInBetween (beginning, end) {
    const toBeginning = this.distanceTo(beginning)
    const toEnd = this.distanceTo(end)
    const beginningToEnd = beginning.distanceTo(end)

    return (
      // distances matches
      beginningToEnd === (toEnd + toBeginning) &&
      // all valid distances, avoid -1 matches
      toBeginning > 0 && toEnd > 0 &&
      (
        (
          // all of them aligned diagonally
          beginning.isDiagonallyAligned(end) &&
          this.isDiagonallyAligned(beginning) &&
          this.isDiagonallyAligned(end)
        ) ||
        (
          beginning.isHorizontallyAligned(end) &&
          this.isHorizontallyAligned(beginning) &&
          this.isHorizontallyAligned(end)
        ) ||
        (
          beginning.isVerticallyAligned(end) &&
          this.isVerticallyAligned(beginning) &&
          this.isVerticallyAligned(end)
        )
      )
    )
  },
  toPixels () {
    const [a, b] = this.value
    return ([a * TILE_SIZE + 'px', b * TILE_SIZE + 'px'])
  }
})

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
