import React from 'react'

const Chip = ({position}) => {
  const styles = {
    position: 'absolute',
    top: `${position[0] * 50}px`,
    left: `${position[1] * 50}px`,
    width: '30px',
    height: '30px',
    background: 'yellow'
  }
  return (
    <div style={styles} />
  )
}

export default Chip
