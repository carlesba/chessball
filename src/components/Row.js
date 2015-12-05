import React from 'react'
import Tile from './Tile'

const Row = ({data}) => {
  return (
		<div className='row clearfix'>
			{data.map((tile, i) => <Tile key={i} data={tile}/>)}
		</div>
	)
}

export default Row
