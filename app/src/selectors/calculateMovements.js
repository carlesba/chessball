import {createMovement} from 'src/models/movement'

export default function calculateMovements (chips, actions) {
  const selectedChip = chips.getSelectedChip()
  if (!selectedChip) return []
  if (selectedChip.isBall()) {
    return calculateBallMovements(chips, actions)
  } else {
    return calculatePlayerMovements(chips, actions)
  }
}

const BALL_DISTANCE = 4
const PLAYER_DISTANCE = 2

function calculateBallMovements (chips, actions) {
  const ballPosition = chips.getBall().position
  const usedPositions = chips.getPositions()
  return positionsFromTo(ballPosition, BALL_DISTANCE)
    .filter((pos) => pos.isValidBallPosition(usedPositions))
    .map((pos) => createMovement(pos, actions, chips))
    .filter((movement) => !!movement.onClick)
}

function calculatePlayerMovements (chips, actions) {
  const origin = chips.getSelectedChip().position
  const usedPositions = chips.getPositions()
  return positionsFromTo(origin, PLAYER_DISTANCE)
    .filter((pos) => pos.isValidPlayerPosition(usedPositions))
    .filter((pos) => pos.isObstacleFreeFrom(origin, usedPositions))
    .map((pos) => createMovement(pos, actions, chips))
    .filter((movement) => !!movement.onClick)
}

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
