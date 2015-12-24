import {update} from '../utils/immutable'
import {highlightChips} from './moveChipReducer'

const updateChipsPosition = (chips, chipsPosition) => {
  return chips.map((chip, index) => {
    const {row, col} = chipsPosition[index]
    return update(chip, {row, col})
  })
}

const kickOffReducer = (state, defaultChips, defaultGame) => {
  const {ballPasses, ballOwner} = defaultGame
  const chips = highlightChips(state.chips, state.game.turnOwner)
  return {
    chips: updateChipsPosition(chips, defaultChips),
    game: update(state.game, {
      isGoal: false,
      isKickOff: true,
      ballPasses,
      ballOwner
    })
  }
}
export default kickOffReducer
