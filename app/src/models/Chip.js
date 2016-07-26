import {v4} from 'node-uuid'
import {freeze} from 'freezr'
import {createPosition} from 'src/models/Position'
import {PLAYER, BALL} from 'src/constants'

export const createChip = ({
  position,
  team,
  selectable,
  type,
  isKeeper
}) => {
  return freeze({
    id: v4(),
    position: createPosition(position),
    team,
    selectable,
    type,
    isBall () { return type === BALL },
    isPlayer () { return type === PLAYER },
    isKeeper,
    isSelected: false
  })
}

export function createChips (listOfChips) {
  return freeze(listOfChips).map((chip) => createChip(chip))
}
