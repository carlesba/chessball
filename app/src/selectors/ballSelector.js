import {BALL} from 'src/constants'

export default function ballSelector (state) {
  return state.chips.find(({type}) => type === BALL)
}
