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

  getBallPositionOwner (chips) {
    return this.getBall().position.owner(chips)
  },

  getSelectedChip () {
    return this.list.find((chip) => chip.isSelected)
  },

  getSelectableTeam () {
    return this.list.find(({selectable}) => selectable).team
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
      if (chip.isBall()) return chip
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
  }
}

export function createChips (rawData) {
  const list = freeze(rawData.map(createChip))
  return freeze({
    list,
    ...chipsPrototype
  })
}
