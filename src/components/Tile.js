import React from 'react'
import classname from 'classname'
import { calcBackground } from '../builders/boxColors'

const Tile = ({tile}) => {
  const {col, kind} = tile
  const style = {
    background: calcBackground(tile),
    clear: col === 0 ? 'left' : 'none'
  }
  const classes = classname('tile', {
    'tile--special': kind === 'special'
  })

  return (
    <div
      className={classes}
      style={style}
    />
  )
}

export default Tile
