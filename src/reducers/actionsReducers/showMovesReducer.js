import {
  calculateStraightDistance,
  isAllowedTile,
  positionsInsideBoard
} from './../../utils/board'

const calculateAllowedPositions = (tiles, currentPosition) => {
  return tiles.filter((tile) => {
    const distance = calculateStraightDistance(currentPosition, tile)
    return distance > 0 && distance < 4
  }).filter(positionsInsideBoard)
}

const highlight = (tile) => {
  return Object.assign({}, tile, {highlighted: true})
}

// highlight tiles that can receive a chip
const showMovesReducer = (tiles, action) => {
  const {currentPosition} = action
  const movePositions = calculateAllowedPositions(tiles, currentPosition)
  return tiles.map((tile) => {
    return isAllowedTile(tile, movePositions)
      ? highlight(tile)
      : tile
  })
}
export default showMovesReducer
