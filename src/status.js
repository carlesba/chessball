import { None, Some } from 'monet'
import { append, get, set } from 'immootable'
import {togglePlayer} from './game'

const check = value => !value ? None() : Some(value)

const applyFoo = foo => game => value => set(foo, value, game)
const applyMovement = applyFoo('movements')
const applyCurrentPlayer = applyFoo('currentPlayer')

export const toggleTurn = game =>
  Some(game)
    .flatMap(check)
    .map(get('currentPlayer'))
    .map(togglePlayer)
    .map(applyCurrentPlayer(game))
    .orSome(game)

export const logMovement = index => game =>
  Some(game)
    .map(get('movements'))
    .map(append(index))
    .map(applyMovement(game))
    .orSome(game)
