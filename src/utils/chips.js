import {update} from './immutable'

export const findBall = (chips) => chips.find(chip => chip.kind === 'ball')

export const highlight = (chip) => update(chip, {highlighted: true})

export const unhighlight = (chip) => update(chip, {highlighted: false})
