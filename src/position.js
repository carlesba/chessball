import { None, Some } from 'monet'
import {COLUMNS, ROWS} from './constants'
import { get, log } from 'immootable'

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

export const concat = pa => pb => ({
  row: pa.row + pb.row,
  col: pa.col + pb.col
})

export const setRow = row => ({row, col: 0})
export const setCol = col => ({row: 0, col})

const checkRow = position => Some(position)
  .map(get('row'))
  .flatMap(row => row < 0 ? None() : Some(row))
  .flatMap(row => row > ROWS - 1 ? None() : Some(row))
  .map(_ => position)

const checkCol = position => Some(position)
  .map(get('col'))
  // .map(log(x => (['>>>> check col', x])))
  .flatMap(col => col < 0 ? None() : Some(col))
  .flatMap(col => col > COLUMNS - 1 ? None() : Some(col))
  .map(_ => position)

export const isValid = position => Some(position)
  .flatMap(checkRow)
  .flatMap(checkCol)
  .cata(_ => false, _ => true)
