import expect from 'expect'
import {deepFreeze} from 'freezr'
import chipsReducer from 'src/reducers/chips'
import {TEAM_A, TEAM_B, BALL, PLAYER} from 'src/constants'
import {selectChip, moveSelectedChip} from 'src/actions/chips'
import {isEqual} from 'src/models/position'

describe('chipsReducer:\n', () => {
  describe('initialState:\n', () => {
    it('has 11 chips', () => {
      const initialState = chipsReducer()
      expect(initialState.length).toBe(11)
    })
    it('has 10 players and only one ball', () => {
      const initialState = chipsReducer()
      expect(initialState.filter((chip) => chip.type === BALL).length)
        .toBe(1)
      expect(initialState.filter((chip) => chip.type === PLAYER).length)
        .toBe(10)
    })
  })
  describe('selectChip: \n', () => {
    it('selects a chip give its chipId', () => {
      const initialState = chipsReducer()
      const selectedPlayer = initialState.filter(
        (chip) => chip.type !== BALL
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
        (chip) => chip.type !== BALL
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
    it('updates position of selected Chip when position is allowed', () => {
      const state = deepFreeze([
        {position: [5, 5], team: null, selectable: false, type: BALL, isSelected: false},
        {position: [2, 2], team: TEAM_A, selectable: true, type: PLAYER, isSelected: true},
        {position: [7, 7], team: TEAM_B, selectable: false, type: PLAYER, isSelected: false}
      ])
      const newPosition = [6, 6]
      const target = moveChipInReducer(state, [newPosition, TEAM_A])
      expect(isEqual(target[1].position, newPosition)).toBe(true)
    })
    it('removes chip selection when position is occupied by another one', () => {
      const state = deepFreeze([
        {position: [5, 5], team: null, selectable: false, type: BALL, isSelected: false},
        {position: [2, 2], team: TEAM_A, selectable: true, type: PLAYER, isSelected: true},
        {position: [7, 7], team: TEAM_B, selectable: false, type: PLAYER, isSelected: false}
      ])
      const newPosition = [7, 7]
      const target = moveChipInReducer(state, [newPosition, TEAM_A])
      target.forEach((chip) => {
        expect(chip.isSelected).toBe(false, 'selection has not being removed')
      })
    })
    it('doesn\'t update position on non selected chips', () => {
      const state = deepFreeze([
        {position: [5, 5], team: null, selectable: false, type: BALL, isSelected: false},
        {position: [2, 2], team: TEAM_A, selectable: true, type: PLAYER, isSelected: true},
        {position: [7, 7], team: TEAM_B, selectable: false, type: PLAYER, isSelected: false}
      ])
      const newPosition = [3, 5]
      const target = moveChipInReducer(state, [newPosition, TEAM_A])
      target.forEach((chip, index) => {
        if (index === 1) return
        expect(chip.position)
          .toBe(state[index].position, 'position has beeen updated')
      })
    })
    it('updates ball\'s ownership when ball is owned by a team', () => {
      const state = deepFreeze([
        {position: [5, 5], team: null, selectable: false, type: BALL, isSelected: false},
        {position: [2, 2], team: TEAM_A, selectable: true, type: PLAYER, isSelected: true},
        {position: [7, 7], team: TEAM_B, selectable: false, type: PLAYER, isSelected: false}
      ])
      const newPosition = [4, 5]
      const target = moveChipInReducer(state, [newPosition, TEAM_A])
      expect(target[0].team).toBe(TEAM_A)
    })
    it('updates owned positions on keepers', () => {})
    it('switch selectable chips when current one looses the ball', () => {
      const state = deepFreeze([
        {position: [3, 3], team: TEAM_A, selectable: true, type: BALL, isSelected: true},
        {position: [2, 2], team: TEAM_A, selectable: false, type: PLAYER, isSelected: false},
        {position: [7, 7], team: TEAM_B, selectable: false, type: PLAYER, isSelected: false}
      ])
      const newPosition = [5, 5]
      const target = moveChipInReducer(state, [newPosition, TEAM_A])
      target.forEach((chip) => {
        expect(chip.selectable).toBe(chip.team === TEAM_B)
      })
    })
    it('sets only the ball as selectable when a team earns the ball', () => {
      const state = deepFreeze([
        {position: [5, 5], team: null, selectable: false, type: BALL, isSelected: false},
        {position: [2, 2], team: TEAM_A, selectable: true, type: PLAYER, isSelected: true},
        {position: [7, 7], team: TEAM_B, selectable: false, type: PLAYER, isSelected: false}
      ])
      const newPosition = [4, 4]
      const target = moveChipInReducer(state, [newPosition, TEAM_A])
      target.forEach((chip) => {
        expect(chip.selectable).toBe(chip.type === BALL)
      })
    })
    it('keep only the ball selectable when changes ball ownership', () => {
      const state = deepFreeze([
        {position: [3, 3], team: TEAM_A, selectable: true, type: BALL, isSelected: true},
        {position: [2, 2], team: TEAM_A, selectable: false, type: PLAYER, isSelected: false},
        {position: [7, 7], team: TEAM_B, selectable: false, type: PLAYER, isSelected: false}
      ])
      const newPosition = [6, 6]
      const target = moveChipInReducer(state, [newPosition, TEAM_A])
      target.forEach((chip) => {
        expect(chip.selectable).toBe(chip.type === BALL)
      })
    })
  })
  describe('score', () => {
    it('sets chips position like the beginning of the game', () => {})
    it('sets as selectable team that received goal\'s chips', () => {})
  })
})

function moveChipInReducer (state, moveChipArgs) {
  return chipsReducer(
    state,
    moveSelectedChip.apply(null, moveChipArgs)
  )
}
