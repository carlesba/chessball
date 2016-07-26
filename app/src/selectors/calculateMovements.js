import calculateMovementsPositions from 'src/selectors/calculateMovementsPositions'
import {createMovement} from 'src/models/Movement'

export default function calculateMovements (chips, actions) {
  return calculateMovementsPositions(chips)
    .map((position) => createMovement(position, actions, chips))
}
