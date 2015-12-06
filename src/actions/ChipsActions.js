export const MOVE_CHIP = 'MOVE_CHIP'

export function moveChip (chipId, currentPosition, nextPosition) {
  return {
    type: MOVE_CHIP,
    chipId,
    currentPosition,
    nextPosition
  }
}
