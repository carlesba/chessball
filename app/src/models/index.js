import {freeze, deepFreeze} from 'freezr'
let index = 0
export function createChip (props) {
  const {position, team, type, isKeeper} = props
  return deepFreeze({
    id: Symbol(index++),
    position,
    team,
    isKeeper,
    type,
    isSelected: false
  })
}

export function createChips (listOfChips) {
  return freeze(listOfChips).map((chip) => createChip(chip))
}
