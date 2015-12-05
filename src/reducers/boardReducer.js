import boardDataBuilder from '../builders/boardDataBuilder'

const defaultBoardData = boardDataBuilder()

const board = (state = defaultBoardData, action) => {
  return state
}

export default board
