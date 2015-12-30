import React from 'react'
import {positionToPixels} from '../utils/position'
import classname from 'classname'

const Movements = ({movements}) => {
  return (
    <div className='movements'>
      {movements.map((movement, index) => {
        const {row, col} = movement
        const classes = classname('movement', {
          'movement--odd': (row + col) % 2 === 0
        })
        return <div
          key={index}
          className={classes}
          style={positionToPixels(movement)}
        />
      })}
    </div>
  )
}

export default Movements
