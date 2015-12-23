import React from 'react'
import {TILE_WIDTH} from '../utils/constants'
import {positionToPixels} from '../utils/position'
import {getMovementTune} from '../utils/design'

const getStylesForHighlight = (tile) => {
  return Object.assign({
    width: TILE_WIDTH,
    height: TILE_WIDTH,
    position: 'absolute',
    opacity: 0.8,
    backgroundColor: getMovementTune(tile.row, tile.col)
  }, positionToPixels(tile))
}

const Movements = ({movements}) => {
  return (
    <div className='movements'>
      {movements.map((tile, index) => {
        const styles = getStylesForHighlight(tile)
        return <div
          key={index}
          className='movement'
          style={styles}
        />
      })}
    </div>
  )
}

export default Movements
