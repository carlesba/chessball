import { compose, Left, List, None, Right, Some } from 'monet'
import { get, set, update } from 'immootable'
import * as Chip from './chip'
import * as Position from './position'
import * as Movements from './movements'
import { RED, BLUE } from './constants'
import both from 'ramda/es/both'
import when from 'ramda/es/when'

/*
  utils
*/
const checkSome = x => (!x || !x.length) ? None(x) : Some(x)

const countRed = chips =>
  List.fromArray(chips)
    .filter(both(Chip.isPlayer, Chip.isRed))
    .size()

const countBlue = chips =>
  List.fromArray(chips)
    .filter(both(Chip.isPlayer, Chip.isBlue))
    .size()

const calculateMajority = chips => {
  const red = countRed(chips)
  const blue = countBlue(chips)
  return red > blue ? Some(RED) : blue < red ? Some(BLUE) : None()
}

/*
  setters
*/

export const ballHasOwner = game =>
  Some(game)
    .map(getBallPosition)
    .map(filterChipsNextTo(getPlayerChips(game)))
    .flatMap(checkSome)
    .flatMap(calculateMajority)
    .orSome(false)

export const cleanHighlights = game => set('movements', [], game)
export const enableTiles = game => getSelectedChip(game)
  .map(chip => Chip.isBall(chip)
    ? Movements.ballFromIndex(get('index', chip))
    : Movements.playerFromIndex(get('index', chip))
  )
  .map(setMovements(game))
  .orSome(game)

const filterChipsNextTo = chips => index =>
  List.fromArray(chips)
    .filter(compose(Position.nextTo(index), get('index')))
    .toArray()

const getBall = game =>
  List.fromArray(get('chips', game))
    .filter(Chip.isBall)
    .head()

const getBallPosition = game =>
  Some(getBall(game))
    .map(get('index'))
    .orSome()

export const getChipByIndex = index => game =>
  List.fromArray(get('chips', game))
    .find(Chip.checkIndex(index))
    .orSome(undefined)

const getCurrentPlayer = game => get('currentPlayer', game)

const getPlayerChips = game =>
  List.fromArray(get('chips', game))
    .filter(Chip.isPlayer)
    .toArray()

// game -> Array(tiles | nil)
export const getTiles = game => get('tiles', game) || []

export const getSelectedChip = game => List.fromArray(get('chips', game))
  .find(Chip.isSelected)

export const isChipTeamTurn = (game, chip) => game.currentPlayer === chip.team

export const isEnabled = index => game =>
  get('movements', game).includes(index)

export const mapChips = fn => game =>
  Some(game)
    .map(get('chips'))
    .map(chips => chips.map(fn))
    .map(setChips(game))
    .orSome(game)

export const moveSelectedChipTo = index => game =>
  getSelectedChip(game)
    .map(Chip.setIndex(index))
    .map(Chip.deselect)
    .map(setChip(game))
    .orSome(game)

export const selectBall = game =>
  Some(game)
    .map(mapChips(when(Chip.isBall, Chip.select)))
    .orSome(game)

export const setChip = game => chip =>
  update(
    'chips',
    chips => chips.map(c => Chip.equals(c, chip) ? chip : c),
    game
  )

const setChips = game => chips => set('chips', chips, game)

export const setMovements = game => movements => set(
  'movements',
  movements,
  game
)

export const togglePlayer = player => player === BLUE ? RED : BLUE
