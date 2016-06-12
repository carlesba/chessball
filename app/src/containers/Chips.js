import React from 'react'
import {connect} from 'react-redux'
import Chip from 'src/components/Chip'
import {selectChip} from 'src/actions/chips'
import chipSelector from 'src/selectors/chipSelector'

const Chips = ({chips}) => {
  return (
    <div style={{position: 'relative'}}>
      {chips.map((chip) =>
        <Chip
          key={chip.key}
          position={chip.position}
          color={chip.color}
          team={chip.team}
          isSelected={chip.isSelected}
          selectable={chip.selectable}
          type={chip.type}
          onClick={chip.onClick}
          />
      )}
    </div>
  )
}

const mergeProps = (state, actions) => {
  return {
    chips: chipSelector(state, actions)
  }
}

export default connect(
  (state) => state,
  {selectChip},
  mergeProps
)(Chips)
