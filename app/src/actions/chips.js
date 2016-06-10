import {SELECT_CHIP, MOVE_SELECTED_CHIP} from 'src/constants'

export function selectChip (chipId) {
  return {
    type: SELECT_CHIP,
    chipId
  }
}

export function moveSelectedChip (position, team) {
  return {
    type: MOVE_SELECTED_CHIP,
    position, team
  }
}
