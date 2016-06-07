import React from 'react'
import {connect} from 'react-redux'
import Movement from 'src/components/Movement'
import calculateMovements from 'src/selectors/calculateMovements'

const Movements = ({movements}) => {
  return (
    <div>
      {movements.map((movement, i) =>
        <Movement
          key={i}
          position={movement}
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

export default connect(mapStateToProps)(Movements)
