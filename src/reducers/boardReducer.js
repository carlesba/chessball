import { MOVE_CHIP } from '../actions/ChipsActions'
import boardDataBuilder from '../builders/boardDataBuilder'

const defaultBoardData = boardDataBuilder()

const isTargetTile = (tile, {row, col}) => {
  return tile.row === row && tile.col === col
}

const moveChip = (tiles, action) => {
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

const board = (state = defaultBoardData, action) => {
  switch (action.type) {
    case MOVE_CHIP:
      return moveChip(state, action)
    default:
      state
  }
  return state
}

export default board
