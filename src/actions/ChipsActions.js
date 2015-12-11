export const MOVE_CHIP = 'MOVE_CHIP'
export const SHOW_MOVE = 'SHOW_MOVE'
export const CLEAN_HIGHLIGHTS = 'CLEAN_HIGHLIGHTS'

export function moveChip (chipId, nextPosition) {
  return {
    type: MOVE_CHIP,
    chipId,
    nextPosition
  }
}

export function showMoves (chip) {
  return {
    type: SHOW_MOVE,
    chip
  }
}

export function cleanHighlights () {
  return {
    type: CLEAN_HIGHLIGHTS
  }
}
