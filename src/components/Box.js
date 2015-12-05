import React from 'react'
import classname from 'classname'
import { calcBackground } from '../builders/boxColors'
const SHOW_CONTENT = false

const Box = ({data}) => {
  const {row, col, kind} = data
  const style = {
    background: calcBackground(data)
  }
  const classes = classname('square', {
    'square--special': kind === 'special'
  })
  const content = SHOW_CONTENT ? `${row},${col}` : ''
  return (
    <div className={classes}
      style={style}
    >{content}</div>
  )
}

export default Box
