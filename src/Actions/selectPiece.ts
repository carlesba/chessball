import { State } from '../Entities/GameState'
import { getPiece } from '../Entities/Pieces'
import {
  player as playerMovements,
  keeper as keeperMovements
} from '../Entities/Movements'

export default function selectPiece(state: State, id: string): State {
  const piece = getPiece(id)
  if (state.moves !== piece.team) return state
  if (state.ballOwner) return state
  if (state.selectedPiece === id)
    return {
      ...state,
      movements: [],
      selectedPiece: null
    }

  const position = state.positions[id]
  const obstacles = Object.values(state.positions)
  const getMovements = piece.keeper ? keeperMovements : playerMovements
  return {
    ...state,
    movements: getMovements(position, obstacles),
    selectedPiece: id
  }
}
