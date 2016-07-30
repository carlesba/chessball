import {createChips} from 'src/models/chips'
import createReducer from 'src/lib/createReducer'
import {distance, switchTeam} from 'src/models/position'
import {freeze} from 'freezr'
import {
  SELECT_CHIP,
  MOVE_SELECTED_CHIP,
  SCORE,
  TEAM_A,
  TEAM_B,
  PLAYER,
  MOVE_PLAYER,
  BALL
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
  [SELECT_CHIP]: (state, {chipId}) => {
    // const prevSelectedChipIndex = state.findIndex(({isSelected}) => isSelected)
    // const targetChipIndex = state.findIndex(({id}) => id === chipId)
    // const unselected = prevSelectedChipIndex < 0
    //   ? state
    //   : state.setIn([prevSelectedChipIndex, 'isSelected'], false)
    // const selected = targetChipIndex < 0
    //   ? unselected
    //   : unselected.setIn([targetChipIndex, 'isSelected'], true)
    // return selected
    return state.unselectChip().selectChip(chipId)
  },
  [MOVE_SELECTED_CHIP]: (state, {position, team}) => {
    const selectedPlayerIndex = state.findIndex(({isSelected}) => isSelected)
    if (selectedPlayerIndex < 0) return state

    const forbiddenPositions = getPositions(state)
    if (positionIsInList(position, forbiddenPositions)) {
      return state.setIn([selectedPlayerIndex, 'isSelected'], false)
    }
    /* Apply Movement */
    const stateWithMove = state.updateIn(
      [selectedPlayerIndex],
      (chip) => chip.merge({
        isSelected: false,
        position: freeze(position)
      })
      )
    /* Set state after Movement */
    const nextBallOwner = getBallOwner(stateWithMove)
    if (nextBallOwner) {
      return stateWithMove.map((chip) =>
        chip.type === PLAYER
          ? chip.set('selectable', false)
          : chip.merge({
            team: nextBallOwner,
            isSelected: false,
            selectable: true
          })
      )
    } else {
      const nextTurnOwner = switchTeam(team)
      return stateWithMove.map((chip) =>
        chip.type === BALL
        ? chip.merge({'selectable': false, team: null})
        : chip.set('selectable', chip.team === nextTurnOwner)
      )
    }
  },
  [SCORE]: (state, action) => {
    const {team} = action
    const teamReceivesGoal = switchTeam(team)
    return initialState.map(
      (chip) => chip.set('selectable', chip.team === teamReceivesGoal)
    )
  },
  [MOVE_PLAYER]: (state, {payload: {position}}) => {
    const selectedPlayerIndex = state.findIndex(({isSelected}) => isSelected)
    return state.updateIn(
      [selectedPlayerIndex],
      (chip) => chip.set('position', position).set('isSelected', false)
    )
  }
}

function getBallOwner (chips) {
  const [ball, ...players] = chips
  const closerPlayers = players.filter(
    (chip) => distance(chip.position, ball.position) === 1
  )
  return closerPlayers.length === 0
    ? null
    : getMostRepeatedTeam(closerPlayers)
}

function getMostRepeatedTeam (chips) {
  let teamA = 0
  let teamB = 0
  chips.forEach(({team}) => {
    if (team === TEAM_A) teamA += 1
    else teamB += 1
  })
  if (teamA === teamB) return null
  return teamA > teamB ? TEAM_A : TEAM_B
}

function positionIsInList (position, list) {
  const [a, b] = position
  return !!list.find(([aa, bb]) => a === aa && b === bb)
}

function getPositions (chips) {
  return chips.map(({position}) => position)
}

export default createReducer(reducerMap, initialState)
