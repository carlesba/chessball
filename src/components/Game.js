import React from 'react'
import Board from './Board'
import Movements from './Movements'
import Chips from './Chips'
import Status from './Status'
import classname from 'classname'
import { connect } from 'react-redux'
import {
  moveChip,
  showMoves,
  cleanMovements,
  kickOff
} from '../actions/ChipsActions'

const Game = ({board, movements, chips, game, moveChip, showMoves, cleanMovements, kickOff}) => {
  const classes = classname({
    'kickoff': game.isKickOff
  })
  return (
    <div className={classes}>
      <Status game={game} kickOff={kickOff} />
      <div className='game' id='game'>
        <Board board={board} />
        <Movements movements={movements} />
        <Chips
          chips={chips}
          game={game}
          moveChip={moveChip}
          showMoves={showMoves}
          cleanMovements={cleanMovements}
        />
      </div>
    </div>
  )
}

function mapStateToProps (state) {
  return {
    chips: state.chips,
    board: state.board,
    movements: state.movements,
    game: state.game
  }
}

export default connect(mapStateToProps, {
  moveChip,
  showMoves,
  cleanMovements,
  kickOff
})(Game)
