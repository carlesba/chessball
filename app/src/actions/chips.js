export function selectChip (chipId) {
  return {
    type: 'SELECT_CHIP',
    chipId
  }
}

export function moveSelectedChip (deltaPosition) {
  return {
    type: 'MOVE_SELECTED_CHIP',
    deltaPosition
  }
}
