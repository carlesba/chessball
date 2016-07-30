import {freeze} from 'freezr'

export default function chipSelector (state, {selectChip}) {
  return state.chips.list.map((chip) =>
    freeze({
      key: chip.id,
      type: chip.type,
      team: chip.team,
      selectable: chip.selectable,
      isSelected: chip.isSelected,
      position: chip.position,
      onClick: () => {
        if (chip.isSelected) {
          selectChip()
        } else if (chip.selectable) {
          selectChip(chip.id)
        }
      }
    })
  )
}