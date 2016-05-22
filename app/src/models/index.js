import {freeze, deepFreeze} from 'freezr'

export function createChip (props) {
  const {position, team, type, isKeeper} = props
  return deepFreeze({
    id: Symbol(),
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
