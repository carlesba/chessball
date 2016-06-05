import {v4} from 'node-uuid'
import {freeze, deepFreeze} from 'freezr'

export const createChip = ({
  position: [row, col],
  team,
  selectable,
  type,
  isKeeper
}) => {
  return deepFreeze({
    id: v4(),
    position: [row, col],
    team,
    selectable,
    type,
    isSelected: false
  })
}

export function createChips (listOfChips) {
  return freeze(listOfChips).map((chip) => createChip(chip))
}
