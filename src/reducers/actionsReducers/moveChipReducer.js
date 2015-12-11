// export const isTargetTile = (tile, {row, col}) => {
//   return tile.row === row && tile.col === col
// }

// const findTile = ({row, col}, tiles) => {
//   return tiles.find(tile => isTargetTile(tile, {row, col}))
// }

// const isAllowedTile = (targetTile) => {
//   return targetTile.highlighted
// }

// update chips in tiles when moving chips
// export const moveChipReducer = (tiles, action) => {
//   const {currentPosition, nextPosition, chipId} = action
//   const targetTile = findTile(nextPosition, tiles)

//   if (isAllowedTile(targetTile)) {
//     return tiles.map((tile) => {
//       if (isTargetTile(tile, currentPosition)) {
//         return Object.assign({}, tile, {chipId: null})
//       } else if (isTargetTile(tile, nextPosition)) {
//         return Object.assign({}, tile, {chipId: chipId})
//       } else {
//         return tile
//       }
//     })
//   } else {
//     return tiles
//   }
// }
export const moveChipReducer = (chips, action) => {
  const {nextPosition, chipId} = action
  return chips.map((chip) => {
    if (chip.chipId === chipId) {
      return Object.assign({}, chip, nextPosition)
    } else {
      return chip
    }
  })
}
