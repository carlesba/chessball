import { Position, sum, multiply, equals } from './Position'
import { goal, isEmpty } from './Board'
export type Movements = Array<Position>

const DIRECTIONS = [
  [0, -1],
  [0, 1],
  [-1, 0],
  [1, 0],
  [-1, -1],
  [-1, 1],
  [1, -1],
  [1, 1]
]

export function player(
  position: Position,
  obstacles: Array<Position> = []
): Movements {
  const movementLength = 2
  return DIRECTIONS.reduce(
    (moves: Movements, direction: Position): Movements => {
      for (
        let i = 1, obstacleFree = true;
        i <= movementLength && obstacleFree;
        i += 1
      ) {
        const vector = multiply(direction, i)
        const movement = sum(vector, position)
        obstacleFree = !obstacles.find(o => equals(o, movement))
        let isValid = !goal(movement) && !isEmpty(movement)
        if (obstacleFree && isValid) {
          moves.push(movement)
        }
      }
      return moves
    },
    []
  )
}
export function keeper(
  position: Position,
  obstacles: Array<Position> = []
): Movements {
  const movementLength = 2
  return DIRECTIONS.reduce(
    (moves: Movements, direction: Position): Movements => {
      for (
        let i = 1, obstacleFree = true;
        i <= movementLength && obstacleFree;
        i += 1
      ) {
        const vector = multiply(direction, i)
        const movement = sum(vector, position)
        obstacleFree = !obstacles.find(o => equals(o, movement))
        let isValid = !goal(movement) && !isEmpty(movement)
        if (obstacleFree && isValid) {
          moves.push(movement)
        }
      }
      return moves
    },
    []
  )
}

export function ball(
  position: Position,
  obstacles: Array<Position> = [],
  taken: Array<Position> = []
): Movements {
  const movementLength = 4
  return DIRECTIONS.reduce(
    (moves: Movements, direction: Position): Movements => {
      for (
        let i = 1, obstacleFree = true;
        i <= movementLength && obstacleFree;
        i += 1
      ) {
        const vector = multiply(direction, i)
        const movement = sum(vector, position)
        obstacleFree = !obstacles.find(o => equals(o, movement))
        let isValid =
          !isEmpty(movement) && !taken.find(o => equals(o, movement))
        if (obstacleFree && isValid) {
          moves.push(movement)
        }
      }
      return moves
    },
    []
  )
}

export function toString(movements: Position[], reference: Position): string[] {
  const [r, c] = reference
  return movements.map(m => {
    const [rr, cc] = m
    const diffR = rr - r
    const horizontal = diffR < 0 ? `L${-diffR}` : diffR > 0 ? `R${diffR}` : ''
    const diffC = cc - c
    const vertical = diffC < 0 ? `U${-diffC}` : diffC > 0 ? `D${diffC}` : ''

    return [horizontal, vertical].join('')
  })
}
