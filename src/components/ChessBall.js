import React from 'react'
import Board from './Board'
import Game from './Game'
import { connect } from 'react-redux'

const ChessBall = ({board, chips}) => {
  return (
    <div className='chessball'>
      <Board boardData={board} />
      <Game chips={chips} />
    </div>
  )
}

function mapStateToProps (state, props) {
  return {
    chips: state.chips,
    board: props.board
  }
}

export default connect(mapStateToProps)(ChessBall)
