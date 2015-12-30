import React from 'react'
import classname from 'classname'

const Tile = ({tile}) => {
  const {row, col, kind, area} = tile
  const style = col === 0
    ? { clear: 'left' }
    : {}
  const classes = classname('tile', {
    'tile--special': kind === 'special',
    'tile--big-area': area === 'big',
    'tile--small-area': area === 'small',
    'tile--goal': kind === 'goal',
    'tile--blank': kind === 'blank',
    'tile--odd': (row + col) % 2 === 0
  })

  return (
    <div className={classes} style={style} />
  )
}

export default Tile
