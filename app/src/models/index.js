import {freeze, deepFreeze} from 'freezr'
let index = 0
export function createChip (props) {
  return deepFreeze({
    ...props,
    id: Symbol(index++),
    isSelected: false
  })
}

export function createChips (listOfChips) {
  return freeze(listOfChips).map((chip) => createChip(chip))
}
