import React from 'react'
import classname from 'classname'
import { getTileBackground } from '../utils/design'

const Tile = ({tile}) => {
  const {col, kind} = tile
  const style = {
    background: getTileBackground(tile),
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
