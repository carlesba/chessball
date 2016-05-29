import React from 'react'
import objectComposer from 'src/lib/objectComposer'
import {TILE_SIZE} from 'src/constants'

const Tile = ({tile}) => {
  const componentStyles = objectComposer(
    styles.basic,
    [[styles.firstColumn], tile.col === 0],
    [styles.area, tile.isArea],
    [styles.goal, tile.isGoal],
    [styles.blank, tile.isBlank],
    [styles.bonus, tile.isBonus]
  )
  return <div style={componentStyles} />
}

const styles = {
  basic: {
    background: 'green',
    float: 'left',
    width: `${TILE_SIZE}px`,
    height: `${TILE_SIZE}px`,
    outline: '1px solid grey'
  },
  firstColumn: {clear: 'left'},
  area: {background: 'blue'},
  goal: {background: 'black'},
  blank: {background: 'transparent', outline: 'none'},
  bonus: {background: 'grey'}
}

export default Tile
