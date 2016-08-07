import React from 'react'
import objectComposer from 'src/lib/objectComposer'

const Movement = React.createClass({
  render () {
    const {position, message} = this.props
    const [top, left] = position.toPixels()
    const styles = objectComposer(movementStyle, { top, left },
      [forbiddenMovementStyle, !!message]
    )
    if (message) console.log(position, message)
    console.log()
    return (
      <div
        style={styles}
        onClick={this.props.onClick}
        />
    )
  }
})

const movementStyle = {
  position: 'absolute',
  width: '40px',
  height: '40px',
  margin: '5px',
  background: 'rgba(255, 255, 255, 0.5)',
  cursor: 'pointer'
}

const forbiddenMovementStyle = {
  background: 'rgba(255, 0, 0, 0.2)',
  cursor: 'auto'
}

export default Movement
