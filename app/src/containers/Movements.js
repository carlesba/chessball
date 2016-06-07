import React from 'react'
import {connect} from 'react-redux'
import Movement from 'src/components/Movement'
import calculateMovements from 'src/selectors/calculateMovements'
import {moveSelectedChip} from 'src/actions/chips'

const Movements = ({movements, moveSelectedChip}) => {
  return (
    <div>
      {movements.map((movement, i) =>
        <Movement
          key={i}
          position={movement}
          onClick={() => {
            moveSelectedChip(movement)
          }}
        />
      )}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    movements: calculateMovements(state.chips)
  }
}

export default connect(mapStateToProps, {moveSelectedChip})(Movements)
