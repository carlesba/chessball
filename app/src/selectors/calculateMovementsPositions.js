export default function calculateMovementsPositions (chips) {
  const selectedChip = chips.getSelectedChip()
  if (!selectedChip) return []
  return selectedChip.isBall()
    ? ballPositions(chips)
    : playerPositions(chips, selectedChip)
}

const BALL_DISTANCE = 4
const PLAYER_DISTANCE = 2

function ballPositions ([ball, ...players]) {
  const source = ball.position
  const forbiddenPositions = players.map(({position}) => position)
  return calculatePositionsFromTo(source, BALL_DISTANCE)
  .filter((pos) => pos.isInsideBoard() && !pos.isIn(forbiddenPositions))
}

function playerPositions (chips, selectedChip) {
  const source = selectedChip.position
  const usedPositions = chips.map(({position}) => position)
  const playerPositions = chips
    .filter((chip) => chip.isPlayer)
    .map(({position}) => position)
  return calculatePositionsFromTo(source, PLAYER_DISTANCE)
  .filter((pos) => pos.isInsideBoard() && !pos.isGoal() && !pos.isIn(usedPositions))
  .filter((pos) => {
    const distance = pos.distanceTo(source)
    return (
      distance === 1 ||
      (
        distance === 2 && !pos.getInBetween(source).isIn(playerPositions)
      )
    )
  })
}

const DIRECTIONS = [
  [0, 1], [1, 0], [1, 1],
  [0, -1], [-1, 0], [-1, -1],
  [-1, 1], [1, -1]
]

const calculatePositionsFromTo = (source, maxDistance) => {
  return DIRECTIONS.reduce((positions, increment) => {
    return positions.concat(getPositions(source, increment, maxDistance))
  }, [])
}

const getPositions = (source, increment, distance) => {
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
