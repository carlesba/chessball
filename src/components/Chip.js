import React, {PropTypes} from 'react'
import Rx from 'rx'
import {
  getReferencePoints,
  pixelsToMovement,
  applyMoveToPosition,
  positionToPixels
} from '../utils/position'
import classname from 'classname'
import {getBackground} from '../utils/design'
import {CHIP_WIDTH} from '../utils/constants'

const getChipStyles = (chip, {moving, x, y}) => {
  const transformScale = moving ? ' scale(1.2)' : ''
  return Object.assign({}, {
    zIndex: moving ? 10 : 0,
    backgroundColor: getBackground(chip),
    transform: `translate(${x}px,${y}px) ${transformScale}`
  }, positionToPixels(chip))
}

const Chip = React.createClass({
  propTypes: {
    chip: PropTypes.object.isRequired,
    moveChip: PropTypes.func,
    showMoves: PropTypes.func,
    cleanHighlights: PropTypes.func
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
    const styles = getChipStyles(chip, this.state)
    const classes = classname('chip', {
      'chip--highlight': chip.highlighted
    })
    return (
    <div
      ref={(el) => this.el = el }
      className={classes}
      style={styles}
      onMouseDown={this.translate}
    />
    )
  },
  translate () {
    const { moveChip, showMoves, cleanHighlights, chip } = this.props
    if (!chip.highlighted) return
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

export default Chip
