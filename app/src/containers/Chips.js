import React from 'react'
import {connect} from 'react-redux'
import Chip from 'src/components/Chip'
import {selectChip} from 'src/actions/chips'

const Chips = ({chips, selectChip}) =>
  <div style={{position: 'relative'}}>
    {chips.map((chip) =>
      <Chip
        key={chip.id}
        {...chip}
        onClick={() => {
          if (chip.selectable) {
            selectChip(chip.id)
          }
        }}
        />
    )}
  </div>

const mapStateToProps = (state) => ({
  chips: state.chips
})

export default connect(mapStateToProps, {selectChip})(Chips)
