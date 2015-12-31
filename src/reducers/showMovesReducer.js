import {
  MAX_BALL_MOVE,
  MAX_PLAYER_MOVE
} from '../utils/constants'
import { calculatePositionOwner } from '../utils/position'

const showMovesReducer = (state, action) => {
  const {chips, game: {ballPasses, turnOwner}, board} = state
  const {chipId} = action
  const chip = chips.find(chip => chip.chipId === chipId)
  const positionFilterer = getPositionFilterer(
    chip, ballPasses, board, chips, turnOwner
  )
  return { movements: calculatePositionsFrom(chip, positionFilterer) }
}

const getPositionFilterer = (chip, ballPasses, board, chips, turnOwner) => {
  const isBall = chip.kind === 'ball'
  if (isBall && ballPasses === 0) {
    return neutralPositionFilterer(board, chips, turnOwner)
  } else if (isBall) {
    return ballPositionFilterer(board, chips, turnOwner)
  } else {
    return chipPositionFilterer(board, chips, turnOwner)
  }
}

const neutralPositionFilterer = (board, chips, turnOwner) => (position, stopLooking) => {
  const tile = getTile(position, board)
  if (
    !tile ||
    isOwnSpecialTile(tile, turnOwner) ||
    !isAllowedForBallOnBoard(tile) ||
    isOwnedByGoalKeeper(position, chips)
  ) {
    return stopLooking()
  }
  if (
    isChipFree(position, chips) &&
    isNeutral(position, chips) &&
    !isInsideOwnedArea(tile, turnOwner)
  ) { return true }
  return false
}
const ballPositionFilterer = (board, chips, turnOwner) => (position, stopLooking) => {
  const tile = getTile(position, board)
  if (
    !tile ||
    isOwnSpecialTile(tile, turnOwner) ||
    !isAllowedForBallOnBoard(tile)
  ) {
    return stopLooking()
  }
  const positionIsChipFree = isChipFree(position, chips)
  if (isOwnedByGoalKeeper(position, chips)) {
    stopLooking()
    return positionIsChipFree
  }
  if (positionIsChipFree) {
    const inOwnedArea = isInsideOwnedArea(tile, turnOwner)
    return !inOwnedArea ||
      inOwnedArea && isOwnedPosition(position, chips, turnOwner)
  }
  return false
}

const chipPositionFilterer = (board, chips, turnOwner) => (position, stopLooking) => {
  const tile = getTile(position, board)
  if (
    tile &&
    isAllowedForChipsOnBoard(tile) &&
    isChipFree(position, chips)
  ) {
    return true
  }
  return stopLooking()
}

const getTile = ({row, col}, board) => board[row] && board[row][col]

const isAllowedForChipsOnBoard = ({kind}) => kind !== 'blank' && kind !== 'goal'

const isAllowedForBallOnBoard = (tile) => tile.kind !== 'blank'

const isOwnSpecialTile = ({kind, field}, turnOwner) => kind === 'special' && field === turnOwner

const isChipFree = (position, chips) => {
  return chips.findIndex(({row, col}) => {
    return position.row === row && position.col === col
  }) < 0
}

const isNeutral = (position, chips) => {
  return calculatePositionOwner(position, chips) === null
}

const isInsideOwnedArea = ({area, field}, turnOwner) => area && field === turnOwner

const isOwnedByGoalKeeper = (position, chips) => {
  return chips.find(({row, col, isGoalKeeper}) => {
    return isGoalKeeper &&
      position.row === row &&
      Math.abs(position.col - col) <= 1
  })
}
const isOwnedPosition = (position, chips, turnOwner) => {
  return calculatePositionOwner(position, chips) === turnOwner
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

const calculatePositionsFrom = (chip, filterPositions) => {
  const times = chip.kind === 'ball'
    ? MAX_BALL_MOVE
    : MAX_PLAYER_MOVE
  return incrementals.reduce((positions, increment) => {
    return positions.concat(
      getAvailablePositions(chip, increment, times, filterPositions)
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
