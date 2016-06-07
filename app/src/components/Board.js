import React from 'react'
import Tile from 'src/components/Tile'
import createTile from 'src/models/Tile'
import {BOARD_ROWS, BOARD_COLS} from 'src/constants'

let tiles = []

for (var i = 0; i < BOARD_ROWS; i++) {
  for (var j = 0; j < BOARD_COLS; j++) {
    tiles.push(createTile(i, j))
  }
}

const Board = React.createClass({
  render () {
    return (
      <div>
      {tiles.map((tile) =>
        <Tile key={tile.id} tile={tile} />
      )}
      </div>
    )
  }
})

export default Board
