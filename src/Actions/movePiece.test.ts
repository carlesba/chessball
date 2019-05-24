import movePiece from './movePiece'
import { player, ball, keeper } from '../Entities/Movements'
import {
  initialPositions,
  getBallObstacles,
  getPlayerObstacles,
  calculatePositionOwnership
} from '../Entities/GameState'

test('moving piece to a non valid position', () => {
  const state = {
    positions: {
      R1: [1, 1],
      B1: [9, 9],
      ball: [5, 5]
    },
    ballOwner: null,
    movements: player([1, 1]),
    moves: 'red',
    score: [0, 0],
    selectedPiece: 'R1',
    passes: 0
  }
  expect(() => movePiece(state, [10, 10])).toThrowError('Invalid Movement')
})
test('moving player piece with no ball interaction', () => {
  const state = {
    positions: {
      R1: [1, 1],
      B1: [9, 9],
      ball: [5, 5]
    },
    ballOwner: null,
    movements: player([1, 1]),
    moves: 'red',
    score: [0, 0],
    selectedPiece: 'R1',
    passes: 0
  }
  expect(movePiece(state, [2, 2])).toEqual({
    ...state,
    movements: [],
    selectedPiece: null,
    moves: 'blue',
    positions: {
      ...state.positions,
      R1: [2, 2]
    }
  })
})
test('moving player and owning ball', () => {
  const state = {
    positions: {
      R1: [3, 3],
      B1: [9, 9],
      ball: [5, 5]
    },
    ballOwner: null,
    movements: player([3, 3]),
    moves: 'red',
    score: [0, 0],
    selectedPiece: 'R1',
    passes: 0
  }

  const nextState = movePiece(state, [4, 4])
  expect(nextState).toEqual({
    movements: expect.any(Array),
    selectedPiece: 'ball',
    moves: 'red',
    ballOwner: 'red',
    passes: 0,
    score: [0, 0],
    positions: {
      ...state.positions,
      R1: [4, 4]
    }
  })
  const expectedMovements = ball(
    nextState.positions.ball,
    getBallObstacles(nextState),
    getPlayerObstacles(nextState)
  )
  expect(nextState.movements).toEqual(expectedMovements)
})
test('moving ball losing ball ownership to neutral', () => {
  const state = {
    positions: {
      R1: [3, 3],
      R2: [4, 5],
      B1: [9, 9],
      ball: [5, 5]
    },
    ballOwner: 'red',
    movements: ball([5, 5]),
    moves: 'red',
    score: [0, 0],
    selectedPiece: 'ball',
    passes: 0
  }
  expect(movePiece(state, [6, 6])).toEqual({
    movements: [],
    selectedPiece: null,
    moves: 'blue',
    ballOwner: null,
    passes: 0,
    score: [0, 0],
    positions: {
      ...state.positions,
      ball: [6, 6]
    }
  })
})
test('moving ball changing ball ownership', () => {
  const state = {
    positions: {
      R1: [4, 4],
      B1: [9, 9],
      ball: [5, 5]
    },
    ballOwner: null,
    movements: ball([5, 5]),
    moves: 'red',
    score: [0, 0],
    selectedPiece: 'ball',
    passes: 0
  }

  const nextState = movePiece(state, [8, 8])
  expect(nextState).toEqual({
    movements: expect.any(Array),
    selectedPiece: 'ball',
    moves: 'blue',
    ballOwner: 'blue',
    passes: 0,
    score: [0, 0],
    positions: {
      ...state.positions,
      ball: [8, 8]
    }
  })
  const expectedMovements = ball(
    nextState.positions.ball,
    getBallObstacles(nextState),
    getPlayerObstacles(nextState)
  )
  expect(nextState.movements).toEqual(expectedMovements)
})
test('moving ball keeping ownership', () => {
  const state = {
    positions: {
      R1: [3, 3],
      R2: [4, 5],
      B1: [9, 9],
      ball: [5, 5]
    },
    ballOwner: 'red',
    movements: ball([5, 5]),
    moves: 'red',
    score: [0, 0],
    selectedPiece: 'ball',
    passes: 0
  }
  const nextState = movePiece(state, [4, 4])
  expect(nextState).toEqual({
    movements: expect.any(Array),
    selectedPiece: 'ball',
    moves: 'red',
    ballOwner: 'red',
    passes: 1,
    score: [0, 0],
    positions: {
      ...state.positions,
      ball: [4, 4]
    }
  })
  const expectedMovements = ball(
    nextState.positions.ball,
    getBallObstacles(nextState),
    getPlayerObstacles(nextState)
  )
  expect(nextState.movements).toEqual(expectedMovements)
})
test('passes count reset when ball changes ownership', () => {
  const state = {
    positions: {
      R1: [3, 3],
      R2: [1, 1],
      B1: [6, 3],
      ball: [3, 4]
    },
    ballOwner: 'red',
    movements: ball([3, 4]),
    moves: 'red',
    score: [0, 0],
    selectedPiece: 'ball',
    passes: 1
  }
  const nextState = movePiece(state, [6, 4])

  expect(nextState).toEqual({
    movements: expect.any(Array),
    selectedPiece: 'ball',
    moves: 'blue',
    ballOwner: 'blue',
    passes: 0,
    score: [0, 0],
    positions: {
      ...state.positions,
      ball: [6, 4]
    }
  })
})
test('moving ball after 2 passes and keeping ball ownership', () => {
  const state = {
    positions: {
      R1: [3, 3],
      R2: [4, 5],
      B1: [9, 9],
      ball: [5, 5]
    },
    ballOwner: 'red',
    movements: ball([5, 5]),
    moves: 'red',
    score: [0, 0],
    selectedPiece: 'ball',
    passes: 2
  }
  const nextState = movePiece(state, [4, 4])
  expect(nextState).toEqual({
    movements: expect.any(Array),
    selectedPiece: 'ball',
    moves: 'red',
    ballOwner: 'red',
    passes: 3,
    score: [0, 0],
    positions: {
      ...state.positions,
      ball: [4, 4]
    }
  })
  const expectedMovements = ball(
    nextState.positions.ball,
    getBallObstacles(nextState),
    getPlayerObstacles(nextState)
  ).filter(m => calculatePositionOwnership(nextState, m) === null)
  expect(nextState.movements).toEqual(expectedMovements)
})
test('moving ball to bonus position will not finish turn', () => {
  const state = {
    positions: {
      R1: [3, 0],
      B1: [9, 9],
      ball: [2, 0]
    },
    ballOwner: 'red',
    movements: ball([2, 0]),
    moves: 'red',
    score: [0, 0],
    selectedPiece: 'ball',
    passes: 0
  }
  expect(movePiece(state, [1, 0])).toEqual({
    ...state,
    movements: [],
    selectedPiece: null,
    moves: 'red',
    ballOwner: null,
    positions: {
      ...state.positions,
      ball: [1, 0]
    }
  })
})
test('moving player when ball is in bonus position will finish turn', () => {
  const state = {
    positions: {
      R1: [3, 0],
      B1: [9, 9],
      ball: [1, 0]
    },
    ballOwner: null,
    movements: player([3, 0]),
    moves: 'red',
    score: [0, 0],
    selectedPiece: 'R1',
    passes: 0
  }
  expect(movePiece(state, [4, 0])).toEqual({
    ...state,
    movements: [],
    selectedPiece: null,
    moves: 'blue',
    ballOwner: null,
    positions: {
      ...state.positions,
      R1: [4, 0]
    }
  })
})
test('moving keeper to bonus position will finish turn', () => {
  const state = {
    positions: {
      R1: [2, 0],
      B1: [9, 9],
      ball: [5, 0]
    },
    ballOwner: null,
    movements: keeper([2, 0]),
    moves: 'red',
    score: [0, 0],
    selectedPiece: 'R1',
    passes: 0
  }
  expect(movePiece(state, [1, 0])).toEqual({
    ...state,
    movements: [],
    selectedPiece: null,
    moves: 'blue',
    ballOwner: null,
    positions: {
      ...state.positions,
      R1: [1, 0]
    }
  })
})
test('gettting the ball when keeper is near the ball inside the area', () => {
  const state = {
    positions: {
      R1: [2, 4],
      B1: [4, 4],
      B2: [5, 5],
      ball: [3, 4]
    },
    ballOwner: null,
    movements: player([5, 5]),
    moves: 'blue',
    score: [0, 0],
    selectedPiece: 'B2',
    passes: 0
  }

  const ballObstacles = [[2, 4], [2, 3], [2, 5]]
  const takenPositions = [[4, 4], [4, 5]]
  expect(movePiece(state, [4, 5])).toEqual({
    ...state,
    movements: ball([3, 4], ballObstacles, takenPositions),
    selectedPiece: 'ball',
    moves: 'blue',
    ballOwner: 'blue',
    positions: {
      ...state.positions,
      B2: [4, 5]
    }
  })
})
test('gettting the ball when keeper is near the ball outside the area', () => {
  const state = {
    positions: {
      R1: [5, 4],
      B1: [7, 4],
      B2: [8, 5],
      ball: [6, 4]
    },
    ballOwner: null,
    movements: player([8, 5]),
    moves: 'blue',
    score: [0, 0],
    selectedPiece: 'B2',
    passes: 0
  }

  const ballObstacles = []
  const takenPositions = [[5, 4], [7, 4], [7, 5], [6, 4]]
  const expectedMovements = ball([6, 4], ballObstacles, takenPositions)
  const expectedState = movePiece(state, [7, 5])
  expect(expectedState).toEqual({
    ...state,
    movements: expectedMovements,
    selectedPiece: 'ball',
    moves: 'blue',
    ballOwner: 'blue',
    positions: {
      ...state.positions,
      B2: [7, 5]
    }
  })
})
test('moving ball to goal position', () => {
  const state = {
    positions: {
      R1: [1, 1],
      B1: [4, 4],
      ball: [3, 4]
    },
    ballOwner: 'blue',
    movements: ball([3, 4]),
    moves: 'blue',
    score: [0, 0],
    selectedPiece: 'ball',
    passes: 0
  }
  expect(movePiece(state, [0, 4])).toEqual({
    ...state,
    movements: [],
    selectedPiece: null,
    moves: 'red',
    score: [0, 1],
    ballOwner: null
  })
})
