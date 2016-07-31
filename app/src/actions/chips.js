import {
  SELECT_CHIP,
  SCORE,
  MOVE_PLAYER,
  MOVE_BALL,
  MOVE_BALL_TO_BONUS,
  PASS_BALL,
  KICK_OFF
} from 'src/constants'

export function selectChip (chipId) {
  return {
    type: SELECT_CHIP,
    payload: {chipId}
  }
}

export function score (position, team) {
  return {
    type: SCORE,
    payload: {position, team}
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

export function kickOff () {
  return {
    type: KICK_OFF,
    payload: {}
  }
}
