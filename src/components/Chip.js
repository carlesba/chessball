import React, {PropTypes} from 'react'
import classname from 'classname'
import {
  getReferencePoints,
  pixelsToMovement,
  applyMoveToPosition,
  positionToPixels
} from '../utils/position'
import {observe, once} from '../utils/events'
import { update } from '../utils/immutable'
import {CHIP_WIDTH} from '../utils/constants'

const getChipStyles = (chip, {moving, x, y}) => {
  const transformScale = moving ? ' scale(1.2)' : ''
  return update({
    zIndex: moving ? 10 : 0,
    transform: `translate(${x}px,${y}px) ${transformScale}`
  }, positionToPixels(chip))
}

const Chip = React.createClass({
  propTypes: {
    chip: PropTypes.object.isRequired,
    moveChip: PropTypes.func,
    showMoves: PropTypes.func,
    cleanMovements: PropTypes.func
  },
  getInitialState () {
    return { moving: false, x: 5, y: 5 }
  },
  componentWillReceiveProps () {
    this.setState(this.getInitialState())
  },
  render () {
    const {chip} = this.props
    return (
    <div
      ref={(el) => this.el = el }
      className={classname('chip', {
        'chip--ball': chip.kind === 'ball',
        'chip--team-a': chip.kind === 'player' && chip.team === 0,
        'chip--team-b': chip.kind === 'player' && chip.team === 1,
        'chip--goalkeeper': chip.isGoalKeeper,
        'chip--highlight': chip.highlighted
      })}
      style={getChipStyles(chip, this.state)}
      onMouseDown={this.bindMouseMovements}
    />
    )
  },
  bindMouseMovements () {
    const { moveChip, showMoves, cleanMovements, chip } = this.props
    if (!chip.highlighted) return
    const origin = positionToPixels(chip)
    showMoves(chip.chipId)

    const mousemoveDispose = observe(document, 'mousemove', ({x, y}) => {
      this.updatePosition(origin, {x: x, y: y})
    })

    once(document, 'mouseup', () => {
      mousemoveDispose()
      const movement = pixelsToMovement(this.state)
      if (movement.rows === 0 && movement.cols === 0) {
        cleanMovements()
        this.resetComponent()
      } else {
        moveChip(
          chip.chipId,
          applyMoveToPosition(chip, movement)
        )
        this.resetComponent()
      }
    })
  },
  resetComponent () {
    this.setState(this.getInitialState())
  },
  updatePosition (origin, {x, y}) {
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
