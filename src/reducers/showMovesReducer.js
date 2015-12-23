import {
  MAX_BALL_MOVE,
  MAX_PLAYER_MOVE,
  BOARD_ROWS,
  BOARD_COLS
} from '../utils/constants'

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

const getAvailablePositions = (origin, increment, chips, isBall) => {
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
    if (positionIsAllowed(current, chips)) {
      positions.push(current)
    } else {
      keep = isBall
    }
  }
  return positions
}

export const calculatePositionsFrom = (origin, chips = [], isBall) => {
  let positions = []
  return positions.concat(
    getAvailablePositions(origin, {row: 1, col: 0}, chips, isBall),
    getAvailablePositions(origin, {row: -1, col: 0}, chips, isBall),
    getAvailablePositions(origin, {row: 0, col: 1}, chips, isBall),
    getAvailablePositions(origin, {row: 0, col: -1}, chips, isBall),
    getAvailablePositions(origin, {row: 1, col: 1}, chips, isBall),
    getAvailablePositions(origin, {row: 1, col: -1}, chips, isBall),
    getAvailablePositions(origin, {row: -1, col: -1}, chips, isBall),
    getAvailablePositions(origin, {row: -1, col: 1}, chips, isBall)
  )
}
const showMovesReducer = (state, action) => {
  const {chips} = state
  const {chipId} = action
  const chip = chips.find(chip => chip.chipId === chipId)
  if (chip.highlighted) {
    const isBall = chip.kind === 'ball'
    return { movements: calculatePositionsFrom(chip, chips, isBall) }
  } else {
    return { movements: [] }
  }
}

export default showMovesReducer
