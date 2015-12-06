import React from 'react'
import Tile from './Tile'

const Board = ({board, chips}) => {
  return (
  <div className='board'>
      {board.map((tile, i) => <Tile key={i} tile={tile} chips={chips} />)}
    </div>
  )
}

export default Board
