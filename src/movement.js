import {Some} from 'monet'
import {get} from 'immootable'
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
const appendVerticals = list => list
const appendHorizontals = list => list
const appendDiagonal1 = list => list
const appendDiagonal2 = list => list

const calculateMovements = position => Some([])
  .map(appendVerticals)
  .map(appendHorizontals)
  .map(appendDiagonal1)
  .map(appendDiagonal2)

export const fromGame = game =>
  getSelectedChip(game)
    .map(get('index'))
    .map(Position.positionFromIndex)
    .map(calculateMovements)
    .orSome([])
