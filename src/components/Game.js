import React from 'react'
import Board from './Board'
import Chips from './Chips'
import { connect } from 'react-redux'

const Game = ({board, chips}) => {
  return (
    <div className='game' id='game'>
      <Board boardData={board} />
      <Chips chips={chips} />
    </div>
  )
}

function mapStateToProps (state, props) {
  return {
    chips: state.chips,
    board: props.board
  }
}

export default connect(mapStateToProps)(Game)
