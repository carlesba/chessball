import { State, setInitialPositions } from '../Entities/GameState'

export default function kickOff(state: State): State {
  return setInitialPositions(state)
}
