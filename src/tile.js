import {get, has, set} from 'immootable'

export const getChipTeam = tile => get(['chip', 'team'], tile)
export const hasChip = tile => has('chip', tile)
export const isEnabled = tile => get('enabled', tile)
export const isSelected = tile => get('selection', tile)
export const selectTile = set('selection', true)
