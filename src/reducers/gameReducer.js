const gameReducer = (game, chips) => {
  const ball = chips.find(chip => chip.kind === 'ball')
  if (ball.team !== game.turnOwner) {
    return Object.assign({}, game, {
      turnOwner: (game.turnOwner + 1) % 2,
      ballOwner: ball.team
    })
  } else if (ball.team !== null) {
    return Object.assign({}, game, {
      ballOwner: ball.team
    })
  } else {
    return game
  }
}

export default gameReducer
