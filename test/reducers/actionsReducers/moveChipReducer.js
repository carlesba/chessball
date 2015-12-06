import expect from 'expect'
import {MOVE_CHIP} from '../../../src/actions/ChipsActions'
import {moveChipReducer, isTargetTile} from '../../../src/reducers/actionsReducers/moveChipReducer'

describe('isTargetTile', () => {
  it('returns false if tile doesn\'t match with position', () => {
    const position = {row: 3, col: 4}
    const tile = {row: 3, col: 4}
    expect(isTargetTile(tile, position)).toBe(true)
  })
  it('returns true if tile matches with position', () => {
    const position = {row: 3, col: 4}
    const tile = {row: 3, col: 3}
    expect(isTargetTile(tile, position)).toBe(false)
  })
})

describe('moveChipReducer', () => {
  const buildMockTiles = () => {
    return [
      {row: 0, col: 0, chipId: 3},
      {row: 1, col: 0},
      {row: 2, col: 0, highlighted: true}
    ]
  }
  const buildMockAction = () => {
    return {
      type: MOVE_CHIP,
      chipId: 3,
      currentPosition: {row: 0, col: 0},
      nextPosition: {row: 2, col: 0}
    }
  }
  it('should remove chip in currentPosition tile', () => {
    const tiles = buildMockTiles()
    const action = buildMockAction()
    const newTiles = moveChipReducer(tiles, action)
    expect(newTiles[0].chipId).toNotExist()
  })
  it('should add chip to nextPosition tile', () => {
    const tiles = buildMockTiles()
    const action = buildMockAction()
    const newTiles = moveChipReducer(tiles, action)
    expect(newTiles[2].chipId).toBe(action.chipId)
  })
  it('shouldn\'t change unnecessary tiles', () => {
    const tiles = buildMockTiles()
    const action = buildMockAction()
    const newTiles = moveChipReducer(tiles, action)
    expect(newTiles[1]).toBe(tiles[1])
  })
})
