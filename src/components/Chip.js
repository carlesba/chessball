import React from 'react'
import Rx from 'rx'
import {
  getReferencePoints,
  calculateTiles,
  calculateNextPosition
} from '../utils/position'
import {getBackground} from '../utils/design'
import {CHIP_WIDTH} from '../utils/constants'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { moveChip, showMoves } from '../actions/ChipsActions'

const Chip = React.createClass({
  propTypes: {
    chip: React.PropTypes.object,
    moveChip: React.PropTypes.func,
    showMoves: React.PropTypes.func,
    currentPosition: React.PropTypes.object
  },
  getInitialState () {
    return {
      moving: false,
      translateX: 5,
      translateY: 5
    }
  },
  componentWillReceiveProps () {
    this.setState(this.getInitialState())
  },
  render () {
    const {chip} = this.props
    const {moving, translateX, translateY} = this.state
    const styles = {
      zIndex: moving ? 10 : 0,
      backgroundColor: getBackground(chip),
      transform: `translate(${translateX}px,${translateY}px)`
    }
    return (
    <div
      ref={(el) => this.el = el }
      className='chip'
      style={styles}
      onMouseDown={this.translate}
    />
    )
  },
  translate () {
    const {
      moveChip,
      showMoves,
      currentPosition,
      chip
    } = this.props
    showMoves(currentPosition)
    const mousemove = Rx.Observable.fromEvent(document, 'mousemove')
      .subscribe(this.updatePosition)

    Rx.Observable.fromEvent(document, 'mouseup')
      .first()
      .subscribe(() => {
        mousemove.dispose()
        const movement = calculateTiles(this.state)
        if (movement.rows === 0 && movement.cols === 0) { return }
        const nextPosition = calculateNextPosition(currentPosition, movement)
        moveChip(chip.chipId, currentPosition, nextPosition)
      })
  },
  updatePosition (evt) {
    const {x, y} = evt
    const {topRef, leftRef} = getReferencePoints(this.el)
    this.setState({
      moving: true,
      translateX: x - leftRef - CHIP_WIDTH / 2,
      translateY: y - topRef - CHIP_WIDTH / 2
    })
  }
})

function dispatchToProps (dispatch) {
  return {
    moveChip: bindActionCreators(moveChip, dispatch),
    showMoves: bindActionCreators(showMoves, dispatch)
  }
}

export default connect(null, dispatchToProps)(Chip)
