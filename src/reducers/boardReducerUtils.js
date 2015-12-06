const MAX_MOVE = 4
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
export const calculatePositionsFrom = (origin) => {
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
