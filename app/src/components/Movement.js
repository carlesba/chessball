import React from 'react'

const Movement = ({position, onClick}) => {
  const [top, left] = position.toPixels()
  const styles = Object.assign({}, movementStyle, {
    top,
    left
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
