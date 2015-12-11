import { SHOW_MOVE, CLEAN_HIGHLIGHTS } from '../actions/ChipsActions'

import showMovesReducer from './actionsReducers/showMovesReducer'

import boardDataBuilder from '../builders/boardDataBuilder'

const defaultTiles = boardDataBuilder()
const defaultBoardData = {
  tiles: defaultTiles,
  highlights: []
}

const board = (state = defaultBoardData, action) => {
  switch (action.type) {
    case SHOW_MOVE:
      return showMovesReducer(state, action)
    case CLEAN_HIGHLIGHTS:
      return {
        tiles: state.tiles,
        highlights: defaultBoardData.highlights
      }
    default:
      state
  }
  return state
}

export default board
