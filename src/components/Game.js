import React from 'react'
import Board from './Board'
import Movements from './Movements'
import Chips from './Chips'
import Status from './Status'
import { connect } from 'react-redux'
import {
  moveChip,
  showMoves,
  cleanMovements
} from '../actions/ChipsActions'

const Game = ({board, movements, chips, game, moveChip, showMoves, cleanMovements}) => {
  return (
    <div>
      <Status game={game} />
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
  cleanMovements
})(Game)
