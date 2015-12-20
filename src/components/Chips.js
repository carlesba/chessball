import React from 'react'
import Chip from './Chip'

const Chips = ({chips, highlights, game, moveChip, showMoves, cleanHighlights}) => {
  return (
    <div className='chips'>
      {chips.map((chip) => {
        return (
          <Chip
            key={chip.chipId}
            chip={chip}
            highlights={highlights}
            game={game}
            moveChip={moveChip}
            showMoves={showMoves}
            cleanHighlights={cleanHighlights}
          />)
      })}
    </div>
  )
}

export default Chips
