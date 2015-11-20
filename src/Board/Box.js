import React from 'react';
import classname from 'classname';
import {calcBackground} from '../builders/boxColors';
const SHOW_CONTENT = false;

const Box = React.createClass({
	render() {
		const {row, col, kind} = this.props.data
		const style = {
			background: this.calculateBackground()
		};
		const classes = classname('square', {
			'square--special': kind === 'special'
		});
		const content = SHOW_CONTENT?`${row},${col}`:'';
		return (
			<div className={classes}
				style={style}
				onMouseEnter={this.showEdges}>{content}</div>
		);
	},
	calculateBackground() {
		return calcBackground(this.props.data);
	}
});

export default Box;
