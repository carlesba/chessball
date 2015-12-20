import React from 'react'
import Board from './Board'
import Highlights from './Highlights'
import Chips from './Chips'
import Status from './Status'
import { connect } from 'react-redux'
import {
  moveChip,
  showMoves,
  cleanHighlights
} from '../actions/ChipsActions'

const Game = ({board, highlights, chips, game, moveChip, showMoves, cleanHighlights}) => {
  return (
    <div>
      <Status game={game} />
      <div className='game' id='game'>
        <Board board={board} />
        <Highlights highlights={highlights} />
        <Chips
          chips={chips}
          game={game}
          moveChip={moveChip}
          showMoves={showMoves}
          cleanHighlights={cleanHighlights}
        />
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

export default connect(mapStateToProps, {
  moveChip,
  showMoves,
  cleanHighlights
})(Game)
