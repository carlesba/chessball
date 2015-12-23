export const MOVE_CHIP = 'MOVE_CHIP'
export const SHOW_MOVES = 'SHOW_MOVES'
export const CLEAN_MOVEMENTS = 'CLEAN_MOVEMENTS'

export function moveChip (chipId, nextPosition) {
  return {
    type: MOVE_CHIP,
    chipId,
    nextPosition
  }
}

export function showMoves (chipId) {
  return {
    type: SHOW_MOVES,
    chipId
  }
}

export function cleanMovements () {
  return {
    type: CLEAN_MOVEMENTS
  }
}
