import React from 'react'

const Status = ({game}) => {
  const {scoreTeamA, scoreTeamB, turnOwner} = game
  const score = `${scoreTeamA}-${scoreTeamB}`
  const playerTurn = turnOwner === 0
    ? 'Red\'s turn'
    : 'Blue\'s turn'
  return (
    <div className='status'>
        <div>{score}</div>
        <div>{playerTurn}</div>
    </div>
  )
}

export default Status
