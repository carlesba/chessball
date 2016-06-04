import {freeze, deepFreeze} from 'freezr'
import {v4} from 'node-uuid'
export function createChip (props) {
  return deepFreeze({
    ...props,
    id: v4(),
    isSelected: false
  })
}

export function createChips (listOfChips) {
  return freeze(listOfChips).map((chip) => createChip(chip))
}
