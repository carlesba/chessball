import React from 'react'
import Rx from 'rx'

const TILE_WIDTH = 50
const CHIP_WIDTH = 40

const colors = {
  ball: 'black',
  player0: 'red',
  player1: 'blue'
}
const getReferencePoints = (domNode) => {
  const {top, left} = domNode.parentNode.getBoundingClientRect()
  return {
    topRef: top,
    leftRef: left
  }
}
const getBackground = (chip) => {
  const {kind, team} = chip
  const colorKey = (team > -1)
    ? `${kind}${team}`
    : `${kind}${team}`
  return colors[colorKey]
}

const calculateTiles = ({translateX, translateY}) => {
  return {
    cols: Math.round(translateX / TILE_WIDTH),
    rows: Math.round(translateY / TILE_WIDTH)
  }
}

const Chip = React.createClass({
  propTypes: {
    chip: React.PropTypes.object,
    moveChip: React.PropTypes.func,
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
    const { moveChip, currentPosition, chip } = this.props
    const mousemove = Rx.Observable.fromEvent(document, 'mousemove')
      .subscribe(this.updatePosition)

    Rx.Observable.fromEvent(document, 'mouseup')
      .first()
      .subscribe(() => {
        mousemove.dispose()
        const {rows, cols} = calculateTiles(this.state)
        if (rows === 0 && cols === 0) { return }
        const nextPosition = {
          row: currentPosition.row + rows,
          col: currentPosition.col + cols
        }
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

export default Chip
