import { Left, Right, Identity } from 'monet'
import {get, set, update, log} from 'immootable'
import * as Tile from './tile'

const currentPlayer = game => get('currentPlayer', game)
const getTile = index => game => get(['tiles', index], game)

// index -> game -> Either(game)
const eitherUndoSelection = index => game => Right(game)
  .map(getTile(index))
  .flatMap(tile => Tile.isSelected(tile) && Tile.hasChip(tile)
    ? Left(Tile.deselect(tile))
    : Right(game)
  )
  .leftMap(tile => set(['tiles', index], tile, game))

// // index -> game -> Either(game)
// const eitherApplyMove = index => game => Right(game)
//   .map(getTile(index))
//   .flatMap(tile => Tile.isEnabled(tile)
//     ? Left(game)
//     : Right(game)
//   )

// index -> game -> Either(game)
const eitherSelectTile = index => game => Right(game)
  .map(getTile(index))
  .map(tile => Tile.getChipTeam(tile) === currentPlayer(game)
    ? Left(tile)
    : Right(game)
  )
  .leftMap(tile => Tile.selectTile(tile))
  .leftMap(tile => set(['tiles', index], tile, game))
  // .leftMap(enableMovements(index)) // enable tiles according to selection

const selectTile = game => index => Right(game)
  .flatMap(eitherUndoSelection(index))
  // .flatMap(eitherApplyMove(index))
  .flatMap(eitherSelectTile(index))
  .cata(Identity, Identity)

const Game = game => ({
  selectTile: selectTile(game)
})

export default Game
