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
