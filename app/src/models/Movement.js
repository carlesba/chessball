
export const createMovement = (position, actions, context) => ({
  position,
  onClick: getAction(position, actions, context)
})

function getAction (position, actions, context) {
  const caller = context.find((chip) => chip.isSelected)
  const others = context.filter((chip) => chip !== caller)
  const movementTypes = [
    {
      action: () => actions.movePlayer(position, caller.team),
      validation: () => caller.isPlayer()
    },
    {
      action: () => actions.passBall(position),
      validation: () => (
        caller.isBall() &&
        position.owner(others) === caller.team
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
        position.isArea() &&
        position.field() !== caller.team
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
