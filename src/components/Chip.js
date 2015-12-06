import React from 'react'
import Rx from 'rx'

const colors = {
  ball: 'black',
  player0: 'red',
  player1: 'blue'
}
const getReferencePoints = (domNode) => {
  // const point = domNode.getBoundingClientRect()
  const reference = domNode.parentNode
    .getBoundingClientRect()
  return {
    topRef: reference.top,
    leftRef: reference.left
    // topRef: reference.top - point.top,
    // leftRef: reference.left - reference.left
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
    cols: Math.round(translateX / 50),
    rows: Math.round(translateY / 50)
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
      translateX: 0,
      translateY: 0
    }
  },
  componentWillReceiveProps (nextProps) {
    this.updateDefaultPosition()
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
    const chipWidth = this.el.getBoundingClientRect().width
    const mousemove = Rx.Observable.fromEvent(document, 'mousemove')
      .map((evt) => {
        const {topRef, leftRef} = getReferencePoints(this.el)
        const {x, y} = evt
        return {
          x: x - leftRef - chipWidth / 2,
          y: y - topRef - chipWidth / 2
        }
      })
      .subscribe(this.updatePosition)

    Rx.Observable.fromEvent(document, 'mouseup')
      .first()
      .subscribe((e) => {
        mousemove.dispose()
        const movement = calculateTiles(this.state)
        const nextPosition = {
          row: currentPosition.row + movement.rows,
          col: currentPosition.col + movement.cols
        }
        console.log(movement)
        moveChip(chip.chipId, currentPosition, nextPosition)
      })
  },
  updatePosition (position) {
    const {x, y} = position
    this.setState({
      moving: true,
      translateX: x,
      translateY: y
    })
  },
  updateDefaultPosition () {
    this.setState(this.getInitialState())
  }
})

export default Chip
