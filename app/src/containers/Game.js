import React from 'react'
import Board from 'src/components/Board'
import Movements from 'src/containers/Movements'
import Chips from 'src/containers/Chips'
import {connect} from 'react-redux'
import isGoalSelector from 'src/selectors/isGoalSelector'
import {score} from 'src/actions/chips'

const Game = ({onClick}) => {
  return (
    <div style={styles} onClick={onClick}>
      <Board />
      <Movements />
      <Chips />
    </div>
  )
}
const styles = {
  position: 'relative',
  margin: 'auto',
  width: `${11 * 50}px`
}

const mergeProps = (state, actions) => {
  return {
    onClick: () => {
      if (isGoalSelector(state)) {
        actions.score()
      }
    }
  }
}

export default connect(
  (state) => state,
  {score},
  mergeProps
)(Game)
