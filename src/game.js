import { List } from 'monet'
import {get, set, update} from 'immootable'
import * as Chip from './chip'
import * as Movements from './movements'
import { RED, BLUE } from './constants'

export const cleanHighlights = game => set('movements', [], game)
export const enableTiles = game => getSelectedChip(game)
  .map(chip => Chip.isBall(chip)
    ? Movements.ballFromIndex(get('index', chip))
    : Movements.playerFromIndex(get('index', chip))
  )
  .map(setMovements(game))
  .orSome(game)

export const getChipByIndex = index => game =>
  List.fromArray(get('chips', game))
    .find(Chip.checkIndex(index))
    .orSome(undefined)

// game -> Array(tiles | nil)
export const getTiles = game => get('tiles', game) || []

export const getSelectedChip = game => List.fromArray(get('chips', game))
  .find(Chip.isSelected)

export const isChipTeamTurn = (game, chip) => game.currentPlayer === chip.team

export const isEnabled = index => game =>
  get('movements', game).includes(index)

export const moveSelectedChipTo = index => game =>
  getSelectedChip(game)
    .map(Chip.setIndex(index))
    .map(Chip.deselect)
    .map(setChip(game))
    .orSome(game)

export const setChip = game => chip =>
  update(
    'chips',
    chips => chips.map(c => Chip.equals(c, chip) ? chip : c),
    game
  )

export const setMovements = game => movements => set(
  'movements',
  movements,
  game
)

export const togglePlayer = player => player === BLUE ? RED : BLUE
