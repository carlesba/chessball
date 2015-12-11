import {
  calculateStraightDistance,
  isAllowedTile,
  positionsInsideBoard,
  isObstacleFree
} from './../../utils/board'
import {calculatePositionsFrom} from './../../utils/position'

// const calculateAllowedPositions = (tiles, currentPosition) => {
//   return tiles.filter((tile) => {
//     const distance = calculateStraightDistance(currentPosition, tile)
//     return distance > 0 && distance < 4
//   }).filter(positionsInsideBoard)
//   .filter(tile => isObstacleFree(tile, currentPosition, tiles))
// }

// const highlight = (tile) => {
//   return Object.assign({}, tile, {highlighted: true})
// }

// highlight tiles that can receive a chip
const showMovesReducer = ({tiles}, action) => {
  const {chip} = action
  const highlights = calculatePositionsFrom(chip)
  return {tiles, highlights}
}

export default showMovesReducer
