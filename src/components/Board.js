import React from 'react'
import Tile from './Tile'

const Board = ({board, chips, moveChip}) => {
  return (
  <div className='board'>
      {board.map((tile, i) => <Tile key={i} tile={tile} chips={chips} moveChip={moveChip}/>)}
    </div>
  )
}

export default Board
