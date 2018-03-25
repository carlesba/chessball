import {Some} from 'monet'
import {COLUMNS, ROWS} from './constants'

export const rowFromIndex = index => Some(Math.floor(index / COLUMNS))

export const colFromIndex = index => Some(index % COLUMNS)

export const positionFromIndex = index => Some({
  row: rowFromIndex(index).some(),
  col: colFromIndex(index).some()
})

export const normalizeRow = row => row < ROWS / 2
  ? row
  : Math.abs(ROWS - row - 1)

export const normalizeCol = col => col < COLUMNS / 2
  ? col
  : Math.abs(COLUMNS - col - 1)

export const normalizePosition = ({row, col}) => ({
  row: normalizeRow(row),
  col: normalizeCol(col)
})
