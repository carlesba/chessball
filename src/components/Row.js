import React from 'react'
import Box from './Box'

const Row = ({data}) => {
  return (
		<div className='row clearfix'>
			{data.map((box, i) => <Box key={i} data={box}/>)}
		</div>
	)
}

export default Row
