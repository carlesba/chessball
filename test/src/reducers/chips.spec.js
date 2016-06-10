import expect from 'expect'
import chipsReducer from 'src/reducers/chips'
import {TEAM_A, TEAM_B} from 'src/constants/index.js'
import {selectChip, moveSelectedChip} from 'src/actions/chips'

describe('chipsReducer:\n', () => {
  describe('initialState:\n', () => {
    it('has 11 chips', () => {
      const initialState = chipsReducer()
      expect(initialState.length).toBe(11)
    })
    it('has 10 players and only one ball', () => {
      const initialState = chipsReducer()
      expect(initialState.filter((chip) => chip.type === 'ball').length)
        .toBe(1)
      expect(initialState.filter((chip) => chip.type === 'player').length)
        .toBe(10)
    })
  })
  describe('selectChip: \n', () => {
    it('selects a chip give its chipId', () => {
      const initialState = chipsReducer()
      const selectedPlayer = initialState.filter(
        (chip) => chip.type !== 'ball'
      )[0]
      const action = selectChip(selectedPlayer.id)
      const targetState = chipsReducer(initialState, action)
      expect(selectedPlayer.isSelected)
        .toBeFalsy()
      expect(targetState.find(({id}) => id === selectedPlayer.id).isSelected)
        .toBe(true)
    })
    it('unselects any other selected chip except the target one', () => {
      const initialState = chipsReducer()
      const players = initialState.filter(
        (chip) => chip.type !== 'ball'
      )
      const firstPlayerId = players[0].id
      const secondPlayerId = players[1].id
      const firstState = chipsReducer(
        initialState,
        selectChip(firstPlayerId)
      )
      const targetState = chipsReducer(
        firstState,
        selectChip(secondPlayerId)
      )
      expect(
        targetState.find(({id}) => id === firstPlayerId).isSelected
      ).toBeFalsy()
      expect(
        targetState.find(({id}) => id === secondPlayerId).isSelected
      ).toBe(true)
    })
    it('unselects all chips when no chipId is passed', () => {
      const state = chipsReducer().setIn([1, 'isSelected'], true)
      const target = chipsReducer(state, selectChip())
      target.forEach((chip) => {
        expect(chip.isSelected).toBeFalsy('this chip shouldn\'t be selected', chip)
      })
    })
  })
  describe('moveSelectedChip\n', () => {
    it('updates position of selectedChip when position is allowed', () => {
      const targetPlayerIndex = 2
      const stateWithSelection = createStateWithSelectedChip(targetPlayerIndex)
      const targetPosition = [1, 1]
      const action = moveSelectedChip(targetPosition)
      const targetState = chipsReducer(stateWithSelection, action)
      const targetPlayer = targetState[targetPlayerIndex]
      targetPlayer.position.forEach((position, index) => {
        expect(position).toBe(targetPosition[index])
      })
    })
    it('removes chip selection when position is occupied by another one', () => {
      const selectedPlayerIndex = 2
      const stateWithSelection = createStateWithSelectedChip(selectedPlayerIndex)
      const targetPosition = stateWithSelection[5].position // other chip position
      const action = moveSelectedChip(targetPosition)
      const targetState = chipsReducer(stateWithSelection, action)
      targetState.forEach((chip) => {
        expect(chip.isSelected).toBeFalsy()
      })
    })
    it('doesn\'t update position on non selected chips', () => {
      const stateWithSelection = createStateWithSelectedChip()
      const selectedPlayer = stateWithSelection.find(
        ({isSelected}) => isSelected
      )
      const position = [1, 1]
      const action = moveSelectedChip(position)
      const targetState = chipsReducer(stateWithSelection, action)
      targetState.forEach((chip, index) => {
        if (chip.id !== selectedPlayer.id) {
          expect(chip.position).toBe(stateWithSelection[index].position)
        }
      })
    })
    it('updates ball\'s ownership when ball has been moved', () => {
      const initialState = chipsReducer()
      const stateWithBallSelected = initialState
        .updateIn([0], (chip) => chip.merge({
          isSelected: true,
          selectable: true
        }))
      const teamBplayer = initialState.find(
        ({type, team}) => type === 'player' && team === TEAM_B
      )
      const ownedPositionByB = teamBplayer.position.update(0, (p) => p + 1)
      const targetState = chipsReducer(
        stateWithBallSelected,
        moveSelectedChip(ownedPositionByB)
      )
      expect(targetState[0].team).toBe(teamBplayer.team)
    })
    it('updates owned positions on keepers', () => {})
    it('switch selectable chips when current ones loose the ball', () => {
      const initialState = chipsReducer()
      const stateWithTeamAOwningBall = initialState
        .updateIn([0], (chip) => chip.merge({
          selectable: true,
          isSelected: true,
          team: TEAM_A,
          position: chip.position.set(0, chip.position[0] + 1)
        }))
      const neutralPosition = initialState[0].position
      const targetState = chipsReducer(
        stateWithTeamAOwningBall,
        moveSelectedChip(neutralPosition)
      )
      targetState.forEach((chip, index) => {
        if (index === 0) {
          expect(chip.selectable).toBe(false, 'ball is not selected')
          expect(chip.team).toBeFalsy('ball team is not updated')
        } else {
          expect(chip.selectable).toBe(chip.team !== TEAM_A)
        }
      })
    })
    it('sets ball as selectable when a chip is moved next to it', () => {
      const initialState = chipsReducer()
      const stateWithTeamAOwningBall = initialState
        .updateIn([1], (chip) => chip.merge({
          selectable: true,
          isSelected: true
        }))
      const nextToBallPosition = initialState[0].position.update(0, (p) => p + 1)
      const targetState = chipsReducer(
        stateWithTeamAOwningBall,
        moveSelectedChip(nextToBallPosition)
      )
      targetState.forEach((chip, index) => {
        if (index === 0) {
          expect(chip.selectable).toBe(true, 'ball should be selectable')
          expect(chip.team).toBe(TEAM_A, 'ball\'s team is not updated')
        } else {
          expect(chip.selectable).toBe(chip.team === TEAM_A)
        }
      })
    })
    it('sets as selectable chips team B and the ball when team B recovers the ball', () => {
      const stateWithBallOwnedByTeamA = createStateWithBallOwnedByTeam(TEAM_A)
      .updateIn([0], (chip) => chip.merge({
        isSelected: true,
        selectable: true
      }))
      const positionOwnedByB = [12, 6]
      const targetState = chipsReducer(
        stateWithBallOwnedByTeamA,
        moveSelectedChip(positionOwnedByB)
      )
      targetState.forEach((chip, i) => {
        if (chip.team === TEAM_A) expect(chip.selectable).toBe(false)
        else expect(chip.selectable).toBe(true, `chip[${i}] should be selectable`)
      })
    })
  })
})

function createStateWithSelectedChip (chipIndex = 2) {
  const initialState = chipsReducer()
  return initialState.setIn([chipIndex, 'isSelected'], true)
}

function createStateWithBallOwnedByTeam (teamId) {
  const initialState = chipsReducer()
  const targetChip = initialState.find(({team}) => team === teamId)
  const newBallPosition = targetChip.update('position', (pos) => {
    return pos.set(1, pos[1] + 1)
  }).position
  return initialState
    .updateIn([0], (ball) => ball.merge({position: newBallPosition, team: teamId}))
}
