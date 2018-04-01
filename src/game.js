import { Left, List, Right, Some, Identity } from 'monet'
import {get, set, update, log} from 'immootable'
import * as Chip from './chip'
import * as Movement from './movement'

// const currentPlayer = game => get('currentPlayer', game)

const tap = text => x => {
  console.log(text, x)
  return x
}
const stop = x => {
  console.log(x)
  debugger
  return x
}

// game -> Array(tiles | nil)
export const getTiles = game => get('tiles', game) || []

export const getChipByIndex = index => game =>
  List.fromArray(get('chips', game))
    .find(Chip.checkIndex(index))
    .orSome(undefined)

const isEnabled = index => game =>
  get('movements', game).includes(index)

const setChip = game => chip =>
  update(
    'chips',
    chips => chips.map(c => Chip.equals(c, chip) ? chip : c),
    game
  )

const isChipTeamTurn = (game, chip) => game.currentPlayer === chip.team

const setMovements = game => movements => set(
  'movements',
  movements,
  game
)

const getSelectedChip = game => List.fromArray(get('chips', game))
  .find(Chip.isSelected)

const moveSelectedChipTo = index => game =>
  getSelectedChip(game)
    .map(Chip.setIndex(index))
    .map(Chip.deselect)
    .map(setChip(game))
    .orSome(game)

const cleanHighlights = game => set('movements', [], game)

// const enableTiles = game => getSelectedChip(game)
//   .map(get('index'))
//   .map(Movement.fromGame)
//   .map(setMovements(game))
//   .orSome(game)

const eitherSelectedChipMatchesIndex = index => game =>
  getSelectedChip(game)
    .cata(
      _ => Right(game),
      chip => Chip.checkIndex(index)(chip)
        ? Left(chip)
        : Right(game)
    )

// index -> game -> Either(game)
const eitherApplyMove = index => game => Right(game)
  .map(isEnabled(index))
  .flatMap(enabled => enabled ? Left(game) : Right(game))
  .leftMap(moveSelectedChipTo(index))
  .leftMap(cleanHighlights)

const eitherUnselectChip = index => game => Right(game)
  .flatMap(eitherSelectedChipMatchesIndex(index))
  .leftMap(Chip.deselect)
  .leftMap(setChip(game))

// index -> game -> Either(game)
const eitherSelectChip = index => game => Right(game)
  .map(getChipByIndex(index))
  .flatMap(chip => chip && isChipTeamTurn(game, chip) ? Left(chip) : Right(game))
  .leftMap(Chip.select)
  .leftMap(setChip(game))
  .leftMap(g => Some(game)
    .flatMap(getSelectedChip)
    .map(Chip.deselect)
    .map(setChip(g))
    .orSome(g)
  )

export const selectTile = index => game => Right(game)
  .map(tap('move'))
  .flatMap(eitherApplyMove(index))
  .map(tap('unselect chip'))
  .flatMap(eitherUnselectChip(index))
  .map(tap('select chip'))
  .flatMap(eitherSelectChip(index))
  .map(tap('nothing'))
  .map(cleanHighlights)
  .cata(x => x, x => x)
