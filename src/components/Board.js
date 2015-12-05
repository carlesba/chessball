import React from 'react'
import Row from './Row'

const Board = ({board}) => {
  return (
  <div className='board'>
      {board.map((data, i) => <Row key={i} data={data}/>)}
    </div>
  )
}

export default Board
