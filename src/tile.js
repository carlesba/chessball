import {get, set} from 'immootable'

export const isEnabled = tile => get('enabled', tile)
export const isSelected = tile => get('selection', tile)
export const selectTile = set('selection', true)
