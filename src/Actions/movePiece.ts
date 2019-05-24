import {
  State,
  finishTurn,
  applyMovement,
  unselectPiece,
  clearMovements,
  calculateBallOwner,
  showMovements,
  ownBall,
  selectPiece,
  getBallObstacles,
  getPlayerObstacles,
  freeBall,
  increasePasses,
  calculatePositionOwnership,
  resetPasses,
  score
} from '../Entities/GameState'
import { Position, equals } from '../Entities/Position'
import { ball } from '../Entities/Movements'
import { goal as boardGoal, isBonus } from '../Entities/Board'

const MAX_PASSES_ALLOWED = 3

export default function movePiece(state: State, position: Position): State {
  const isValidPosition = !!state.movements.find(m => equals(m, position))
  if (!isValidPosition) {
    throw new Error('Invalid Movement')
  }
  const teamDidGoal = boardGoal(position)
  if (teamDidGoal) {
    return [state]
      .map(s => score(s, teamDidGoal))
      .map(clearMovements)
      .map(unselectPiece)
      .map(freeBall)
      .map(resetPasses)
      .map(s => ({ ...s, moves: teamDidGoal === 'blue' ? 'red' : 'blue' }))
      .pop()
  }

  const stateWithMove = applyMovement(state, position)
  const ballOwner = calculateBallOwner(stateWithMove)
  const extraTurn =
    state.selectedPiece === 'ball' &&
    isBonus(position) &&
    !isBonus(state.positions.ball)

  if (ballOwner === null) {
    return [stateWithMove]
      .map(clearMovements)
      .map(unselectPiece)
      .map(s => (extraTurn ? s : finishTurn(s)))
      .map(resetPasses)
      .map(freeBall)
      .pop()
  }
  let movements = ball(
    stateWithMove.positions.ball,
    getBallObstacles(stateWithMove),
    getPlayerObstacles(stateWithMove)
  )

  if (
    stateWithMove.passes === MAX_PASSES_ALLOWED - 1 &&
    stateWithMove.ballOwner === ballOwner
  ) {
    movements = movements.filter(
      m => calculatePositionOwnership(stateWithMove, m) === null
    )
  }

  if (ballOwner === state.moves) {
    return [stateWithMove]
      .map(unselectPiece)
      .map(s => (s.ballOwner === ballOwner ? increasePasses(s) : s))
      .map(s => showMovements(s, movements))
      .map(ownBall)
      .map(s => selectPiece(s, 'ball'))
      .pop()
  } else {
    return [stateWithMove]
      .map(s => (extraTurn ? s : finishTurn(s)))
      .map(ownBall)
      .map(s => showMovements(s, movements))
      .map(s => selectPiece(s, 'ball'))
      .map(resetPasses)
      .pop()
  }
}
