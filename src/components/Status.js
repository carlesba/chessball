import React from 'react'
import GoalMessage from './GoalMessage'

const Status = ({game, kickOff}) => {
  const {scoreTeamA, scoreTeamB, turnOwner} = game
  const score = `Reds ${scoreTeamA} - ${scoreTeamB} Blues`
  const playerTurn = turnOwner === 0
    ? 'Red\'s turn'
    : 'Blue\'s turn'
  return (
    <div className='status'>
      <div className='status-score'>{score}</div>
      <div className='status-turn'>{playerTurn}</div>
      <GoalMessage isGoal={game.isGoal} kickOff={kickOff} />
    </div>
  )
}

export default Status
