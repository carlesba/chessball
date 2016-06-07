import {
  insideBoard,
  containedIn,
  isGoal,
  distance as distancePosition,
  positionInBetween
} from 'src/models/Position'
export default function calculateMovements (chips) {
  const selectedChip = chips.find(({isSelected}) => isSelected)
  if (!selectedChip) return []
  if (selectedChip.type === 'ball') return calculateBallMovements(chips)
  else return calculatePlayerMovements(chips, selectedChip)
}

const DIRECTIONS = [
  [0, 1], [1, 0], [1, 1],
  [0, -1], [-1, 0], [-1, -1],
  [-1, 1], [1, -1]
]
const BALL_DISTANCE = 4
const PLAYER_DISTANCE = 2

const calculateBallMovements = ([ball, ...players]) => {
  const source = ball.position
  const forbiddenPositions = players.map(({position}) => position)
  return DIRECTIONS.reduce((positions, increment) => {
    return positions.concat(getPositions(source, increment, BALL_DISTANCE))
  }, [])
  .filter((pos) => insideBoard(pos[0], pos[1]) && !containedIn(pos, forbiddenPositions))
}

const calculatePlayerMovements = (chips, selectedChip) => {
  const source = selectedChip.position
  const usedPositions = chips.map(({position}) => position)
  const playerPositions = chips.filter(({type}) => type === 'player').map(({position}) => position)
  return DIRECTIONS.reduce((positions, increment) => {
    return positions.concat(getPositions(source, increment, PLAYER_DISTANCE))
  }, [])
  .filter((pos) => insideBoard(pos[0], pos[1]) && !isGoal(pos[0], pos[1]) && !containedIn(pos, usedPositions))
  .filter((pos) => {
    const distance = distancePosition(source, pos)
    return (
      distance === 1 ||
      (
        distance === 2 && !containedIn(
          positionInBetween(pos, source),
          playerPositions
        )
      )
    )
  })
}

const getPositions = (source, increment, distance) => {
  let step = distance
  let previous = source
  let output = []
  while (step > 0) {
    previous = applyIncrement(previous, increment)
    output.push(previous)
    step -= 1
  }
  return output
}

const applyIncrement = ([a, b], [incr0, incr1]) => ([a + incr0, b + incr1])
