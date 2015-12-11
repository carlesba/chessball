import React from 'react'
import Chip from './Chip'

const Chips = ({board, chips}) => {
  return (
    <div className='chips'>
      {chips.map((chip) => {
        return (<Chip key={chip.chipId} chip={chip} board={board} />)
      })}
    </div>
  )
}

export default Chips
