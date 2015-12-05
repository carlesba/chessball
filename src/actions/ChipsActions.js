export const MOVE_CHIP = 'MOVE_CHIP'

export function moveChip (chipId, top, left) {
  return {
    type: MOVE_CHIP,
    chipId,
    top,
    left
  }
}
