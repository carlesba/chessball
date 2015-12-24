import {
  MAX_BALL_MOVE,
  MAX_PLAYER_MOVE
} from '../utils/constants'
import { calculatePositionOwner } from '../utils/position'

const positionAllowedInBoard = ({row, col}, board, isBall) => {
  const tile = board[row] && board[row][col]
  if (!tile) return false
  return isBall
    ? tile.kind !== 'blank'
    : tile.kind === 'game'
}

const positionIsChipFree = (position, chips) => {
  return chips.findIndex(({row, col}) => {
    return position.row === row && position.col === col
  }) < 0
}

const positionIsAllowed = (position, chips, board, isBall) => {
  return positionIsChipFree(position, chips) && positionAllowedInBoard(position, board, isBall)
}

const getAvailablePositions = (origin, increment, isBall, checkPositionCallback) => {
  let positions = []
  const maxMovements = isBall
    ? MAX_BALL_MOVE
    : MAX_PLAYER_MOVE
  let current = {
    row: origin.row,
    col: origin.col
  }
  for (let i = 0, keepLooking = true; i < maxMovements && keepLooking; i++) {
    current = {
      row: current.row + increment.row,
      col: current.col + increment.col
    }
    if (checkPositionCallback(current)) {
      positions.push(current)
    } else {
      keepLooking = isBall // ball won't be stopped by another chip, can jump
    }
  }
  return positions
}
const incrementals = [
  {row: 1, col: 0},
  {row: -1, col: 0},
  {row: 0, col: 1},
  {row: 0, col: -1},
  {row: 1, col: 1},
  {row: 1, col: -1},
  {row: -1, col: -1},
  {row: -1, col: 1}
]
const calculatePositionsFrom = (origin, isBall, filterPositions) => {
  return incrementals.reduce((positions, increment) => {
    return positions.concat(
      getAvailablePositions(origin, increment, isBall, filterPositions)
    )
  }, [])
}
const showMovesReducer = (state, action) => {
  const {chips, game: {ballPasses}, board} = state
  const {chipId} = action
  const chip = chips.find(chip => chip.chipId === chipId)
  const isBall = chip.kind === 'ball'
  const keepAllowedPositions = (position) => {
    return positionIsAllowed(position, chips, board, isBall)
  }
  const keepNeutralAllowedPositions = (position) => {
    return positionIsAllowed(position, chips, board, isBall) &&
      calculatePositionOwner(position, chips) === null
  }
  const filterPositions = isBall && ballPasses === 0
    ? keepNeutralAllowedPositions
    : keepAllowedPositions
  return { movements: calculatePositionsFrom(chip, isBall, filterPositions) }
}

export default showMovesReducer
