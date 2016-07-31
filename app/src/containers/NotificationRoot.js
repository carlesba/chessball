import React from 'react'
import {connect} from 'react-redux'
import GoalNotification from 'src/containers/goal-notification'

const NotificationRoot = React.createClass({
  render () {
    if (!this.props.isGoal) return null
    return (
      <div style={notificationStyles}><GoalNotification /></div>
    )
  }
})

const notificationStyles = {
  position: 'relative',
  height: '100vh'
}

export default connect(
  (state) => ({
    isGoal: state.chips.isGoal()
  }),
)(NotificationRoot)
