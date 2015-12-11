import React from 'react'
import Board from './Board'
import Highlights from './Highlights'
import Chips from './Chips'
import { connect } from 'react-redux'

const Game = ({board, chips}) => {
  return (
    <div className='game' id='game'>
      <Board board={board.tiles} />
      <Highlights highlights={board.highlights} />
      <Chips chips={chips} board={board.tiles} />
    </div>
  )
}

function mapStateToProps (state) {
  return {
    chips: state.chips,
    board: state.board
  }
}

export default connect(mapStateToProps)(Game)
