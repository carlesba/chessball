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
  move (position) {
    return this.set('position', position)
  },
  keeperHands () {
    if (
      this.isKeeper &&
      this.position.isArea() &&
      this.position.field() === this.team
    ) {
      const left = this.position.increase([0, -1])
      const right = this.position.increase([0, 1])
      let hands = []
      if (left.isArea()) hands.push(left)
      if (right.isArea()) hands.push(right)
      return hands
    } else {
      return []
    }
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
