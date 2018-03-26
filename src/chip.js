import {set} from 'immootable'
import { RED } from './constants'

export const isRed = chip => chip.team === RED
export const select = chip => set('selected', true, chip)
export const deselect = chip => set('selected', false, chip)
