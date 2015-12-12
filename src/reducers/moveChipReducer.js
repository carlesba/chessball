import {calculatePositionDistance} from '../utils/position'
const isAllowed = ({row, col}, list) => {
  return list.findIndex((p) => {
    return p.row === row && p.col === col
  }) >= 0
}

// const isBallAround = (position, chips) => {
//   const ball = chips.find(chip => chip.kind === 'ball')
//   return calculatePositionDistance(position, ball) === 1
// }
const calculateTeamOwner = ([teamA, teamB]) => {
  if (teamA < teamB) return 1
  else if (teamA > teamB) return 0
  else return null
}
const updateBall = (chips) => {
  const ball = chips.find(chip => chip.kind === 'ball')
  const ballOwners = chips.filter(chip => {
    return calculatePositionDistance(chip, ball) === 1 && chip !== ball
  }).reduce((teams, chip) => {
    teams[chip.team] += 1
    return teams
  }, [0, 0])
  let teamOwner = calculateTeamOwner(ballOwners)
  if (ball.team === teamOwner) {
    return chips
  } else {
    return chips.map(chip => {
      if (chip.kind === 'ball') return Object.assign({}, chip, {team: teamOwner})
      else return chip
    })
  }
}

const updateChipsPositions = (chips, chipId, nextPosition) => {
  return chips.map((chip) => {
    if (chip.chipId === chipId) {
      return Object.assign({}, chip, nextPosition)
    } else {
      return chip
    }
  })
}

const moveChipReducer = (chips, action, highlights = []) => {
  const {nextPosition, chipId} = action
  if (isAllowed(nextPosition, highlights)) {
    return updateBall(updateChipsPositions(chips, chipId, nextPosition))
  } else {
    return chips
  }
}
export default moveChipReducer
