import {v4} from 'node-uuid'
import {freeze} from 'freezr'
import {createPosition} from 'src/models/position'
import {PLAYER, BALL} from 'src/constants'

const chipPrototype = {
  isBall () {
    return this.type === BALL
  },
  isPlayer () {
    return this.type === PLAYER
  },
  setSelectable (value) {
    return this.set('selectable', value)
  },
  select () {
    return this.set('isSelected', true)
  },
  unselect () {
    return this.set('isSelected', false)
  },
  moveChip (position) {
    return this.set('position', position)
  }
}

export const createChip = (props) => {
  const {
    id,
    position,
    team,
    type,
    selectable,
    isSelected,
    isKeeper
  } = props
  return freeze({
    id: id || v4(),
    position: Array.isArray(position)
      ? createPosition(position)
      : props.position,
    team,
    type,
    selectable,
    isSelected,
    isKeeper,
    ...chipPrototype
  })
}
