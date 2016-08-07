import React from 'react'
import {connect} from 'react-redux'

const Score = React.createClass({
  render () {
    const [blues, reds] = this.props.score
    return (
      <div style={scoreStyles}>
        <div>
          <span>Blues {blues}</span>:<span>Reds {reds}</span>
        </div>
        <div>
          {this.props.nextMovement}
        </div>
        <div>
          {this.props.passesLeft}
        </div>
      </div>
    )
  }
})

const scoreStyles = {
  position: 'fixed',
  left: 0,
  top: 0
}

export default connect(
  (state) => {
    const {score, chips, passCount} = state
    const nextMovement = chips.getTeamOwner() === 'TEAM_A'
      ? 'Blues move'
      : 'Reds move'
    const passesLeft = passCount === 4
      ? 'You can\'t do more passes. Release the ball!'
      : `${passCount} passes`
    return {
      score: [score.TEAM_A, score.TEAM_B],
      nextMovement,
      passesLeft
    }
  }
)(Score)
