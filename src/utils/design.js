const colors = {
  ball: 'black',
  player0: 'red',
  player1: 'blue'
}

export const getBackground = (chip) => {
  const {kind, team} = chip
  const colorKey = (team > -1)
    ? `${kind}${team}`
    : `${kind}${team}`
  return colors[colorKey]
}
// TODO: make getTunePosition reusable. now it's duplicated from boxColors.js
const getTuneByPosition = (a, b) => {
  return (row, col) => (row + col) % 2 ? a : b
}
export const getHighlightedTune = getTuneByPosition('#bfb52e', '#FC0')
