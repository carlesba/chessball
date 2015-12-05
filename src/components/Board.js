import React from 'react'
import Row from './Row'

const Board = React.createClass({
  propTypes: {
    boardData: React.PropTypes.array
  },
  render: function () {
    const { boardData } = this.props
    return (
    <div className='board'>
        {boardData.map((data, i) => <Row key={i} data={data}/>)}
      </div>
    )
  }
})

export default Board
