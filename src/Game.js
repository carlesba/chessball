import React from 'react'
import Chip from './Chip/Chip'
import ChipsStore from './stores/ChipsStore'

function getChipsSate () {
  return {
    chips: ChipsStore.getChips()
  }
}

const Game = React.createClass({
  getInitialState () {
    return getChipsSate()
  },
  componentWillMount () {
    this.positionStream = ChipsStore.subscribePositionStream(this.updateChips)
  },
  componentWillUnmount () {
    this.positionStream.dispose()
  },
  updateChips (chips) {
    this.setState({chips})
  },
  render () {
    const chips = this.state.chips.map((chip, i) => {
      return <Chip key={i} chip={chip}/>
    })
    return (
    <div className='game'>{chips}</div>
    )
  }
})

export default Game
