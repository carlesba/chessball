import { TILE_WIDTH, BOARD_COLS, BOARD_ROWS } from './constants'

export const getReferencePoints = (domNode) => {
  const {top, left} = domNode.parentNode.getBoundingClientRect()
  return {
    topRef: top,
    leftRef: left
  }
}

export const calculateTiles = ({translateX, translateY}) => {
  return {
    cols: Math.round(translateX / TILE_WIDTH),
    rows: Math.round(translateY / TILE_WIDTH)
  }
}

const isInBetween = (num, min, max) => {
  return min <= num && num <= max
}

export const calculateNextPosition = (currentPosition, movement) => {
  const nextRow = currentPosition.row + movement.rows
  const nextCol = currentPosition.col + movement.cols
  if (isInBetween(nextRow, 0, BOARD_ROWS) && isInBetween(nextCol, 0, BOARD_COLS)) {
    return {
      col: nextCol,
      row: nextRow
    }
  } else {
    return null
  }
}
