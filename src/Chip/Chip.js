import React from 'react'
import Rx from 'rx'
import ReactDOM from 'react-dom'
import { moveChip } from '../actions/ChipsActions'

const colors = {
  ball: 'black',
  player0: 'red',
  player1: 'blue'
}

const Chip = React.createClass({
  propTypes: {
    chip: React.PropTypes.Object
  },
  getInitialState () {
    return {
      translateX: 0,
      translateY: 0
    }
  },
  componentWillReceiveProps (nextProps) {
    this.updateDefaultPosition()
  },
  render () {
    const {top, left} = this.props.chip
    const {translateX, translateY} = this.state
    const styles = {top, left,
      backgroundColor: this.getBackground(),
      transform: `translate(${translateX}px,${translateY}px)`
    }
    return (
    <div
    ref={(el) => this.el = ReactDOM.findDOMNode(el)}
    className='chip'
    style={styles}
    onMouseDown={this.translate}
    />
    )
  },
  translate () {
    const mousemove = Rx.Observable.fromEvent(document, 'mousemove')
      .map((evt) => {
        return { x: evt.movementX, y: evt.movementY }
      })
      .subscribe(this.updatePosition)
    Rx.Observable.fromEvent(document, 'mouseup')
      .first()
      .subscribe((e) => {
        console.log(('mouseup', e))
        mousemove.dispose()
        const {translateX, translateY} = this.state
        const {chipId, top, left} = this.props.chip
        const nextX = translateX + left
        const nextY = translateY + top
        moveChip(chipId, nextY, nextX)
      })
  },
  updatePosition ({x, y}) {
    const {translateX, translateY} = this.state
    this.setState({
      translateX: x + translateX,
      translateY: y + translateY
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
