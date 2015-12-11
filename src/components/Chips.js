import React from 'react'
import Chip from './Chip'

const Chips = ({chips, highlights}) => {
  return (
    <div className='chips'>
      {chips.map((chip) => {
        return (<Chip key={chip.chipId} chip={chip} highlights={highlights} />)
      })}
    </div>
  )
}

export default Chips
