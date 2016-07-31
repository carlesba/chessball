import React from 'react'
import Board from 'src/components/Board'
import Movements from 'src/containers/Movements'
import NotificationRoot from 'src/containers/NotificationRoot'
import Chips from 'src/containers/Chips'

const Game = () => {
  return (
    <div style={styles}>
      <Board />
      <Movements />
      <Chips />
      <NotificationRoot />
    </div>
  )
}
const styles = {
  position: 'relative',
  margin: 'auto',
  width: `${11 * 50}px`
}

export default Game
