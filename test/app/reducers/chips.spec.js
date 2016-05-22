import expect from 'expect'
import chipsReducer from 'src/reducers/chips'
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
    it('sets to true isSelect given a chipId', () => {
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
    it('sets to false isSelected any other chip except the target one', () => {
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
  })
  describe.only('moveSelectedChip\n', () => {
    it('updates position of selectedChip', () => {
      const stateWithSelection = createStateWithSelectedPlayer()
      const selectedPlayer = stateWithSelection.find(
        ({isSelected}) => isSelected
      )
      const deltaPosition = [1, 1]
      const action = moveSelectedChip(deltaPosition)
      const targetState = chipsReducer(stateWithSelection, action)
      const targetPlayer = targetState.find(({isSelected}) => isSelected)
      targetPlayer.position.forEach((position, index) => {
        const originalPosition = selectedPlayer.position[index]
        expect(position).toBe(originalPosition + deltaPosition[index])
      })
    })
    it('doesn\'t update position on non selected chips', () => {
      const stateWithSelection = createStateWithSelectedPlayer()
      const selectedPlayer = stateWithSelection.find(
        ({isSelected}) => isSelected
      )
      const deltaPosition = [1, 1]
      const action = moveSelectedChip(deltaPosition)
      const targetState = chipsReducer(stateWithSelection, action)
      targetState.forEach((chip, index) => {
        if (chip.id !== selectedPlayer.id) {
          expect(chip.position).toBe(stateWithSelection[index].position)
        }
      })
    })
    it('removes selection on selected chip', () => {})
    it('updates ball\'s ownership', () => {})
    it('updates owned positions on keepers', () => {})
  })
})

function createStateWithSelectedPlayer () {
  const initialState = chipsReducer()
  return initialState.setIn([2, 'isSelected'], true)
}
