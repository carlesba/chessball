import React from 'react'

const Status = ({game, kickOff}) => {
  const {scoreTeamA, scoreTeamB, turnOwner} = game
  const score = `Reds ${scoreTeamA} - ${scoreTeamB} Blues`
  const playerTurn = turnOwner === 0
    ? 'Red\'s turn'
    : 'Blue\'s turn'
  if (game.isGoal) {
    console.log('GOOOOOOOOOOOOOOOOOOOOAL!')
    setTimeout(() => {
      kickOff()
    }, 2000)
  }
  return (
    <div className='status'>
        <div className='status-score'>{score}</div>
        <div className='status-turn'>{playerTurn}</div>
    </div>
  )
}

export default Status
