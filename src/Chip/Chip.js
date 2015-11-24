import React from 'react';
import Rx from 'rx';
import ReactDOM from 'react-dom';
import {moveChip, leaveChip} from '../actions/ChipsActions';

const Chip = React.createClass({
	getInitialState() {
		return {
			translateX: 0,
			translateY: 0
		};
	},
	componentWillReceiveProps(nextProps) {
		this.updateDefaultPosition()
	},
	render() {
		const {top, left} = this.props.chip;
		const {translateX, translateY} = this.state;
		const styles = {top, left,
			transform: `translate(${translateX}px,${translateY}px)`
		};
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
			.subscribe((e)=>{
				console.log(('mouseup', e));
				mousemove.dispose()
				const {translateX, translateY} = this.state;
				const {chipId, top, left} = this.props.chip;
				const nextX = translateX + left;
				const nextY = translateY + top;
				moveChip(chipId, nextY, nextX)
			})
	},
	updatePosition ({x, y}) {
		// const {chipId} = this.props.chip
		const {translateX, translateY} = this.state
		this.setState({
			translateX: x + translateX,
			translateY: y + translateY
		})
		// moveChip(chipId, newTop, newLeft)
	},
	updateDefaultPosition () {
		this.setState(this.getInitialState())
	}
	// leaveChip () {
		// const {chipId} = this.props.chip
		// leaveChip(chipId)
	// }
});

export default Chip;
