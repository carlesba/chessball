import expect from 'expect'
import {cleanHighlightsReducer} from '../../../src/reducers/actionsReducers/cleanHighlightsReducer'

describe('cleanHighlightsReducer', () => {
  it('should unhighlight all tiles', () => {
    const tiles = [
      {row: 0, col: 0, highlighted: true},
      {row: 1, col: 0, highlighted: false},
      {row: 2, col: 0, highlighted: true}
    ]
    cleanHighlightsReducer(tiles).forEach((tile) => {
      expect(tile.highlighted).toNotBe(true)
    })
  })
})
