import {Some} from 'monet'
import {COLUMNS, ROWS} from './constants'

export const rowFromIndex = index => Math.floor(index / COLUMNS)

export const colFromIndex = index => index % COLUMNS

export const fromIndex = index => ({
  row: rowFromIndex(index),
  col: colFromIndex(index)
})

export const normalizeRow = row => row < ROWS / 2
  ? row
  : Math.abs(ROWS - row - 1)

export const normalizeCol = col => col < COLUMNS / 2
  ? col
  : Math.abs(COLUMNS - col - 1)

export const normalize = ({row, col}) => ({
  row: normalizeRow(row),
  col: normalizeCol(col)
})

export const updateRowBy = ({row, col}) => value => ({row: row + value, col})
export const updateColBy = ({row, col}) => value => ({row, col: col + value})

export const toIndex = ({row, col}) => row * COLUMNS + col
