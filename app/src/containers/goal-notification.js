import React from 'react'
import {connect} from 'react-redux'
import {kickOff} from 'src/actions/chips'

const GoalNotification = React.createClass({
  render () {
    return (
      <div
        style={dialogWrapperStyles}
        onClick={() => this.props.kickOff()}
      >
        <div style={goalNotificationStyles}>Goal!!</div>
      </div>
    )
  }
})

const dialogWrapperStyles = {
  position: 'absolute',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0
}

const goalNotificationStyles = {
  position: 'absolute',
  top: '40%',
  background: 'yellow',
  fontSize: '40px',
  fontFamily: 'Helvetica, Arial, sans-serif',
  fontWeigth: 'bold'
}

export default connect(null, {kickOff})(GoalNotification)
