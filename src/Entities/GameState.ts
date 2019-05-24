import { Team, pieces } from './Pieces'
import { Position, areNeighbors, sum } from './Position'
import { Movements } from './Movements'
import { isArea } from './Board'

type BallOwner = Team | null
export interface State {
  positions: { [key: string]: Position }
  ballOwner: BallOwner
  movements: Array<Position>
  moves: Team
  passes: number
  score: number[]
  selectedPiece: string | null
}
export const initialPositions = {
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
}

export const initialState: State = {
  positions: initialPositions,
  ballOwner: null,
  movements: [],
  moves: 'red',
  score: [0, 0],
  selectedPiece: null,
  passes: 0
}

export function selectPiece(state: State, id: string): State {
  return { ...state, selectedPiece: id }
}
export function applyMovement(state: State, movement: Position): State {
  const positions = {
    ...state.positions,
    [state.selectedPiece]: movement
  }
  return { ...state, positions }
}
export function unselectPiece(state: State): State {
  return { ...state, selectedPiece: null }
}
export function finishTurn(state: State): State {
  const moves = state.moves === 'red' ? 'blue' : 'red'
  return { ...state, moves }
}
export function increasePasses(state: State): State {
  const passes = state.passes + 1
  return { ...state, passes }
}
export function resetPasses(state: State): State {
  return { ...state, passes: 0 }
}
export function score(state: State, team: Team): State {
  const [redScore, blueScore] = state.score
  const score =
    team === 'red' ? [redScore + 1, blueScore] : [redScore, blueScore + 1]
  return { ...state, score }
}
export function showMovements(state: State, movements: Movements): State {
  return { ...state, movements }
}
export function clearMovements(state: State): State {
  return { ...state, movements: [] }
}
export function ownBall(state: State): State {
  return { ...state, ballOwner: state.moves }
}
export function freeBall(state: State): State {
  return { ...state, ballOwner: null }
}
export function calculatePositionOwnership(
  state: State,
  position: Position
): BallOwner {
  const { ball, ...players } = state.positions
  const { red, blue } = Object.keys(players).reduce(
    (o, k) => {
      if (!areNeighbors(players[k], position)) return o
      o[pieces[k].team] += 1
      return o
    },
    { red: 0, blue: 0 }
  )
  if (red === blue) return null
  return red > blue ? 'red' : 'blue'
}
export function calculateBallOwner(state: State): BallOwner {
  return calculatePositionOwnership(state, state.positions.ball)
}

export function getBallObstacles(state: State): Position[] {
  const { R1, B1 } = state.positions
  const keeper = state.moves === 'blue' ? R1 : B1
  return [sum(keeper, [0, 1]), keeper, sum(keeper, [0, -1])].filter(isArea)
}
export function getPlayerObstacles(state: State): Position[] {
  return Object.values(state.positions)
}

export function setInitialPositions(state: State): State {
  return { ...state, positions: initialPositions }
}

export function getWinner(state: State): Team {
  const { score } = state
  if (score[0] === 2) return 'red'
  if (score[1] === 2) return 'blue'
  return null
}
