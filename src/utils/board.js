import {BOARD_ROWS, BOARD_COLS} from './constants'
import {isInBetween} from './position'
// return whether a position is inside the board game
export const positionsInsideBoard = ({row, col}) => {
  return isInBetween(row, 0, BOARD_ROWS - 1) && isInBetween(col, 0, BOARD_COLS - 1)
}

const tileIsInList = (tile, list) => {
  const {row, col} = tile
  return list.findIndex(el => el.row === row && el.col === col) >= 0
}
const isEmptyTile = (tile) => typeof tile.chipId !== 'number'

// given a tile and a list of positions return whether a tile can receive a chip
export const isAllowedTile = (tile, allowedPositions) => isEmptyTile(tile) && tileIsInList(tile, allowedPositions)

const isStraightDistance = (rowDistance, columnDistance) => {
  return (rowDistance !== columnDistance && rowDistance === 0) ||
  (rowDistance !== columnDistance && columnDistance === 0) ||
  (Math.abs(rowDistance) === Math.abs(columnDistance) && rowDistance !== 0)
}
export const calculateStraightDistance = (source, target) => {
  const rowDistance = source.row - target.row
  const columnDistance = source.col - target.col
  return isStraightDistance(rowDistance, columnDistance)
    ? Math.max(Math.abs(rowDistance), Math.abs(columnDistance))
    : -1
}
