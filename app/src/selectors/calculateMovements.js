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
  // const keeperSaves = chips.getKeepersSaves()
  return positionsFromTo(ballPosition, BALL_DISTANCE)
    .filter((p) => p.isValidBallPosition(usedPositions))
    // .filter(keeperSavePosition(ballPosition, keeperSaves))
    .map(createMovementWithActions(actions, state))
    // .filter(movementsWithoutAction)
}

function calculatePlayerMovements (state, actions) {
  const {chips} = state
  const selectedChip = chips.getSelectedChip()
  const origin = selectedChip.position
  const usedPositions = chips.getPositions()
  // const keeperHands = chips.getKeepersHandsPositions()
  return positionsFromTo(origin, PLAYER_DISTANCE)
    .filter((p) => p.isValidPlayerPosition(usedPositions))
    // .filter((p) => p.isPathFreeUntil(origin, usedPositions))
    // .filter((p) => p.isPathFreeUntil(origin, keeperHands))
    // .filter(notKeeperHandsPosition(selectedChip, keeperHands))
    .map(createMovementWithActions(actions, state))
    // .filter(movementsWithoutAction)
}

// const isValidBallPosition = (usedPositions) => (pos) =>
//   pos.isValidBallPosition(usedPositions)
//
// const isValidPlayerPosition = (usedPositions) => (pos) =>
//   pos.isValidPlayerPosition(usedPositions)
//
// const keeperSavePosition = (origin, saves) => (pos) => pos

const createMovementWithActions = (actions, state) => (pos) =>
  createMovement(pos, actions, state)

// const notKeeperHandsPosition = (caller, keeperHands) => (pos) => {
//   if (caller.isKeeper) return pos
//   // TODO: filter positions when keeper would be next to other chip inside area
//   return !pos.isIn(keeperHands)
// }

const movementsWithoutAction = (movement) => !!movement.onClick

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
