import React from 'react'
import Chip from './Chip'
import { connect } from 'react-redux'
// import ChipsStore from '../stores/ChipsStore'

// function getChipsSate () {
//   return {
//     chips: ChipsStore.getChips()
//   }
// }

const Game = React.createClass({
  // getInitialState () {
  //   return getChipsSate()
  // },
  // componentWillMount () {
  //   this.positionStream = ChipsStore.subscribePositionStream(this.updateChips)
  // },
  // componentWillUnmount () {
  //   this.positionStream.dispose()
  // },
  // updateChips (chips) {
  //   this.setState({chips})
  // },
  render () {
    const { chips, moveChip } = this.props
    return (
    <div className='game'>
      {chips.map((chip, i) => {
        return <Chip key={i} chip={chip} moveChip={moveChip}/>
      })}
    </div>
    )
  }
})

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
