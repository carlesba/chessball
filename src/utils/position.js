import { TILE_WIDTH, BOARD_COLS, BOARD_ROWS, MAX_MOVE } from './constants'

export const getReferencePoints = () => {
  const {top, left} = document.getElementById('game').getBoundingClientRect()
  return {
    topRef: top,
    leftRef: left
  }
}

export const calculateTiles = (x, y) => {
  return {
    cols: Math.round(x / TILE_WIDTH),
    rows: Math.round(y / TILE_WIDTH)
  }
}

export const isInBetween = (num, min, max) => {
  if (min > max) throw new Error('invalid arguments')
  return min <= num && num <= max
}

export const applyMoveToPosition = (currentPosition, movement) => {
  const nextRow = currentPosition.row + movement.rows
  const nextCol = currentPosition.col + movement.cols
  return {
    col: nextCol,
    row: nextRow
  }
}

export const positionToPixels = ({col, row}) => {
  return { top: row * TILE_WIDTH, left: col * TILE_WIDTH }
}
export const pixelsToPosition = ({top, left}) => {
  return {
    row: Math.round(left / TILE_WIDTH),
    col: Math.round(top / TILE_WIDTH)
  }
}
export const calculatePositionsFrom = ({row, col}) => {
  let positions = []
  for (let i = MAX_MOVE; i > 0; i--) {
    // vertical
    positions.push({row: row - i, col: col})
    positions.push({row: row + i, col: col})
    // horizontal
    positions.push({row: row, col: col - i})
    positions.push({row: row, col: col + i})
    // diagonals
    positions.push({row: row + i, col: col - i})
    positions.push({row: row + i, col: col + i})
    positions.push({row: row - i, col: col - i})
    positions.push({row: row - i, col: col + i})
  }
  return positions
}
