export default function calculateMovements (chips) {
  const selectedChip = chips.find(({isSelected}) => isSelected)
  if (!selectedChip) return []
  if (selectedChip.type === 'ball') return calculateBallMovements(chips)
  else calculatePlayerMovements(chips, selectedChip)
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
  return DIRECTIONS.reduce((positions, increment) => {
    return positions.concat(getPositions(source, increment, BALL_DISTANCE))
  }, [])
}

const calculatePlayerMovements = (chips, selectedChip) => {
  const source = selectedChip.position
  return DIRECTIONS.reduce((positions, increment) => {
    return positions.concat(getPositions(source, increment, PLAYER_DISTANCE))
  }, [])
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
