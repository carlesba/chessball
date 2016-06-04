import React from 'react'
import Board from 'src/components/Board'
import Chips from 'src/containers/Chips'

const Game = () => {
  return (
    <div style={styles}>
      <Board />
      <Chips />
    </div>
  )
}
const styles = {
  margin: 'auto',
  width: `${11 * 50}px`
}

export default Game
