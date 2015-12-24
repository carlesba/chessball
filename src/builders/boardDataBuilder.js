import { BOARD_ROWS, BOARD_COLS } from '../utils/constants'

const bigArea1 = {minRow: 1, minCol: 1, maxRow: 4, maxCol: 9}
const smallArea1 = {minRow: 1, minCol: 2, maxRow: 2, maxCol: 8}
const bigArea2 = {minRow: 10, minCol: 1, maxRow: 13, maxCol: 9}
const smallArea2 = {minRow: 12, minCol: 2, maxRow: 13, maxCol: 8}

// row-col
const boxes = {
  blank: [
    '0-0', '0-1', '0-2', '0-8', '0-9', '0-10',
    '14-0', '14-1', '14-2', '14-8', '14-9', '14-10'
  ],
  goal: [
    '0-3', '0-4', '0-5', '0-6', '0-7',
    '14-3', '14-4', '14-5', '14-6', '14-7'
  ],
  special: [
    '1-0', '1-10',
    '1-3', '1-4', '1-5', '1-6', '1-7',
    '13-0', '13-10',
    '13-3', '13-4', '13-5', '13-6', '13-7'
  ]
}

function isBoxType (type, position) {
  return boxes[type].indexOf(position) >= 0
}

function getType (row, col) {
  const position = `${row}-${col}`
  const types = ['special', 'blank', 'goal']
  return types.find(t => isBoxType(t, position)) || 'game'
}

function isIn ({minRow, minCol, maxRow, maxCol}) {
  return (row, col) => {
    return minRow <= row && row <= maxRow && minCol <= col && col <= maxCol
  }
}

const isSmallArea1 = isIn(smallArea1)
const isSmallArea2 = isIn(smallArea2)
const isBigArea1 = isIn(bigArea1)
const isBigArea2 = isIn(bigArea2)
const isSmallArea = (row, col) => isSmallArea1(row, col) || isSmallArea2(row, col)
const isBigArea = (row, col) => isBigArea1(row, col) || isBigArea2(row, col)

function getArea (row, col) {
  if (isSmallArea(row, col)) return 'small'
  else if (isBigArea(row, col)) return 'big'
  else return false
}

function getField (row, col) {
  return (row < 7) ? 0 : 1
}

function buildSquare (row, col) {
  return {
    row,
    col,
    kind: getType(row, col),
    area: getArea(row, col),
    field: getField(row, col)
  }
}

function builder () {
  let board = []
  for (let row = 0; row < BOARD_ROWS; row++) {
    for (let col = 0; col < BOARD_COLS; col++) {
      if (!board[row]) board.push([])
      board[row].push(buildSquare(row, col))
    }
  }
  return board
}

export default builder
