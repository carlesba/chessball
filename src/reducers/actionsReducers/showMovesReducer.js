import {MAX_MOVE, BOARD_ROWS, BOARD_COLS} from '../../utils/constants'
import {isInBetween} from '../../utils/position'

const aroundNumbers = (origin, positions = MAX_MOVE) => {
  let around = []
  for (let i = origin - positions, max = origin + positions; i <= max; i++) {
    if (i !== origin) {
      around.push(i)
    }
  }
  return around
}
// calculate allowed positions in the board given an origin
export const calculateMovePositionsFrom = (origin) => {
  const {row, col} = origin
  const rows = aroundNumbers(row)
  const cols = aroundNumbers(col)

  const vertical = rows.map((row) => { return {row, col} })
  const horizontal = cols.map((col) => { return {row, col} })
  const diagonal1 = rows.map((row, i) => {
    return {row, col: cols[i]}
  })
  const diagonal2 = rows.reverse().map((row, i) => {
    return {row, col: cols[i]}
  })
  return vertical.concat(horizontal, diagonal1, diagonal2)
}

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

// highlight tiles that can receive a chip
export const showMovesReducer = (tiles, action) => {
  const {currentPosition} = action
  const movePositions = calculateMovePositionsFrom(currentPosition).filter(positionsInsideBoard)
  return tiles.map((tile) => {
    if (isAllowedTile(tile, movePositions)) {
      return Object.assign({}, tile, {highlighted: true})
    } else {
      return tile
    }
  })
}
