import {Some} from 'monet'
import {get, log} from 'immootable'
import * as Position from './position'
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

const referRowsTo = position => list => list.map(Position.updateRowBy(position))
const referColsTo = position => list => list.map(Position.updateColBy(position))

const appendVerticals = position => list => Some(createLine(4))
  .map(referRowsTo(position))
  .map(l => list.concat(l))
  .orSome(list)

const appendHorizontals = position => list => Some(createLine(4))
  .map(referColsTo(position))
  .map(l => list.concat(l))
  .orSome(list)

const appendDiagonal1 = position => list => list
const appendDiagonal2 = position => list => list

const calculateMovements = position => Some([])
  .map(appendVerticals(position))
  .map(appendHorizontals(position))
  .map(appendDiagonal1(position))
  .map(appendDiagonal2(position))
  .orSome([])

const convertToIndexes = Positions => Positions.map(Position.toIndex)

export const fromIndex = index =>
  Some(index)
    .map(Position.fromIndex)
    .map(calculateMovements)
    .map(convertToIndexes)
    .orSome([])
