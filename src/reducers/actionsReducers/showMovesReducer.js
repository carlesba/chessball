import {MAX_MOVE, BOARD_ROWS, BOARD_COLS} from '../../utils/constants'

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

const getAvailablePositions = (origin, increment, chips) => {
  let positions = []
  let current = {
    row: origin.row,
    col: origin.col
  }
  for (let i = 0, keep = true; i < MAX_MOVE && keep; i++) {
    current = {
      row: current.row + increment.row,
      col: current.col + increment.col
    }
    if (positionIsAllowed(current, chips)) {
      positions.push(current)
    } else {
      keep = false
    }
  }
  return positions
}

const calculatePositionsFrom = (origin, chips) => {
  let positions = []
  return positions.concat(
    getAvailablePositions(origin, {row: 1, col: 0}, chips),
    getAvailablePositions(origin, {row: -1, col: 0}, chips),
    getAvailablePositions(origin, {row: 0, col: 1}, chips),
    getAvailablePositions(origin, {row: 0, col: -1}, chips),
    getAvailablePositions(origin, {row: 1, col: 1}, chips),
    getAvailablePositions(origin, {row: 1, col: -1}, chips),
    getAvailablePositions(origin, {row: -1, col: -1}, chips),
    getAvailablePositions(origin, {row: 1, col: -1}, chips)
  )
}

const showMovesReducer = (chip, chips = []) => {
  return calculatePositionsFrom(chip, chips)
}

export default showMovesReducer
