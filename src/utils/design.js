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
