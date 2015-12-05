import React from 'react';
import Box from './Box';

const Row = React.createClass({
	render() {
		return (
			<div className='row clearfix'>
				{this.props.data.map((box, i)=> <Box key={i} data={box}/>)}
			</div>
		);
	}
});

export default Row;