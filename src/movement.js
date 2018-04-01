import {Some} from 'monet'
import {get, log} from 'immootable'
import * as Position from './position'
const tap = text => x => {
  console.log(text, x)
  return x
}
/*
  movement = {
    index::Number
    disabled::String
  }
  x---x--x--
  --x-x-x---
  ---xxx----
  xxxxOxxxx-
  ---xxx----
  --x-x-x---
  x---x--x--
*/

const createIndexArray = (size, fn = x => x) =>
  Array(size).join(',').split(',').map((_, i) => fn(i))

const createLine = distance => [
  ...createIndexArray(distance, i => -(i + 1)),
  ...createIndexArray(distance, i => i + 1)
]

const mapToRows = list => list.map(Position.setRow)
const mapToCols = list => list.map(Position.setCol)

const mapToRowsColsSame = list => list.map(
  increment => ({row: increment, col: increment})
)
const mapToRowsColsInv = list => list.map(
  increment => ({row: increment, col: -increment})
)
const appendVerticals = position => list => Some(createLine(4))
  .map(mapToRows)
  .map(l => l.map(Position.concat(position)))
  .map(l => list.concat(l))
  .orSome(list)

const appendHorizontals = position => list => Some(createLine(4))
  .map(mapToCols)
  .map(l => l.map(Position.concat(position)))
  .map(l => list.concat(l))
  .orSome(list)

const appendDiagonal1 = position => list => Some(createLine(4))
  .map(mapToRowsColsSame)
  .map(l => l.map(Position.concat(position)))
  .map(l => list.concat(l))
  .orSome(list)

const appendDiagonal2 = position => list => Some(createLine(4))
  .map(mapToRowsColsInv)
  .map(l => l.map(Position.concat(position)))
  .map(l => list.concat(l))
  .orSome(list)

const calculateMovements = position => Some([])
  .map(appendVerticals(position))
  .map(appendHorizontals(position))
  .map(appendDiagonal1(position))
  .map(appendDiagonal2(position))
  .orSome([])

const convertToIndexes = positions => positions.map(Position.toIndex)

const filterInvalidPositions = positions => positions.filter(Position.isValid)

export const fromIndex = index =>
  Some(index)
    .map(Position.fromIndex)
    .map(calculateMovements)
    .map(filterInvalidPositions)
    .map(convertToIndexes)
    .orSome([])
