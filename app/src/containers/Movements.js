import React from 'react'
import {connect} from 'react-redux'
import Movement from 'src/components/Movement'
// import calculateMovements from 'src/selectors/calculateMovements'
import * as chipActions from 'src/actions/chips'

const Movements = ({movements, moveSelectedChip, turnOwner}) => {
  return (
    <div>
      {movements.map((movement, i) =>
        <Movement
          key={i}
          position={movement.position}
          onClick={movement.onClick}
        />
      )}
    </div>
  )
}

const mergeProps = (state, actions) => {
  const selectedChip = state.chips.getSelectedChip()
  return {
    // movements: calculateMovements(state.chips, actions),
    movements: [],
    turnOwner: selectedChip && selectedChip.team
  }
}

export default connect(
  ({chips}) => ({chips}),
  chipActions,
  mergeProps
)(Movements)
