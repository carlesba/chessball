export const createMovement = (position, actions, chips) => {
  const movement = getMovement(position, actions, chips)
  return {
    position,
    onClick: movement.action,
    error: movement.forbidden
  }
}

function getMovement (position, actions, chips) {
  const caller = chips.getSelectedChip()
  const movementTypes = [
    {
      action: () => actions.movePlayer(position, caller.team),
      validation: () => caller.isPlayer()
    },
    {
      // leave it on own area
      forbidden: 'defensive movement: leave ball in own area',
      validation: () => (
        caller.isBall() &&
        position.isArea() &&
        position.field() === caller.team &&
        !position.owner(chips)
      )
    },
    {
      // selfpass
      forbidden: 'selfpass',
      validation: () => {
        const chipsAroundPosition = position.around(chips)
        const chipsAroundBall = caller.position.around(chips)
        return caller.isBall() &&
          chipsAroundBall.length === 1 &&
          chipsAroundPosition.length === 1 &&
          chipsAroundPosition[0] === chipsAroundBall[0]
      }
    },
    {
      action: () => actions.passBall(position),
      validation: () => (
        caller.isBall() &&
        position.owner(chips) === caller.team
      )
    },
    {
      action: () => actions.moveBallToBonus(position),
      validation: () => (
        caller.isBall() &&
        position.isBonus()
      )
    },
    {
      action: () => actions.score(position),
      validation: () => (
        caller.isBall() &&
        position.isGoal()
      )
    },
    {
      action: () => actions.moveBall(position),
      validation: () => (
        caller.isBall() &&
        !position.owner(chips)
      )
    },
    {
      forbidden: 'not action attached',
      validation: () => true
    }
  ]
  const {action, forbidden} = movementTypes.find(
    (attempt) => attempt.validation()
  )
  return {action, forbidden}
}
