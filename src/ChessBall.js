import React from 'react'
import Board from './Board/Board'
import Game from './Game'

const ChessBall = React.createClass({
  propTypes: {
    board: React.PropTypes.Object,
    chips: React.PropTypes.Array
  },
  render () {
    const {board, chips} = this.props
    return (
    <div className='chessball'>
				<Board boardData={board}/>
				<Game chips={chips} />
			</div>
    )
  }
})

export default ChessBall
