import { TILE_WIDTH } from './constants'

export const getReferencePoints = () => {
  const {top, left} = document.getElementById('game').getBoundingClientRect()
  return {
    topRef: top,
    leftRef: left
  }
}

export const pixelsToMovement = ({x, y}) => {
  return {
    cols: Math.round(x / TILE_WIDTH),
    rows: Math.round(y / TILE_WIDTH)
  }
}

export const applyMoveToPosition = (currentPosition, movement) => {
  const nextRow = currentPosition.row + movement.rows
  const nextCol = currentPosition.col + movement.cols
  return {
    col: nextCol,
    row: nextRow
  }
}

export const positionToPixels = ({col, row}) => {
  return { top: row * TILE_WIDTH, left: col * TILE_WIDTH }
}

export const pixelsToPosition = ({top, left}) => {
  return {
    row: Math.round(left / TILE_WIDTH),
    col: Math.round(top / TILE_WIDTH)
  }
}
export const calculatePositionDistance = (pos1, pos2) => {
  const rowDistance = Math.abs(pos1.row) - Math.abs(pos2.row)
  const colDistance = Math.abs(pos1.col) - Math.abs(pos2.col)
  return Math.max(Math.abs(rowDistance), Math.abs(colDistance))
}

export const calculatePositionOwner = (position, chips) => {
  const teamsChips = chips
    .filter(chip => {
      return calculatePositionDistance(chip, position) === 1 && chip.kind !== 'ball'
    })
    .reduce((teams, chip) => {
      teams[chip.team] += 1
      return teams
    }, [0, 0])
  if (teamsChips[0] > teamsChips[1]) return 0
  else if (teamsChips[1] > teamsChips[0]) return 1
  else return null
}
