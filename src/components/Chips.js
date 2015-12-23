import React from 'react'
import Chip from './Chip'

const Chips = ({chips, moveChip, showMoves, cleanMovements}) => {
  return (
    <div className='chips'>
      {chips.map((chip) => {
        return (
          <Chip
            key={chip.chipId}
            chip={chip}
            moveChip={moveChip}
            showMoves={showMoves}
            cleanMovements={cleanMovements}
          />)
      })}
    </div>
  )
}

export default Chips
