import React from 'react'
import Chip from './Chip/Chip'
import ChipsStore from './stores/ChipsStore'

function getChipsSate () {
	return {
		chips: ChipsStore.getChips()
	};
}

const Game = React.createClass({
	getInitialState() {
		return getChipsSate()
	},
	componentWillMount() {
		ChipsStore.subscribePositionChange(this.updateChips)
	},
	componentWillUnmount() {
		ChipsStore.unsubscribePositionChange(this.updateChips)
	},
	updateChips (chips) {
		this.setState({chips})
	},
	render() {
		const chips = this.state.chips.map((chip, i)=>{
			return <Chip key={i} chip={chip}/>
		})
		return (
			<div className='game'>{chips}</div>
		)
	}
})

export default Game
