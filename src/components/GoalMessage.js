import React from 'react'
import {GOAL_MESSAGE_TIME} from '../utils/constants'

const GoalMessage = ({isGoal, kickOff}) => {
  if (isGoal) {
    setTimeout(() => { kickOff() }, GOAL_MESSAGE_TIME)
    return (<div className='goal-message'>{'GOAL!!!'}</div>)
  } else {
    return (<div/>)
  }
}

export default GoalMessage
