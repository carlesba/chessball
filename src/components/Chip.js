import React, {PropTypes} from 'react'
import Rx from 'rx'
import {
  getReferencePoints,
  pixelsToMovement,
  applyMoveToPosition,
  positionToPixels
} from '../utils/position'
import {getBackground} from '../utils/design'
import {CHIP_WIDTH} from '../utils/constants'
import { connect } from 'react-redux'
import {
  moveChip,
  showMoves,
  cleanHighlights
} from '../actions/ChipsActions'

const Chip = React.createClass({
  propTypes: {
    chip: PropTypes.object.isRequired,
    moveChip: PropTypes.func,
    showMoves: PropTypes.func,
    cleanHighlights: PropTypes.func,
    game: PropTypes.object
  },
  getInitialState () {
    return {
      moving: false,
      x: 5,
      y: 5
    }
  },
  componentWillReceiveProps () {
    this.setState(this.getInitialState())
  },
  render () {
    const {chip} = this.props
    const {moving, x, y} = this.state
    const transformScale = moving ? ' scale(1.2)' : ''
    const styles = Object.assign({}, {
      zIndex: moving ? 10 : 0,
      backgroundColor: getBackground(chip),
      transform: `translate(${x}px,${y}px) ${transformScale}`
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
    const { moveChip, showMoves, cleanHighlights, chip, game } = this.props
    if (game.turnOwner !== chip.team) return
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
        const movement = pixelsToMovement(this.state)
        if (movement.rows === 0 && movement.cols === 0) {
          cleanHighlights()
          this.resetComponent()
        } else {
          const nextPosition = applyMoveToPosition(chip, movement)
          moveChip(chip.chipId, nextPosition)
          this.resetComponent()
        }
      })
  },
  resetComponent () {
    this.setState(this.getInitialState())
  },
  updatePosition ({origin, mouse}) {
    const {x, y} = mouse
    const {top, left} = origin
    const {topRef, leftRef} = getReferencePoints(this.el)
    this.setState({
      moving: true,
      x: x - leftRef - left - CHIP_WIDTH / 2,
      y: y - topRef - top - CHIP_WIDTH / 2
    })
  }
})

function mapStateToProps ({game}) { return { game } }

export default connect(mapStateToProps, {
  moveChip,
  showMoves,
  cleanHighlights
})(Chip)
