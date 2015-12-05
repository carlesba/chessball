import React from 'react'
import Chip from './Chip'
import { connect } from 'react-redux'

const Game = ({chips, moveChip}) => {
  return (
  <div className='game'>
    {chips.map((chip, i) => {
      return <Chip key={i} chip={chip} moveChip={moveChip}/>
    })}
  </div>
  )
}

function mapStateToProps (state) {
  return {
    chips: state.chips
  }
}

function dispatchToProps (dispatch) {
  return {
    moveChip: (chipId, top, left) => {
      dispatch({
        type: 'MOVE_CHIP',
        chipId,
        top,
        left
      })
    }
  }
}

export default connect(mapStateToProps, dispatchToProps)(Game)
