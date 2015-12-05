import React from 'react'
import Rx from 'rx'
import ReactDOM from 'react-dom'

const colors = {
  ball: 'black',
  player0: 'red',
  player1: 'blue'
}
const getReferencePoints = () => {
  const reference = document.getElementById('game')
    .getBoundingClientRect()
  return {
    topRef: reference.top,
    leftRef: reference.left
  }
}
const getBackground = (chip) => {
  const {kind, team} = chip
  const colorKey = (team > -1)
    ? `${kind}${team}`
    : `${kind}${team}`
  return colors[colorKey]
}

const Chip = React.createClass({
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
    const {top, left} = chip
    const {moving, translateX, translateY} = this.state
    const styles = {top, left,
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
    const chipWidth = this.el.getBoundingClientRect().width
    const mousemove = Rx.Observable.fromEvent(document, 'mousemove')
      .map((evt) => {
        const {topRef, leftRef} = getReferencePoints()
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
        console.log(('mouseup', e))
        mousemove.dispose()
        const {translateX, translateY} = this.state
        const { chip, moveChip } = this.props
        const {chipId, top, left} = chip
        const nextX = translateX + left
        const nextY = translateY + top
        moveChip(chipId, nextY, nextX)
      })
  },
  updatePosition ({x, y}) {
    const {top, left} = this.props.chip
    this.setState({
      moving: true,
      translateX: x - left,
      translateY: y - top
    })
  },
  updateDefaultPosition () {
    this.setState(this.getInitialState())
  }
})

export default Chip
