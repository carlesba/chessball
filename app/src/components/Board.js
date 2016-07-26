import React from 'react'
import Tile from 'src/components/Tile'
import {createPosition} from 'src/models/Position'
import {BOARD_ROWS, BOARD_COLS} from 'src/constants'

let tiles = []

for (var i = 0; i < BOARD_ROWS; i++) {
  for (var j = 0; j < BOARD_COLS; j++) {
    tiles.push(createPosition([i, j]))
  }
}

const Board = React.createClass({
  render () {
    return (
      <div>
      {tiles.map((tile, i) => <Tile key={i} tile={tile} />)}
      </div>
    )
  }
})

export default Board
