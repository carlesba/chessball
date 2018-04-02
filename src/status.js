import { None, Some } from 'monet'
import { append, get, set } from 'immootable'
import {togglePlayer} from './game'

const check = value => !value ? None() : Some(value)

const applyFoo = foo => game => value => set(foo, value, game)
const applyLog = applyFoo('log')
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
    .map(get('log'))
    .map(append(index))
    .map(applyLog(game))
    .orSome(game)
