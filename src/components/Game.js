import React from 'react'
import Board from './Board'
import Highlights from './Highlights'
import Chips from './Chips'
import Status from './Status'
import { connect } from 'react-redux'

const Game = ({board, highlights, chips, game}) => {
  return (
    <div>
      <Status game={game} />
      <div className='game' id='game'>
        <Board board={board} />
        <Highlights highlights={highlights} />
        <Chips chips={chips} />
      </div>
    </div>
  )
}

function mapStateToProps (state) {
  return {
    chips: state.chips,
    board: state.board,
    highlights: state.highlights,
    game: state.game
  }
}

export default connect(mapStateToProps)(Game)
