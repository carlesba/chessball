import React, {PropTypes} from 'react'
import {
  getReferencePoints,
  pixelsToMovement,
  applyMoveToPosition,
  positionToPixels
} from '../utils/position'
import {observe, once} from '../utils/events'
import {getChipBackground, getChipHighlight} from '../utils/design'
import {CHIP_WIDTH} from '../utils/constants'

const getChipStyles = (chip, {moving, x, y}) => {
  const transformScale = moving ? ' scale(1.2)' : ''
  const shadow = chip.highlighted
    ? `0px 0px 8px 4px ${getChipHighlight()}`
    : 'initial'
  return Object.assign({}, {
    zIndex: moving ? 10 : 0,
    backgroundColor: getChipBackground(chip),
    transform: `translate(${x}px,${y}px) ${transformScale}`,
    boxShadow: shadow
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
    return (
    <div
      ref={(el) => this.el = el }
      className='chip'
      style={styles}
      onMouseDown={this.bindMouse}
    />
    )
  },
  bindMouse () {
    const { moveChip, showMoves, cleanMovements, chip } = this.props
    if (!chip.highlighted) return
    const origin = positionToPixels(chip)
    showMoves(chip.chipId)
    const mousemoveDispose = observe(document, 'mousemove', (evt) => {
      const mouse = {x: evt.x, y: evt.y}
      this.updatePosition({origin, mouse})
    })

    once(document, 'mouseup', () => {
      mousemoveDispose()
      const movement = pixelsToMovement(this.state)
      if (movement.rows === 0 && movement.cols === 0) {
        cleanMovements()
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
