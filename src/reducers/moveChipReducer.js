import { calculatePositionOwner } from '../utils/position'
import { update } from '../utils/immutable'
import { findBall, highlight, unhighlight } from '../utils/chips'
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
const shouldFinishTurn = (ballOwner, formerBallOwner) => {
  return (
    (ballOwner !== formerBallOwner && formerBallOwner !== null) ||
    (ballOwner === null)
  )
}
const manageTurn = (game, ballOwner) => {
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
    ballPasses: ballPasses,
    isKickOff: false
  })
}
const scoreGoal = (ballTile, state) => {
  const {scoreTeamA, scoreTeamB, turnOwner} = state.game
  return update(state, update(state.game, {
    isGoal: true,
    turnOwner: (turnOwner + 1) % 2,
    scoreTeamA: ballTile.field === 1 ? scoreTeamA + 1 : scoreTeamA,
    scoreTeamB: ballTile.field === 0 ? scoreTeamB + 1 : scoreTeamB
  }))
}
const goalMovement = (ballTile, state, chips) => {
  console.log('it\'s a GOAL!')
  return update(state, {
    movements: [],
    chips,
    game: scoreGoal(ballTile, state)
  })
}
const regularMovement = (ball, chips, state) => {
  const ballOwner = calculatePositionOwner(ball, chips)
  const nextGame = manageTurn(state.game, ballOwner)
  const highlightedChips = ballOwner === null
    ? highlightChips(chips, nextGame.turnOwner)
    : highlightBall(chips)
  return update(state, {
    chips: highlightedChips,
    game: nextGame,
    movements: []
  })
}
const moveChipReducer = (state, action) => {
  const {chips, movements, board} = state
  const {nextPosition, chipId} = action
  if (!isPositionInList(nextPosition, movements)) {
    return update(state, { movements: [] })
  }
  const movedChips = moveChip(chipId, nextPosition, chips)
  const ball = findBall(movedChips)
  const ballTile = board[ball.row][ball.col]
  return ballTile.kind === 'goal'
    ? goalMovement(ballTile, state, movedChips)
    : regularMovement(ball, movedChips, state)
}

export default moveChipReducer
