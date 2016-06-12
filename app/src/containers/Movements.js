import React from 'react'
import {connect} from 'react-redux'
import Movement from 'src/components/Movement'
import calculateMovements from 'src/selectors/calculateMovements'
import selectedChipSelector from 'src/selectors/selectedChipSelector'
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
  const selectedChip = selectedChipSelector(state)
  return {
    movements: calculateMovements(state.chips),
    turnOwner: selectedChip && selectedChip.team
  }
}

export default connect(mapStateToProps, {moveSelectedChip})(Movements)
