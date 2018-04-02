import { Left, List, Right, Some, Identity } from 'monet'
import {get, set, update, log} from 'immootable'
import * as Chip from './chip'
import * as Movements from './movements'
import * as Status from './status'

// TODO: move actions to actions.js keep in game.js only game methods

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

const enableTiles = game => getSelectedChip(game)
  .map(chip => Chip.isBall(chip)
    ? Movements.ballFromIndex(get('index', chip))
    : Movements.playerFromIndex(get('index', chip))
  )
  .map(setMovements(game))
  .orSome(game)

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
  .map(x => {
    console.log('>>>>', x)
    return x
  })
  .map(isEnabled(index))
  .flatMap(enabled => enabled ? Left(game) : Right(game))
  .leftMap(moveSelectedChipTo(index))
  .leftMap(cleanHighlights)
  .leftMap(Status.toggleTurn)
  .leftMap(Status.logMovement(index))

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
  .leftMap(enableTiles)

export const selectTile = index => game => Right(game)
  .flatMap(eitherApplyMove(index))
  .flatMap(eitherUnselectChip(index))
  .flatMap(eitherSelectChip(index))
  .map(cleanHighlights)
  .cata(x => x, x => x)
