const BLANK_BG = 'white'
const getTuneByPosition = (a, b) => {
  return (row, col) => (row + col) % 2 ? a : b
}

const getGrassTune = getTuneByPosition('#257334', '#2E9A43')
const getBigAreaTune = getTuneByPosition('#CE7520', '#FF9632')
const getSmallAreaTune = getTuneByPosition('#6F5039', '#A07555')
const getGoalTune = getTuneByPosition('#6F6E6E', 'grey')
const getHighlightedTune = getTuneByPosition('#bfb52e', '#FC0')

const areas = {
  small: getSmallAreaTune,
  big: getBigAreaTune
}

export function calcBackground (tile) {
  const {kind, row, col, area, highlighted} = tile
  if (highlighted) {
    return getHighlightedTune(row, col)
  } else if (area) {
    return areas[area](row, col)
  } else if (kind === 'blank') {
    return BLANK_BG
  } else if (kind === 'goal') {
    return getGoalTune(row, col)
  } else {
    return getGrassTune(row, col)
  }
}
