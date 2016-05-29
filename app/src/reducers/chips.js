import {freeze} from 'freezr'
import {createChips} from 'src/models'
import createReducer from 'src/lib/createReducer'
import distance from 'src/lib/distance'
import {SELECT_CHIP, MOVE_SELECTED_CHIP, TEAM_A, TEAM_B} from 'src/constants'

const initialState = createChips([
  {position: [7, 5], team: null, selectable: false, type: 'ball'},
  {position: [2, 5], team: TEAM_A, selectable: true, type: 'player', isKeeper: true},
  {position: [4, 3], team: TEAM_A, selectable: true, type: 'player'},
  {position: [4, 7], team: TEAM_A, selectable: true, type: 'player'},
  {position: [6, 1], team: TEAM_A, selectable: true, type: 'player'},
  {position: [6, 9], team: TEAM_A, selectable: true, type: 'player'},
  {position: [12, 5], team: TEAM_B, selectable: false, type: 'player', isKeeper: true},
  {position: [10, 3], team: TEAM_B, selectable: false, type: 'player'},
  {position: [10, 7], team: TEAM_B, selectable: false, type: 'player'},
  {position: [8, 1], team: TEAM_B, selectable: false, type: 'player'},
  {position: [8, 9], team: TEAM_B, selectable: false, type: 'player'}
])

const reducerMap = {
  [SELECT_CHIP]: (state, {chipId}) => {
    const prevSelectedChipIndex = state.findIndex(({isSelected}) => isSelected)
    const targetChipIndex = state.findIndex(({id}) => id === chipId)
    return prevSelectedChipIndex < 0
      ? state.setIn([targetChipIndex, 'isSelected'], true)
      : state
        .setIn([prevSelectedChipIndex, 'isSelected'], false)
        .setIn([targetChipIndex, 'isSelected'], true)
  },
  [MOVE_SELECTED_CHIP]: (state, {position}) => {
    const selectedPlayerIndex = state.findIndex(({isSelected}) => isSelected)
    if (selectedPlayerIndex < 0) return state

    const forbiddenPositions = getPositions(state)
    if (positionIsInList(position, forbiddenPositions)) {
      return state.setIn([selectedPlayerIndex, 'isSelected'], false)
    }
    const stateWithMove = state.updateIn(
      [selectedPlayerIndex],
      (chip) => {
        return chip.merge({
          isSelected: false,
          position: position
        })
      })
    return updateBallOwnership(stateWithMove)
  }
}

function updateBallOwnership (chips) {
  const [ball, ...players] = chips
  const closerPlayers = players.filter(
    (chip) => distance(chip.position, ball.position) === 1
  )
  if (closerPlayers.length === 0 && !ball.isSelected) return chips
  if (ball.isSelected) return chips.setIn([0, 'team'], null)
  const teamOwningBall = getMostRepeatedTeam(closerPlayers)
  return chips.setIn([0, 'team'], teamOwningBall)
}

// TODO
function getMostRepeatedTeam (chips) {
  const teamCounts = chips.reduce((teams, {team}) => {
    if (teams[team] !== undefined) {
      teams[team] = 1
    } else {
      teams[team] += 1
    }
    return teams
  }, {})
  return Object.keys(teamCounts)[0]
}

function positionIsInList (position, list) {
  const [a, b] = position
  return !!list.find(([aa, bb]) => a === aa && b === bb)
}

function getPositions (chips) {
  return chips.map(({position}) => position)
}

export default createReducer(reducerMap, initialState)
