// export default [
//   { chipId: 0, kind: 'ball', team: null, row: 7, col: 5, highlighted: false },
//   { chipId: 1, kind: 'player', team: 0, row: 2, col: 5, highlighted: true },
//   { chipId: 2, kind: 'player', team: 0, row: 4, col: 3, highlighted: true },
//   { chipId: 3, kind: 'player', team: 0, row: 4, col: 7, highlighted: true },
//   { chipId: 4, kind: 'player', team: 0, row: 6, col: 1, highlighted: true },
//   { chipId: 5, kind: 'player', team: 0, row: 6, col: 9, highlighted: true },
//   { chipId: 6, kind: 'player', team: 1, row: 10, col: 3, highlighted: false },
//   { chipId: 7, kind: 'player', team: 1, row: 10, col: 7, highlighted: false },
//   { chipId: 8, kind: 'player', team: 1, row: 12, col: 5, highlighted: false },
//   { chipId: 9, kind: 'player', team: 1, row: 8, col: 1, highlighted: false },
//   { chipId: 10, kind: 'player', team: 1, row: 8, col: 9, highlighted: false }
// ]
const CHIPS_PER_TEAM = 5
const positions = [
  {row: 7, col: 5}, // 0
  {row: 2, col: 5}, // team 0
  {row: 4, col: 3},
  {row: 4, col: 7},
  {row: 6, col: 1},
  {row: 6, col: 9},
  {row: 12, col: 5}, // team 1
  {row: 10, col: 3},
  {row: 10, col: 7},
  {row: 8, col: 1},
  {row: 8, col: 9}
]
let chipId = -1
const chipFactory = (kind, team = null, highlighted = false, isGoalKeeper = false) => {
  chipId++
  const {row, col} = positions[chipId]
  return { chipId, team, highlighted, row, col, kind, isGoalKeeper }
}

const ballFactory = () => {
  return chipFactory('ball')
}

const playerFactory = (team, isGoalKeeper) => {
  return chipFactory('player', team, team === 0, isGoalKeeper)
}

const teamFactory = (team) => {
  let chips = []
  for (let i = 0; i < CHIPS_PER_TEAM; i++) {
    chips.push(playerFactory(team, i === 0))
  }
  return chips
}

const defaultChips = () => {
  return [].concat(
    ballFactory(),
    teamFactory(0),
    teamFactory(1)
  )
}
export default defaultChips()
