import React from 'react'
import {positionToPixels} from 'src/models/Position'

const Movement = ({position, onClick}) => {
  const positionInPixels = positionToPixels(position)
  const styles = Object.assign({}, movementStyle, {
    top: positionInPixels[0],
    left: positionInPixels[1]
  })
  return (
    <div style={styles} onClick={onClick} />
  )
}

const movementStyle = {
  position: 'absolute',
  width: '40px',
  height: '40px',
  margin: '5px',
  opacity: 0.5,
  background: 'white'
}

export default Movement
