export const MOVE_CHIP = 'MOVE_CHIP'
export const SHOW_MOVE = 'SHOW_MOVE'

export function moveChip (chipId, currentPosition, nextPosition) {
  return {
    type: MOVE_CHIP,
    chipId,
    currentPosition,
    nextPosition
  }
}

export function showMoves (currentPosition) {
  return {
    type: SHOW_MOVE,
    currentPosition
  }
}
