import { Some } from 'monet'
import {update, log} from 'immootable'
import * as Tile from './tile'

const selectTile = game => index => Some(game)
  .map(g => update(
    ['tiles', index],
    tile => Tile.selectTile(tile),
    g
  ))
  .some()

const Game = game => ({
  selectTile: selectTile(game)
})

export default Game
