import React from 'react'

const Status = ({game}) => {
  const {scoreTeamA, scoreTeamB, turnOwner} = game
  const score = `${scoreTeamA}-${scoreTeamB}`
  return (
    <div className='status'>
        <div>{score}</div>
        <div>turn {turnOwner}</div>
    </div>
  )
}

export default Status
