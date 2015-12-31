import { calculatePositionOwner } from '../utils/position'
import { update } from '../utils/immutable'
import { findBall, highlight, unhighlight } from '../utils/chips'
import {MAX_BALL_PASSES} from '../utils/constants'

const moveChipReducer = (state, action) => {
  const {chips, movements, board} = state
  const {nextPosition, chipId} = action
  if (!isPositionInList(nextPosition, movements)) {
    return update(state, { movements: [] })
  }
  const newChips = moveChip(chipId, nextPosition, chips)
  const ball = findBall(newChips)
  const ballTile = board[ball.row][ball.col]

  if (ballTile.kind === 'goal') {
    return goalMovement(ballTile, state, newChips)
  } else {
    const isBonus = ballTile.kind === 'special'
    return regularMovement(ball, newChips, state, isBonus)
  }
}

export default moveChipReducer

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
const goalMovement = (ballTile, state, chips) => {
  return update(state, {
    movements: [],
    chips,
    game: scoreGoal(ballTile, state)
  })
}
const regularMovement = (ball, chips, state, isBonus) => {
  const ballOwner = calculatePositionOwner(ball, chips)
  const nextGame = isBonus
    ? changeBonusTurn(state.game, ballOwner)
    : changeRegularTurn(state.game, ballOwner)
  const highlightedChips = ballOwner === null
    ? highlightChips(chips, nextGame.turnOwner)
    : highlightBall(chips)
  return update(state, {
    chips: highlightedChips,
    game: nextGame,
    movements: []
  })
}
export const highlightChips = (chips, turnOwner) => {
  return chips.map(chip => (chip.team === turnOwner)
    ? highlight(chip)
    : unhighlight(chip)
  )
}
const highlightBall = (chips) => {
  return chips.map(chip => (chip.kind === 'ball')
    ? highlight(chip)
    : unhighlight(chip)
  )
}
const changeRegularTurn = (game, ballOwner) => {
  const turnOwner = shouldFinishTurn(ballOwner, game.ballOwner)
    ? changeTurnOwner(game.turnOwner)
    : game.turnOwner
  const ballPasses = game.ballOwner === ballOwner
    ? game.ballPasses - 1
    : MAX_BALL_PASSES
  return update(game, {
    ballOwner: ballOwner,
    turnOwner: turnOwner,
    ballPasses: ballPasses,
    isKickOff: false
  })
}
const changeBonusTurn = (game, ballOwner) => {
  return update(game, {
    ballOwner: ballOwner,
    ballPasses: MAX_BALL_PASSES,
    isKickOff: false
  })
}
const shouldFinishTurn = (ballOwner, formerBallOwner) => {
  return (
    (ballOwner !== formerBallOwner && formerBallOwner !== null) ||
    (ballOwner === null)
  )
}
const changeTurnOwner = (turnOwner) => (turnOwner + 1) % 2

const scoreGoal = (ballTile, state) => {
  const {scoreTeamA, scoreTeamB} = state.game
  return update(state, update(state.game, {
    isGoal: true,
    turnOwner: ballTile.field,
    scoreTeamA: ballTile.field === 1 ? scoreTeamA + 1 : scoreTeamA,
    scoreTeamB: ballTile.field === 0 ? scoreTeamB + 1 : scoreTeamB
  }))
}
