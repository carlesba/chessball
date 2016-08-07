import {createMovement} from 'src/models/movement'

export default function calculateMovements (state, actions) {
  const selectedChip = state.chips.getSelectedChip()
  if (!selectedChip) return []
  if (selectedChip.isBall()) {
    return calculateBallMovements(state, actions)
  } else {
    return calculatePlayerMovements(state, actions)
  }
}

const BALL_DISTANCE = 4
const PLAYER_DISTANCE = 2

function calculateBallMovements (state, actions) {
  const {chips} = state
  const ballPosition = chips.getBall().position
  const usedPositions = chips.getPositions()
  return positionsFromTo(ballPosition, BALL_DISTANCE)
    .filter((p) => p.isValidBallPosition(usedPositions))
    .map(createMovementWithActions(actions, state))
}

function calculatePlayerMovements (state, actions) {
  const {chips} = state
  const selectedChip = chips.getSelectedChip()
  const origin = selectedChip.position
  const usedPositions = chips.getPositions()
  return positionsFromTo(origin, PLAYER_DISTANCE)
    .filter((p) => p.isValidPlayerPosition(usedPositions))
    .map(createMovementWithActions(actions, state))
}

const createMovementWithActions = (actions, state) => (pos) =>
  createMovement(pos, actions, state)

const DIRECTIONS = [
  [0, 1], [1, 0], [1, 1],
  [0, -1], [-1, 0], [-1, -1],
  [-1, 1], [1, -1]
]

function positionsFromTo (source, maxDistance) {
  return DIRECTIONS.reduce((positions, increment) => {
    return positions.concat(getPositions(source, increment, maxDistance))
  }, [])
}

function getPositions (source, increment, distance) {
  let step = distance
  let previous = source
  let output = []
  while (step > 0) {
    previous = previous.increase(increment)
    output.push(previous)
    step -= 1
  }
  return output
}
