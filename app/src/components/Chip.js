import React from 'react'
import {TEAM_A, TEAM_B, PLAYER, BALL} from 'src/constants'
import objectComposer from 'src/lib/objectComposer'

const Chip = ({position, isKeeper, type, team, selectable, onClick}) => {
  const [top, left] = position.toPixels()
  const styles = objectComposer(chipStyles.default, {
    top,
    left
  },
    [chipStyles.teamA, type === PLAYER && team === TEAM_A],
    [chipStyles.teamB, type === PLAYER && team === TEAM_B],
    [chipStyles.ball, type === BALL],
    [chipStyles.selectable, selectable]
  )
  const keeper = isKeeper ? '<:::::>' : ''
  return (<div style={styles} onClick={onClick}>{keeper}</div>)
}

const chipStyles = {
  default: {
    position: 'absolute',
    width: '40px',
    height: '40px',
    margin: '5px 5px',
    borderRadius: '50%',
    boxShadow: '0 0 2px #676767',
    transition: '.3s top ease-out, .3s left ease-out'
  },
  teamA: {
    background: '#1568ca'
  },
  teamB: {
    background: '#a73737'
  },
  ball: {
    background: '#dea440'
  },
  selectable: {
    boxShadow: '0 0 8px 4px #dadada',
    cursor: 'pointer'
  }
}

export default Chip
