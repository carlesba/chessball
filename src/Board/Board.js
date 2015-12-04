import React from 'react'
import Row from './Row'

const Board = React.createClass({
  render: function () {
    return (
    <div className='board'>
				{this.props.boardData.map((data, i) => <Row key={i} data={data}/>)}
			</div>
    )
  }
})

export default Board
