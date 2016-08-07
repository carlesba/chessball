import {freeze} from 'freezr'
import {createChip} from './chip'

const chipsPrototype = {
  getChip (id) {
    return this.list.find((chip) => chip.id === id)
  },

  getChipIndex (id) {
    return this.list.findIndex((chip) => chip.id === id)
  },

  getBall () {
    return this.list.find((chip) => chip.isBall())
  },

  getPlayers () {
    return this.list.filter((chip) => chip.isBall())
  },

  getPositions () {
    return this.list.map(({position}) => position)
  },

  getBallOwner () {
    return this.getBall().team
  },

  getBallPosition () {
    return this.getBall().position
  },

  getBallPositionOwner (chips) {
    return this.getBall().position.owner(chips)
  },

  getKeepersInArea (team) {
    return this.list
      .filter((chip) => chip.isKeeper)
      .filter((chip) => team ? chip.team === team : chip)
      .filter((chip) => chip.position.isArea() && chip.position.field() === chip.team)
  },

  getKeepersHandsPositions (team) {
    return this.getKeepersInArea(team)
      .reduce(
        (hands, keeper) => hands.concat(keeper.keeperHands()),
        []
      )
  },

  getKeepersSaves (team) {
    const keeperPos = this.getKeepersInArea(team).map(({position}) => position)
    const handsPos = this.getKeepersHandsPositions(team)
    return [...keeperPos, ...handsPos]
  },

  getSelectedChip () {
    return this.list.find((chip) => chip.isSelected)
  },

  getSelectableTeam () {
    return this.list.find(({selectable}) => selectable).team
  },

  getChipsInBetween (a, b) {
    return this.list.filter((chip) => chip.position.isInBetween(a, b))
  },

  setChip (chipId, callback) {
    const index = this.getChipIndex(chipId)
    const newChips = this.list.updateIn(
      [index],
      callback
    )
    return this.set('list', newChips)
  },

  setBallOwner (team) {
    return this.setChip(this.getBall().id, (ball) => ball.set('team', team))
  },

  setTeamSelectable (team) {
    const newChips = this.list.map((chip) => {
      if (chip.isBall()) return chip.setSelectable(false)
      else return chip.setSelectable(chip.team === team)
    })
    return this.set('list', newChips)
  },

  setBallSelectable () {
    const newChips = this.list.map(
      (chip) => chip.setSelectable(chip.isBall())
    )
    return this.set('list', newChips)
  },

  moveChip (chipId, position) {
    return this.setChip(chipId, (chip) => chip.move(position))
  },

  moveBall (position) {
    const chipId = this.getBall().id
    return this.moveChip(chipId, position)
  },

  unselectChip () {
    const selectedChip = this.getSelectedChip()
    if (!selectedChip) return this
    return this.setChip(
      selectedChip.id,
      (chip) => chip.unselect()
    )
  },

  selectChip (chipId) {
    return this.setChip(chipId, (chip) => chip.select())
  },

  isGoal () {
    return this.getBallPosition().isGoal()
  }
}

export function createChips (rawData) {
  const list = freeze(rawData.map(createChip))
  return freeze({
    list,
    ...chipsPrototype
  })
}
