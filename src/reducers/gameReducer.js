import { MOVE_CHIP } from '../actions/ChipsActions'

const gameReducer = (state, action) => {
  const {game} = state
  switch (action.type) {
    case MOVE_CHIP:
      return Object.assign({}, game, {
        turnOwner: (game.turnOwner + 1) % 2
      })
    default:
      return game
  }
}

export default gameReducer
