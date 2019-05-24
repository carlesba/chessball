import selectPiece from './selectPiece'
import { player, keeper } from '../Entities/Movements'

test('cannot select a piece that does not belong to the team that moves', () => {
  const state = {
    positions: {
      R1: [1, 1],
      B1: [9, 9],
      ball: [5, 5]
    },
    ballOwner: null,
    movements: [],
    moves: 'red',
    score: [0, 0],
    selectedPiece: null,
    passes: 0
  }
  expect(selectPiece(state, 'B1')).toBe(state)
})

test('cannot select the ball', () => {
  const state = {
    positions: {
      R1: [1, 1],
      B1: [9, 9],
      ball: [5, 5]
    },
    ballOwner: null,
    movements: [],
    moves: 'red',
    score: [0, 0],
    selectedPiece: null,
    passes: 0
  }
  expect(selectPiece(state, 'ball')).toBe(state)
})
test('cannot select any piece when the ball is owned', () => {
  const state = {
    positions: {
      R1: [1, 1],
      B1: [9, 9],
      ball: [2, 1]
    },
    ballOwner: 'red',
    movements: [],
    moves: 'red',
    score: [0, 0],
    selectedPiece: 'ball',
    passes: 0
  }
  expect(selectPiece(state, 'R1')).toBe(state)
})
test('selects a piece of the team that moves and show its movements', () => {
  const state = {
    positions: {
      R1: [3, 3],
      R2: [4, 8],
      B1: [9, 9],
      ball: [7, 7]
    },
    ballOwner: null,
    movements: [],
    moves: 'red',
    score: [0, 0],
    selectedPiece: null,
    passes: 0
  }
  expect(selectPiece(state, 'R2')).toEqual({
    ...state,
    movements: player(state.positions.R2),
    selectedPiece: 'R2'
  })
})

test('change selection and update movements', () => {
  const state = {
    positions: {
      R1: [2, 2],
      R2: [5, 3],
      B1: [9, 9],
      ball: [7, 7]
    },
    ballOwner: null,
    movements: player([1, 1]),
    moves: 'red',
    score: [0, 0],
    selectedPiece: null,
    passes: 0
  }
  expect(selectPiece(state, 'R2')).toEqual({
    ...state,
    movements: player(state.positions.R2),
    selectedPiece: 'R2'
  })
})

test('avoid movements with obstacles when a player is selected', () => {
  const state = {
    positions: {
      R1: [4, 4],
      R2: [4, 5],
      B1: [9, 9],
      ball: [5, 5]
    },
    ballOwner: null,
    movements: [],
    moves: 'red',
    score: [0, 0],
    selectedPiece: null,
    passes: 0
  }
  expect(selectPiece(state, 'R1')).toEqual({
    ...state,
    movements: keeper(state.positions.R1, Object.values(state.positions)),
    selectedPiece: 'R1'
  })
})
