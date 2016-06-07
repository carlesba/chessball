import {freeze} from 'freezr'
import {
  isBonus,
  calcTeam,
  isArea,
  isGoal,
  isBlank
} from 'src/models/Position'
let index = 0
export default function createTile (row, col) {
  return freeze({
    id: index++,
    row, col,
    team: calcTeam(row, col),
    isArea: isArea(row, col),
    isBonus: isBonus(row, col),
    isGoal: isGoal(row, col),
    isBlank: isBlank(row, col)
  })
}
