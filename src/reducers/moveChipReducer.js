import { calculatePositionOwner } from '../utils/position'
import {update} from '../utils/immutable'
import {MAX_BALL_PASSES} from '../utils/constants'

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
const shouldFinishTurn = (ballOwner, formerBallOwner) => {
  return (
    (ballOwner !== formerBallOwner && formerBallOwner !== null) ||
    (ballOwner === null)
  )
}
const updateGameState = (game, ballOwner) => {
  const turnOwner = shouldFinishTurn(ballOwner, game.ballOwner)
    ? (game.turnOwner + 1) % 2
    : game.turnOwner
  const ballPasses = game.ballOwner === ballOwner
    ? game.ballPasses - 1
    : MAX_BALL_PASSES
  console.log(':::ballPasses', ballPasses)
  return update(game, {
    ballOwner: ballOwner,
    turnOwner: turnOwner,
    ballPasses: ballPasses
  })
}
const moveChipReducer = (state, action) => {
  const {chips, movements, game} = state
  const {nextPosition, chipId} = action
  if (!isPositionInList(nextPosition, movements)) return state
  const updatedMovementChips = moveChip(chipId, nextPosition, chips)
  const ball = updatedMovementChips.find(chip => chip.kind === 'ball')
  const ballOwner = calculatePositionOwner(ball, updatedMovementChips)
  const nextGame = updateGameState(game, ballOwner)
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
