import switchTeam from 'src/lib/switchTeam'
export const createMovement = (position, actions, state) => {
  const movement = getMovement(position, actions, state)
  if (movement.forbidden) console.log(position, movement.forbidden)
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
      forbidden: 'cannot move through other team player',
      validation: () => {
        if (caller.isBall()) return false
        const chipsInBetween = chips
          .getChipsInBetween(caller.position, position)
          .filter((chip) => chip.team !== caller.team)
        return chipsInBetween.length > 0
      }
    },
    {
      forbidden: 'keeper hand position',
      validation: () => {
        if (caller.isBall()) return false
        if (caller.isKeeper && position.distanceTo(caller.position) === 1) return false
        return position.isIn(chips.getKeepersHandsPositions())
      }
    },
    {
      forbidden: 'player can\'t go behind other team\'s keeper',
      validation: () => {
        if (caller.isBall()) return false
        return chips
          .getKeepersSaves(switchTeam(caller.team))
          .filter((p) => p.isInBetween(caller.position, position)).length > 0
      }
    },
    {
      forbidden: 'ball can\'t go through keeper',
      validation: () => {
        if (caller.isPlayer()) return false
        return chips
          .getKeepersSaves()
          .filter((p) => p.isInBetween(caller.position, position)).length > 0
      }
    },
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
        passCount === 4 &&
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
