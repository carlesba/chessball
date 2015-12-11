import { TILE_WIDTH, MAX_MOVE } from './constants'

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
