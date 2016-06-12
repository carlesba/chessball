import ballSelector from 'src/selectors/ballSelector'
import {isGoal} from 'src/models/Position'

export default function isGoalSelector (state) {
  const {position: [row, col]} = ballSelector(state)
  return isGoal(row, col)
}
