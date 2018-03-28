import { Left, List, Right, Some, Identity } from 'monet'
import {get, set, update, log} from 'immootable'
import * as Tile from './tile'
import * as Chip from './chip'

// const currentPlayer = game => get('currentPlayer', game)
// const getTile = index => game => get(['tiles', index], game)
const isEnabled = index => game =>
  get('highlights', game).includes(index)

const setChip = game => chip =>
  update(
    'chips',
    chips => chips.map(c => Chip.equals(c, chip) ? chip : c),
    game
  )

const getSelectedChip = game => List(get('chips', game))
  .find(Chip.isSelected)

const moveSelectedChipTo = index => game =>
  getSelectedChip(game)
    .map(Chip.setIndex(index))
    .map(Chip.deselect)
    .map(setChip(game))
    .orSome(game)

const cleanHighlights = game => set('highlights', [])

const enableMovements = game => getSelectedChip(game)
  // .map(get('index'))
  // .map(calculateMovementPosition)
  // .map(disableNonPosibleMovements(game))
  // .map(highlights => set('highlights', highlights, game))
  .orSome(game)

const eitherSelectedChipMatchesIndex = index => game =>
  getSelectedChip(game)
    .flatMap(chip => Chip.checkIndex(index)(chip)
      ? Left(chip)
      : Right(game)
    )

// index -> game -> Either(game)
const eitherApplyMove = index => game => Right(isEnabled(index))
  .flatMap(enabled => enabled ? Left(game) : Right(game))
  .leftMap(moveSelectedChipTo(index))
  .leftMap(cleanHighlights)

const eitherUnselectChip = index => game => Right(game)
  .flatMap(eitherSelectedChipMatchesIndex(index))
  .leftMap(Chip.deselect)
  .leftMap(setChip(game))

// index -> game -> Either(game)
const eitherSelectChip = index => game => Right(game)
  .flatMap(eitherSelectedChipMatchesIndex(index))
  .leftMap(Chip.select)
  .leftMap(setChip(game))
  .leftMap(enableMovements)

const selectTile = game => index => Right(game)
  .flatMap(eitherApplyMove(index))
  .flatMap(eitherUnselectChip(index))
  .flatMap(eitherSelectChip(index))
  .map(cleanHighlights)
  .cata(Identity, Identity)

const Game = game => ({
  selectTile: selectTile(game)
})

export default Game
