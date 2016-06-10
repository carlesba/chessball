import React from 'react'
import {connect} from 'react-redux'
import Movement from 'src/components/Movement'
import calculateMovements from 'src/selectors/calculateMovements'
import getSelectedChip from 'src/selectors/getSelectedChip'
import {moveSelectedChip} from 'src/actions/chips'

const Movements = ({movements, moveSelectedChip, turnOwner}) => {
  return (
    <div>
      {movements.map((movement, i) =>
        <Movement
          key={i}
          position={movement}
          onClick={() => {
            moveSelectedChip(movement, turnOwner)
          }}
        />
      )}
    </div>
  )
}

const mapStateToProps = (state) => {
  const selectedChip = getSelectedChip(state)
  return {
    movements: calculateMovements(state.chips),
    turnOwner: selectedChip && selectedChip.team
  }
}

export default connect(mapStateToProps, {moveSelectedChip})(Movements)
