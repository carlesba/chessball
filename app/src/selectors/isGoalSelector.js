import ballSelector from 'src/selectors/ballSelector'

export default function isGoalSelector (state) {
  const {position} = ballSelector(state)
  return position.isGoal()
}
