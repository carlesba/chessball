import {freeze} from 'freezr'
import {
  isBonus,
  calcTeam,
  isArea,
  isGoal,
  isBlank
} from 'src/models/Position'
let index = 0
export default function createTile (position) {
  return freeze({
    id: index++,
    row: position[0],
    col: position[1],
    team: calcTeam(position),
    isArea: isArea(position),
    isBonus: isBonus(position),
    isGoal: isGoal(position),
    isBlank: isBlank(position)
  })
}
