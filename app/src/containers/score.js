import React from 'react'
import {connect} from 'react-redux'

const Score = React.createClass({
  render () {
    const [blues, reds] = this.props.score
    return (
      <div style={scoreStyles}>
        <span>Blues {blues}</span>:<span>Reds {reds}</span>
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
    const {score} = state
    return {
      score: [score.TEAM_A, score.TEAM_B]
    }
  }
)(Score)
