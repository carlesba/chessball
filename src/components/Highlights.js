import React from 'react'
import {TILE_WIDTH} from '../utils/constants'
import {positionToPixels} from '../utils/position'
import {getHighlightedTune} from '../utils/design'

const getStylesForHighlight = (tile) => {
  return Object.assign({
    width: TILE_WIDTH,
    height: TILE_WIDTH,
    position: 'absolute',
    backgroundColor: getHighlightedTune(tile.row, tile.col)
  }, positionToPixels(tile))
}

const Highlights = ({highlights}) => {
  return (
    <div className='highlights'>
      {highlights.map((tile, index) => {
        const styles = getStylesForHighlight(tile)
        return <div
          key={index}
          className='highlight'
          style={styles}
        />
      })}
    </div>
  )
}

export default Highlights
