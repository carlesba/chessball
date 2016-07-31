import {
  SELECT_CHIP,
  MOVE_SELECTED_CHIP,
  SCORE,
  MOVE_PLAYER,
  MOVE_BALL,
  MOVE_BALL_TO_BONUS,
  PASS_BALL
} from 'src/constants'

export function selectChip (chipId) {
  return {
    type: SELECT_CHIP,
    chipId
  }
}

// export function moveSelectedChip (position, team) {
//   return {
//     type: MOVE_SELECTED_CHIP,
//     position, team
//   }
// }

export function score (team) {
  return {
    type: SCORE,
    team
  }
}

export function movePlayer (position, team) {
  return {
    type: MOVE_PLAYER,
    payload: {position, team}
  }
}

export function passBall (position) {
  return {
    type: PASS_BALL,
    payload: {position}
  }
}

export function moveBallToBonus (position) {
  return {
    type: MOVE_BALL_TO_BONUS,
    payload: {position}
  }
}

export function moveBall (position) {
  return {
    type: MOVE_BALL,
    payload: {position}
  }
}
