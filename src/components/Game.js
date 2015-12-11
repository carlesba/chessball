import React from 'react'
import Board from './Board'
import Highlights from './Highlights'
import Chips from './Chips'
import { connect } from 'react-redux'

const Game = ({board, highlights, chips}) => {
  return (
    <div className='game' id='game'>
      <Board board={board} />
      <Highlights highlights={highlights} />
      <Chips chips={chips} />
    </div>
  )
}

function mapStateToProps (state) {
  return {
    chips: state.chips,
    board: state.board,
    highlights: state.highlights
  }
}

export default connect(mapStateToProps)(Game)
