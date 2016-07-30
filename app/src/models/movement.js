export const createMovement = (position, actions, chips) => {
  const action = getAction(position, actions, chips)
  return {
    position,
    onClick: action
  }
}

function getAction (position, actions, chips) {
  const caller = chips.getSelectedChip()
  const movementTypes = [
    {
      action: () => actions.movePlayer(position, caller.team),
      validation: () => caller.isPlayer()
    },
    {
      // selfpass
      action: null,
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
      action: null,
      validation: () => true
    }
  ]
  const {action} = movementTypes.find(
    (attempt) => attempt.validation()
  )
  return action
}
