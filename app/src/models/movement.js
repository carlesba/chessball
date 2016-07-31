import switchTeam from 'src/lib/switchTeam'
export const createMovement = (position, actions, state) => {
  const movement = getMovement(position, actions, state)
  return {
    position,
    onClick: movement.action,
    error: movement.forbidden
  }
}

function getMovement (position, actions, {chips, passCount}) {
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
        const callerTeam = caller.team
        const chipsAroundPosition = position.around(chips)
          .filter(({team}) => callerTeam === team)
        const chipsAroundBall = caller.position.around(chips)
          .filter(({team}) => callerTeam === team)
        return caller.isBall() &&
          chipsAroundBall.length === 1 &&
          chipsAroundPosition.length === 1 &&
          chipsAroundPosition[0] === chipsAroundBall[0]
      }
    },
    {
      // maxpass
      forbidden: 'max passes reached',
      validation: () => (
        passCount === 3 &&
        caller.isBall() &&
        position.owner(chips) === caller.team
      )
    },
    {
      action: () => actions.passBall(position),
      validation: () => (
        caller.isBall() &&
        position.owner(chips) === caller.team
      )
    },
    {
      action: () => actions.moveBall(position),
      validation: () => (
        caller.isBall() &&
        position.isBonus() &&
        position.field() === caller.team
      )
    },
    {
      action: () => actions.moveBallToBonus(position),
      validation: () => (
        caller.isBall() &&
        position.isBonus() &&
        position.field() !== caller.team
      )
    },
    {
      action: () => actions.score(position, switchTeam(position.field())),
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
