import {createChips} from 'src/models/chips'
import createReducer from 'src/lib/createReducer'
import switchTeam from 'src/lib/switchTeam'
import {
  SELECT_CHIP,
  SCORE,
  TEAM_A,
  TEAM_B,
  PLAYER,
  MOVE_PLAYER,
  MOVE_BALL,
  PASS_BALL,
  MOVE_BALL_TO_BONUS,
  BALL,
  KICK_OFF
} from 'src/constants'

const initialState = createChips([
  {position: [7, 5], team: null, selectable: false, type: BALL},
  {position: [2, 5], team: TEAM_A, selectable: true, type: PLAYER, isKeeper: true},
  {position: [4, 3], team: TEAM_A, selectable: true, type: PLAYER},
  {position: [4, 7], team: TEAM_A, selectable: true, type: PLAYER},
  {position: [6, 1], team: TEAM_A, selectable: true, type: PLAYER},
  {position: [6, 9], team: TEAM_A, selectable: true, type: PLAYER},
  {position: [12, 5], team: TEAM_B, selectable: false, type: PLAYER, isKeeper: true},
  {position: [10, 3], team: TEAM_B, selectable: false, type: PLAYER},
  {position: [10, 7], team: TEAM_B, selectable: false, type: PLAYER},
  {position: [8, 1], team: TEAM_B, selectable: false, type: PLAYER},
  {position: [8, 9], team: TEAM_B, selectable: false, type: PLAYER}
])

const reducerMap = {
  [SELECT_CHIP]: (state, {payload: {chipId}}) => {
    const selectedChip = state.getSelectedChip()
    if (!selectedChip) return state.selectChip(chipId)
    if (!chipId) return state.unselectChip()
    else return state.unselectChip().selectChip(chipId)
  },
  [MOVE_PLAYER]: (state, {payload: {position}}) => {
    const selectedChip = state.getSelectedChip()
    const afterMovement = state
      .moveChip(selectedChip.id, position)
      .unselectChip()
    const newBallOwner = afterMovement.getBallPositionOwner(afterMovement)
    if (newBallOwner) {
      return afterMovement
        .setBallOwner(newBallOwner)
        .setBallSelectable()
        .selectChip(state.getBall().id)
    } else {
      const selectableTeam = switchTeam(selectedChip.team)
      return afterMovement
        .setTeamSelectable(selectableTeam)
    }
  },
  [MOVE_BALL]: (state, {payload: {position}}) => {
    const nextTurnOwner = switchTeam(state.getBall().team)
    return state
      .moveBall(position)
      .unselectChip()
      .setBallOwner(null)
      .setTeamSelectable(nextTurnOwner)
  },
  [PASS_BALL]: (state, {payload: {position}}) => {
    return state.moveBall(position)
  },
  [SCORE]: (state, {payload: {position}}) => {
    return state
      .moveBall(position)
      .unselectChip()
      .setTeamSelectable()
  },
  [MOVE_BALL_TO_BONUS]: (state, {payload: {position}}) => {
    return state
      .moveBall(position)
      .unselectChip()
      .setTeamSelectable(state.getBallOwner())
      .setBallOwner(null)
  },
  [KICK_OFF]: (state, {payload: {team}}) => {
    return initialState.setTeamSelectable(team)
  }
}

export default createReducer(reducerMap, initialState)
