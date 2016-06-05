import React from 'react'
import objectComposer from 'src/lib/objectComposer'
import {TILE_SIZE} from 'src/constants'
import BonusDot from 'src/components/BonusDot'

const Tile = ({tile}) => {
  const componentStyles = objectComposer(
    styles.basic,
    [[styles.firstColumn], tile.col === 0],
    [styles.area, tile.isArea],
    [styles.goal, tile.isGoal],
    [styles.blank, tile.isBlank],
    [styles.bonus, tile.isBonus]
  )
  const bonus = tile.isBonus
    ? <BonusDot />
    : null
  return <div style={componentStyles}>{bonus}</div>
}

const styles = {
  basic: {
    position: 'relative',
    background: '#5EB654',
    float: 'left',
    width: `${TILE_SIZE}px`,
    height: `${TILE_SIZE}px`,
    outline: '1px solid #2f8e13'
  },
  firstColumn: {clear: 'left'},
  area: {background: '#2CA11F'},
  goal: {
    background: '#1E3D15',
    outline: 'none'
  },
  blank: {background: 'transparent', outline: 'none'},
  bonus: {}
}

export default Tile
