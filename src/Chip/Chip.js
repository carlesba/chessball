import React from 'react';
import Rx from '@reactivex/rxjs';
import ReactDOM from 'react-dom';
import {moveChip} from '../actions/ChipsActions';

const Chip = React.createClass({
	render() {
		const {top, left} = this.props.chip;
		const styles = {top, left};
		return (
			<div
				ref={(el)=>this.el = ReactDOM.findDOMNode(el)}
				className='chip'
				style={styles}
				onMouseDown={this.translate}
			/>
		)
	},
	translate () {
		const mousemove = Rx.Observable.fromEvent(document, 'mousemove')
			.map((evt)=>{return {x: evt.movementX, y: evt.movementY } })
			.subscribe(this.updatePosition)
		Rx.Observable.fromEvent(document, 'mouseup')
			.first()
			.subscribe(()=> mousemove.unsubscribe() )
	},
	updatePosition ({x, y}) {
		const {top, left, chipId} = this.props.chip
		const newLeft = left + x
		const newTop = top + y
		moveChip(chipId, newTop, newLeft)
	}
});

export default Chip;
