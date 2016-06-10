import {createChips} from 'src/models/Chip'
import createReducer from 'src/lib/createReducer'
import {distance} from 'src/models/Position'
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
    const unselected = prevSelectedChipIndex < 0
      ? state
      : state.setIn([prevSelectedChipIndex, 'isSelected'], false)
    const selected = targetChipIndex < 0
      ? unselected
      : unselected.setIn([targetChipIndex, 'isSelected'], true)
    return selected
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
    const ballUpdated = updateBallOwnership(stateWithMove)
    const newBallOwner = ballUpdated[0].team
    const ballSelection = ballUpdated.setIn([0, 'selectable'], !!newBallOwner)
    const prevSelectableTeam = getSelectableTeam(state)

    if (newBallOwner !== prevSelectableTeam) {
      const newTeamOwner = switchTeam(prevSelectableTeam)
      return selectPlayersByTeam(ballSelection, newTeamOwner)
    } else {
      return ballSelection
    }
  }
}

function switchTeam (team) {
  return team !== TEAM_A ? TEAM_A : TEAM_B
}

function updateBallOwnership (chips) {
  const [ball, ...players] = chips
  const closerPlayers = players.filter(
    (chip) => distance(chip.position, ball.position) === 1
  )
  if (closerPlayers.length === 0) return chips.setIn([0, 'team'], null)
  const teamOwningBall = getMostRepeatedTeam(closerPlayers)
  return chips.setIn([0, 'team'], teamOwningBall)
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

function getSelectableTeam (state) {
  return state[1].selectable
    ? TEAM_A
    : TEAM_B
}

function selectPlayersByTeam (state, selectableTeam) {
  return state.map((chip) => chip.type === 'player'
    ? chip.set('selectable', chip.team === selectableTeam)
    : chip
  )
}

function positionIsInList (position, list) {
  const [a, b] = position
  return !!list.find(([aa, bb]) => a === aa && b === bb)
}

function getPositions (chips) {
  return chips.map(({position}) => position)
}

export default createReducer(reducerMap, initialState)
