import React from 'react'
import Rx from 'rx'
import {
  getReferencePoints,
  calculateTiles,
  applyMoveToPosition,
  positionToPixels
} from '../utils/position'
import {getBackground} from '../utils/design'
import {CHIP_WIDTH} from '../utils/constants'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  moveChip,
  showMoves,
  cleanHighlights
} from '../actions/ChipsActions'

const Chip = React.createClass({
  propTypes: {
    board: React.PropTypes.array.isRequired,
    chip: React.PropTypes.object.isRequired,
    moveChip: React.PropTypes.func,
    showMoves: React.PropTypes.func,
    cleanHighlights: React.PropTypes.func,
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
    const transformScale = moving ? ' scale(1.2)' : ''
    const styles = Object.assign({}, {
      zIndex: moving ? 10 : 0,
      backgroundColor: getBackground(chip),
      transform: `translate(${translateX}px,${translateY}px) ${transformScale}`
    }, positionToPixels(chip))
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
      cleanHighlights,
      chip
    } = this.props
    const origin = positionToPixels(chip)
    showMoves(chip)
    const mousemove = Rx.Observable.fromEvent(document, 'mousemove')
      .map((evt) => {
        const mouse = {x: evt.x, y: evt.y}
        return {origin, mouse}
      })
      .subscribe(this.updatePosition)

    Rx.Observable.fromEvent(document, 'mouseup')
      .first()
      .subscribe(() => {
        mousemove.dispose()
        const {translateX, translateY} = this.state
        const movement = calculateTiles(translateX, translateY)
        if (movement.rows === 0 && movement.cols === 0) { return cleanHighlights() }
        const nextPosition = applyMoveToPosition(chip, movement)
        moveChip(chip.chipId, nextPosition)
        cleanHighlights()
      })
  },
  updatePosition ({origin, mouse}) {
    const {x, y} = mouse
    const {top, left} = origin
    const {topRef, leftRef} = getReferencePoints(this.el)
    this.setState({
      moving: true,
      translateX: x - leftRef - left - CHIP_WIDTH / 2,
      translateY: y - topRef - top - CHIP_WIDTH / 2
    })
  }
})

function dispatchToProps (dispatch) {
  return {
    moveChip: bindActionCreators(moveChip, dispatch),
    showMoves: bindActionCreators(showMoves, dispatch),
    cleanHighlights: bindActionCreators(cleanHighlights, dispatch)
  }
}

export default connect(null, dispatchToProps)(Chip)
