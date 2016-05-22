import expect from 'expect'
import chipsReducer from 'src/reducers/chips'
import {selectChip, moveSelectedChip} from 'src/actions/chips'

describe('chipsReducer:', () => {
  describe('initialState', () => {
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
  describe('selectChip', () => {
    it('marks as selected the chip by chipId', () => {
      const initialState = chipsReducer()
      const selectedPlayer = initialState.filter(
        (chip) => chip.type !== 'ball'
      )[0]
      const action = selectChip(selectedPlayer.id)
      const targetState = chipsReducer(initialState, action)
      expect(selectedPlayer.isSelected)
        .toBeFalsy()
      expect(targetState.find(({id}) => id === selectedPlayer.id).isActive)
        .toBe(true)
    })
  })
  describe('moveSelectedChip', () => {
    it('sets selectedChip as unSelected', () => {
      const initialState = chipsReducer()
      const action = moveSelectedChip()
      const targetState = chipsReducer(initialState, action)
    })
    it('doesn\'t change selected position when not available', () => {})
    it('sets selected chip position if available', () => {})
    it('updates ball\'s ownership', () => {})
  })
})
