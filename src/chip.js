import {get, set} from 'immootable'
import { BLUE, RED } from './constants'

export const checkIndex = index => chip => get('index', chip) === index
export const deselect = chip => set('selected', false, chip)
export const getId = get('id')
export const equals = (a, b) => getId(a) === getId(b)
export const isBall = chip => getId(chip) === 'ball'
export const isBlue = chip => chip.team === BLUE
export const isPlayer = chip => getId(chip) !== 'ball'
export const isRed = chip => chip.team === RED
export const isSelected = chip => get('selected', chip)
export const select = chip => set('selected', true, chip)
export const setIndex = index => chip =>
  set('index', index, chip)
export const setTeam = team => chip => set('team', team, chip)
