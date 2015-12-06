import React from 'react'
import Board from './Board'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { moveChip } from '../actions/ChipsActions'

const Game = ({board, chips, moveChip}) => {
  return (
    <div className='game' id='game'>
      <Board board={board} chips={chips} moveChip={moveChip}/>
    </div>
  )
}

function mapStateToProps (state) {
  return {
    chips: state.chips,
    board: state.board
  }
}

function dispatchToProps (dispatch) {
  return {
    moveChip: bindActionCreators(moveChip, dispatch)
  }
}

export default connect(mapStateToProps, dispatchToProps)(Game)
