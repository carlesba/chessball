import React from 'react'
import classname from 'classname'
import Chip from './Chip'
import { calcBackground } from '../builders/boxColors'
// const SHOW_CONTENT = false

const getChipData = (chipId, chips) => {
  return chips.find((chip) => {
    return chip.chipId === chipId
  })
}

const renderInnerChip = (chipId, chips, row, col) => {
  const chipData = getChipData(chipId, chips)
  const currentPosition = {row, col}
  return chipData
    ? (<Chip
        key={chipId}
        chip={chipData}
        currentPosition={currentPosition}
      />)
    : ''
}

const Tile = ({tile, chips}) => {
  const {row, col, kind, chipId} = tile
  const style = {
    background: calcBackground(tile),
    clear: col === 0 ? 'left' : 'none'
  }
  const classes = classname('tile', {
    'tile--special': kind === 'special'
  })
  const chip = renderInnerChip(chipId, chips, row, col)

  return (
    <div
      className={classes}
      style={style}
    >{chip}</div>
  )
}

export default Tile
