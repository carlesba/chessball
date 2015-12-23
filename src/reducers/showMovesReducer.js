import {
  MAX_BALL_MOVE,
  MAX_PLAYER_MOVE,
  BOARD_ROWS,
  BOARD_COLS
} from '../utils/constants'
import { calculatePositionOwner } from '../utils/position'

const positionInsideBoard = ({row, col}) => {
  return row >= 0 && row < BOARD_ROWS && col >= 0 && col < BOARD_COLS
}

const positionIsAvailable = (position, chips) => {
  return chips.findIndex(({row, col}) => {
    return position.row === row && position.col === col
  }) < 0
}

const positionIsAllowed = (position, chips) => {
  return positionIsAvailable(position, chips) && positionInsideBoard(position, chips)
}

const getAvailablePositions = (origin, increment, chips, isBall, positionIsAvailable) => {
  let positions = []
  const maxMovements = isBall
    ? MAX_BALL_MOVE
    : MAX_PLAYER_MOVE
  let current = {
    row: origin.row,
    col: origin.col
  }
  for (let i = 0, keep = true; i < maxMovements && keep; i++) {
    current = {
      row: current.row + increment.row,
      col: current.col + increment.col
    }
    if (positionIsAvailable(current, chips)) {
      positions.push(current)
    } else {
      keep = isBall
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
const calculatePositionsFrom = (origin, chips, isBall) => {
  return incrementals.reduce((positions, increment) => {
    return positions.concat(
      getAvailablePositions(origin, increment, chips, isBall, positionIsAllowed)
    )
  }, [])
}
const isNeutralPosition = (position, chips) => {
  return positionIsAllowed(position, chips) &&
    calculatePositionOwner(position, chips) === null
}
const calculateFreePositionsFrom = (origin, chips) => {
  return incrementals.reduce((positions, increment) => {
    return positions.concat(
      getAvailablePositions(origin, increment, chips, true, isNeutralPosition)
    )
  }, [])
}
const showMovesReducer = (state, action) => {
  const {chips, game: {ballPasses}} = state
  const {chipId} = action
  const chip = chips.find(chip => chip.chipId === chipId)
  const isBall = chip.kind === 'ball'
  if (isBall && ballPasses === 0) {
    return { movements: calculateFreePositionsFrom(chip, chips) }
  } else {
    return { movements: calculatePositionsFrom(chip, chips, isBall) }
  }
}

export default showMovesReducer
