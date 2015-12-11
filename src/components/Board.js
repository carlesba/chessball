import React from 'react'
import Tile from './Tile'

const Board = ({board}) => {
  return (
  <div className='board'>
      {board.map((tile, i) => <Tile key={i} tile={tile} />)}
    </div>
  )
}

export default Board
