import {
  MAX_BALL_MOVE,
  MAX_PLAYER_MOVE
} from '../utils/constants'
import { calculatePositionOwner } from '../utils/position'

const showMovesReducer = (state, action) => {
  const {chips, game: {ballPasses}, board} = state
  const {chipId} = action
  const chip = chips.find(chip => chip.chipId === chipId)
  const isBall = chip.kind === 'ball'
  const positionFilterer = getPositionFilterer(isBall, ballPasses, board, chips)
  return { movements: calculatePositionsFrom(chip, isBall, positionFilterer) }
}

const getPositionFilterer = (isBall, ballPasses, board, chips) => {
  if (isBall && ballPasses === 0) {
    return neutralPositionFilterer(board, chips)
  } else if (isBall) {
    return ballPositionFilterer(board, chips)
  } else {
    return chipPositionFilterer(board, chips)
  }
}

const neutralPositionFilterer = (board, chips) => (position, stopLooking) => {
  if (
    isAllowedForBallOnBoard(position, board) &&
    isChipFree(position, chips) &&
    isNeutral(position, chips)
  ) {
    return true
  }
  return false
}
const ballPositionFilterer = (board, chips) => (position, stopLooking) => {
  if (
    isAllowedForBallOnBoard(position, board) &&
    isChipFree(position, chips)
  ) {
    return true
  }
  return false
}

const chipPositionFilterer = (board, chips) => (position, stopLooking) => {
  if (
    isAllowedForChipsOnBoard(position, board) &&
    isChipFree(position, chips)
  ) {
    return true
  }
  stopLooking()
  return false
}

const isAllowedForChipsOnBoard = ({row, col}, board) => {
  const tile = board[row] && board[row][col]
  if (!tile) return false
  return tile.kind !== 'blank' && tile.kind !== 'goal'
}

const isAllowedForBallOnBoard = ({row, col}, board) => {
  const tile = board[row] && board[row][col]
  if (!tile) return false
  return tile.kind !== 'blank'
}

const isChipFree = (position, chips) => {
  return chips.findIndex(({row, col}) => {
    return position.row === row && position.col === col
  }) < 0
}

const isNeutral = (position, chips) => {
  return calculatePositionOwner(position, chips) === null
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
  const times = isBall
    ? MAX_BALL_MOVE
    : MAX_PLAYER_MOVE
  return incrementals.reduce((positions, increment) => {
    return positions.concat(
      getAvailablePositions(origin, increment, times, filterPositions)
    )
  }, [])
}

const getAvailablePositions = (origin, increment, times, isValidPosition) => {
  let positions = []
  let current = {
    row: origin.row,
    col: origin.col
  }
  let keep = true
  const stopper = () => keep = false
  for (let i = 0; i < times && keep; i++) {
    current = {
      row: current.row + increment.row,
      col: current.col + increment.col
    }
    if (isValidPosition(current, stopper)) positions.push(current)
  }
  return positions
}

export default showMovesReducer
