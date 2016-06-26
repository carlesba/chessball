import React from 'react'
import {connect} from 'react-redux'
import isGoalSelector from 'src/selectors/isGoalSelector'

const NotificationRoot = React.createClass({
  render () {
    const goal = this.props.isGoal
      ? (<div style={goalNotificationStyles}>Goal!!</div>)
      : null
    return (
      <div style={notificationStyles}>
        {goal}
      </div>
    )
  }
})

const notificationStyles = {
  position: 'absolute',
  top: '50vh'
}
const goalNotificationStyles = {
  background: 'yellow',
  fontSize: '40px',
  fontFamily: 'Helvetica, Arial, sans-serif',
  fontWeigth: 'bold'
}

export default connect((state) => {
  return {isGoal: isGoalSelector(state)}
})(NotificationRoot)
