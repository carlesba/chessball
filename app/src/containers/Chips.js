import React from 'react'
import {connect} from 'react-redux'
import Chip from 'src/components/Chip'

const Chips = ({chips}) =>
  <div style={{position: 'relative'}}>
    {chips.map((chip) =>
      <Chip
        key={chip.id}
        {...chip}
        onClick={() => {
          if (chip.selectable) {
            console.log('click')
          }
        }}
        />
    )}
  </div>

const mapStateToProps = (state) => ({
  chips: state.chips
})

export default connect(mapStateToProps)(Chips)
