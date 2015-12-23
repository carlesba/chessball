import { calculatePositionDistance } from '../utils/position'
import {update} from '../utils/immutable'

export const isPositionInList = ({row, col}, list) => {
  return list.findIndex((p) => {
    return p.row === row && p.col === col
  }) >= 0
}
const moveChip = (chipId, nextPosition, chips) => {
  return chips.map((chip) => {
    if (chip.chipId === chipId) {
      return update(chip, nextPosition)
    } else {
      return chip
    }
  })
}
const highlightChips = (chips, turnOwner) => {
  return chips.map(chip => {
    if (chip.team === turnOwner) return update(chip, {highlighted: true})
    else return update(chip, {highlighted: false})
  })
}
const highlightBall = (chips) => {
  return chips.map(chip => {
    if (chip.kind === 'ball') return update(chip, {highlighted: true})
    else return update(chip, {highlighted: false})
  })
}
export const calculateBallOwner = (chips) => {
  const ball = chips.find(chip => chip.kind === 'ball')
  const teamsChips = chips
    .filter(chip => {
      return calculatePositionDistance(chip, ball) === 1 && chip !== ball
    })
    .reduce((teams, chip) => {
      teams[chip.team] += 1
      return teams
    }, [0, 0])
  if (teamsChips[0] > teamsChips[1]) return 0
  else if (teamsChips[1] > teamsChips[0]) return 1
  else return null
}
const shouldFinishTurn = (ballOwner, formerBallOwner) => {
  return (
    (ballOwner !== formerBallOwner && formerBallOwner !== null) ||
    (ballOwner === null)
  )
}
const updateGameTurn = (game, ballOwner) => {
  const turnOwner = shouldFinishTurn(ballOwner, game.ballOwner)
    ? (game.turnOwner + 1) % 2
    : game.turnOwner
  return update(game, {
    ballOwner: ballOwner,
    turnOwner: turnOwner
  })
}
const moveChipReducer = (state, action) => {
  const {chips, movements, game} = state
  const {nextPosition, chipId} = action
  if (!isPositionInList(nextPosition, movements)) return state
  const updatedMovementChips = moveChip(chipId, nextPosition, chips)
  const ballOwner = calculateBallOwner(updatedMovementChips)
  const nextGame = updateGameTurn(game, ballOwner)
  const nextChips = ballOwner === null
    ? highlightChips(updatedMovementChips, nextGame.turnOwner)
    : highlightBall(updatedMovementChips)
  return update(state, {
    chips: nextChips,
    game: nextGame,
    movements: []
  })
}

export default moveChipReducer
