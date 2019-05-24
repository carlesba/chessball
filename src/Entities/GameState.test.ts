import {
  calculateBallOwner,
  getBallObstacles,
  getPlayerObstacles
} from './GameState'

test('calculateBallOwner when no piece is around', () => {
  const state = {
    positions: {
      R1: [2, 5],
      R2: [4, 3],
      R3: [4, 7],
      R4: [6, 2],
      R5: [6, 8],
      B1: [12, 5],
      B2: [10, 3],
      B3: [10, 7],
      B4: [8, 2],
      B5: [8, 8],
      ball: [7, 5]
    },
    ballOwner: null,
    movements: [],
    moves: 'red',
    score: [0, 0],
    selectedPiece: null,
    passes: 0
  }
  expect(calculateBallOwner(state)).toBe(null)
})

test('calculateBallOwner when reds are around', () => {
  const state = {
    positions: {
      R1: [2, 5],
      R2: [4, 3],
      R3: [4, 7],
      R4: [6, 2],
      R5: [6, 6],
      B1: [12, 5],
      B2: [10, 3],
      B3: [10, 7],
      B4: [8, 2],
      B5: [8, 8],
      ball: [7, 5]
    },
    ballOwner: null,
    movements: [],
    moves: 'red',
    score: [0, 0],
    selectedPiece: null,
    passes: 0
  }
  expect(calculateBallOwner(state)).toBe('red')
})

test('calculateBallOwner when blues are around', () => {
  const state = {
    positions: {
      R1: [2, 5],
      R2: [4, 3],
      R3: [4, 7],
      R4: [6, 2],
      R5: [8, 8],
      B1: [12, 5],
      B2: [10, 3],
      B3: [10, 7],
      B4: [8, 2],
      B5: [7, 6],
      ball: [7, 5]
    },
    ballOwner: null,
    movements: [],
    moves: 'red',
    score: [0, 0],
    selectedPiece: null,
    passes: 0
  }
  expect(calculateBallOwner(state)).toBe('blue')
})

test('calculateBallOwner when team pieces are even', () => {
  const state = {
    positions: {
      R1: [2, 5],
      R2: [4, 3],
      R3: [4, 7],
      R4: [6, 2],
      R5: [6, 6],
      B1: [12, 5],
      B2: [10, 3],
      B3: [10, 7],
      B4: [8, 2],
      B5: [7, 6],
      ball: [7, 5]
    },
    ballOwner: null,
    movements: [],
    moves: 'red',
    score: [0, 0],
    selectedPiece: null,
    passes: 0
  }
  expect(calculateBallOwner(state)).toBe(null)
})

test('getBallObstacles returns keepers squares when inside area', () => {
  const state = {
    positions: {
      R1: [4, 1], // edge of big area: 2 positions
      R2: [4, 3],
      R3: [4, 7],
      R4: [6, 2],
      R5: [6, 6],
      B1: [9, 5], // outside area: no obstacle
      B2: [10, 3],
      B3: [10, 7],
      B4: [8, 2],
      B5: [7, 6],
      ball: [7, 5]
    },
    ballOwner: null,
    movements: [],
    moves: 'red',
    score: [0, 0],
    selectedPiece: null,
    passes: 0
  }
  expect(getBallObstacles(state).length).toBe(0)
  expect(getBallObstacles({ ...state, moves: 'blue' }).length).toBe(2)
})
test('getPlayerObstacles return player positions', () => {
  const state = {
    positions: {
      R1: [4, 5],
      R2: [4, 3],
      R3: [4, 7],
      R4: [6, 2],
      R5: [6, 6],
      B1: [9, 5],
      B2: [10, 3],
      B3: [10, 7],
      B4: [8, 2],
      B5: [7, 6],
      ball: [7, 5]
    },
    ballOwner: null,
    movements: [],
    moves: 'red',
    score: [0, 0],
    selectedPiece: null,
    passes: 0
  }
  expect(getPlayerObstacles(state).length).toBe(11)
})
