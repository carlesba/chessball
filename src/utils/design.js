import palette from '../palettes'
const {tiles, movements, highlight, chips} = palette('grey')

export const getChipBackground = (chip) => {
  const {kind, team} = chip
  if (kind === 'ball') return chips.ball
  if (team === 0) return chips.playerA
  if (team === 1) return chips.playerB
}
const getTuneByPosition = ([a, b]) => (row, col) => (row + col) % 2 ? a : b

const getGrassTune = getTuneByPosition(tiles.grass)
const getBigAreaTune = getTuneByPosition(tiles.bigArea)
const getSmallAreaTune = getTuneByPosition(tiles.smallArea)
const getGoalTune = getTuneByPosition(tiles.goal)
const BLANK_BG = tiles.blank

export const getMovementTune = getTuneByPosition(movements)

export function getTileBackground (tile) {
  const {kind, row, col, area} = tile
  if (area === 'small') return getSmallAreaTune(row, col)
  if (area === 'big') return getBigAreaTune(row, col)
  if (kind === 'blank') return BLANK_BG
  if (kind === 'goal') return getGoalTune(row, col)
  return getGrassTune(row, col)
}
export const getChipHighlight = () => highlight
