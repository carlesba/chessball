import React from 'react'
import Rx from 'rx'
import ReactDOM from 'react-dom'
// import { moveChip } from '../actions/ChipsActions'

const colors = {
  ball: 'black',
  player0: 'red',
  player1: 'blue'
}
const getReferencePoints = () => {
  const reference = document.getElementsByClassName('chessball')[0]
    .getBoundingClientRect()
  return {
    topRef: reference.top,
    leftRef: reference.left
  }
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
    const {top, left} = this.props.chip
    const {moving, translateX, translateY} = this.state
    const styles = {top, left,
      zIndex: moving ? 10 : 0,
      backgroundColor: this.getBackground(),
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
    // const {translateX, translateY} = this.state
    const {top, left} = this.props.chip
    this.setState({
      moving: true,
      translateX: x - left,
      translateY: y - top
    })
  },
  updateDefaultPosition () {
    this.setState(this.getInitialState())
  },
  getBackground () {
    const {kind, team} = this.props.chip
    const colorKey = (team > -1)
      ? `${kind}${team}`
      : `${kind}${team}`
    return colors[colorKey]
  }
})

export default Chip
