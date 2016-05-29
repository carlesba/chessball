import expect from 'expect'
import scoreReducer from 'src/reducers/score'

describe('scoreReducer', () => {
  describe('initialState', () => {
    it('has to be 0-0', () => {
      const initialState = scoreReducer()
      expect(initialState.length).toBe(2)
      expect(initialState[0]).toBe(0)
      expect(initialState[1]).toBe(0)
    })
  })
  describe('moveSelectedChip', () => {
    it('updates local score when ball will be in goal position', () => {})
    it('doesn\'t update local score when ball won\'t be in goal position', () => {})
  })
})
