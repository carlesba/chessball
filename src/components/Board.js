import React from 'react'
import Row from './Row'

const Board = ({boardData}) => {
  return (
  <div className='board'>
      {boardData.map((data, i) => <Row key={i} data={data}/>)}
    </div>
  )
}

export default Board
