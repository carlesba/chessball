import {SELECT_CHIP, MOVE_SELECTED_CHIP, SCORE} from 'src/constants'

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

export const score = (team) => {
  return {
    type: SCORE,
    team
  }
}
