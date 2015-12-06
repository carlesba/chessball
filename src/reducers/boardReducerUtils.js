import {MAX_MOVE, BOARD_ROWS, BOARD_COLS} from '../utils/constants'
import {isInBetween} from '../utils/position'
const isTargetTile = (tile, {row, col}) => {
  return tile.row === row && tile.col === col
}

// update chips in tiles when moving chips
export const moveChipReducer = (tiles, action) => {
  const {currentPosition, nextPosition, chipId} = action
  return tiles.map((tile) => {
    if (isTargetTile(tile, currentPosition)) {
      return Object.assign({}, tile, {chipId: null})
    } else if (isTargetTile(tile, nextPosition)) {
      return Object.assign({}, tile, {chipId: chipId})
    } else {
      return tile
    }
  })
}

export const cleanHighlights = (tiles) => {
  return tiles.map(tile => Object.assign({}, tile, {highlighted: null}))
}

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

export const calculateAllowedTiles = (tiles, currentPosition) => {
  return tiles
}

export const positionsInnerBoard = ({row, col}) => {
  return isInBetween(row, 0, BOARD_ROWS - 1) && isInBetween(col, 0, BOARD_COLS - 1)
}

const tileIsInList = (tile, list) => {
  const {row, col} = tile
  return list.findIndex(el => el.row === row && el.col === col) >= 0
}

export const showMoves = (tiles, action) => {
  const {currentPosition} = action
  const movePositions = calculateMovePositionsFrom(currentPosition).filter(positionsInnerBoard)
  return tiles.map((tile) => {
    if (tileIsInList(tile, movePositions)) {
      return Object.assign({}, tile, {highlighted: true})
    } else {
      return tile
    }
  })
}
