import { calculatePositionDistance } from '../utils/position'
import gameReducer from './gameReducer'

export const isPositionInList = ({row, col}, list) => {
  return list.findIndex((p) => {
    return p.row === row && p.col === col
  }) >= 0
}
export const calculateTeamOwner = ([teamA, teamB]) => {
  if (teamA < teamB) return 1
  else if (teamA > teamB) return 0
  else return null
}
export const calculateBallOwners = (chips, ball) => {
  return chips.filter(chip => {
    return calculatePositionDistance(chip, ball) === 1 && chip !== ball
  }).reduce((teams, chip) => {
    teams[chip.team] += 1
    return teams
  }, [0, 0])
}
export const updateBallOwner = (chips) => {
  const ball = chips.find(chip => chip.kind === 'ball')
  const ballOwners = calculateBallOwners(chips, ball)
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

export const moveChips = (chips, action, highlights = []) => {
  const {nextPosition, chipId} = action
  if (isPositionInList(nextPosition, highlights)) {
    return updateBallOwner(updateChipsPositions(chips, chipId, nextPosition))
  } else {
    return chips
  }
}

const moveChipReducer = (state, action) => {
  const {chips, highlights, game} = state
  const updatedChips = moveChips(chips, action, highlights)
  if (updatedChips !== chips) {
    return Object.assign({}, state, {
      game: gameReducer(game, updatedChips),
      highlights: [],
      chips: updatedChips
    })
  } else {
    return Object.assign({}, state, {highlights: []})
  }
  // const updatedChips = moveChips(chips, action, highlights)
  // return Object.assign({})
}

export default moveChipReducer
