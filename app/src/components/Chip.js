import React from 'react'
import {TEAM_A, TEAM_B} from 'src/constants'
import objectComposer from 'src/lib/objectComposer'

const Chip = ({position, type, team, selectable, onClick}) => {
  const styles = objectComposer(chipStyles.default, {
    top: `${position[0] * 50}px`,
    left: `${position[1] * 50}px`
  },
    [chipStyles.teamA, type === 'player' && team === TEAM_A],
    [chipStyles.teamB, type === 'player' && team === TEAM_B],
    [chipStyles.ball, type === 'ball'],
    [chipStyles.selectable, selectable]
  )
  return (
    <div
      style={styles}
      onClick={onClick}
    />
  )
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
    boxShadow: '0 0 8px 4px #dadada'
  }
}

export default Chip
