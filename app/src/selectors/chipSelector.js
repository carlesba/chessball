import {freeze} from 'freezr'

export default function chipSelector (state, {selectChip}) {
  return state.chips.list.map((chip) =>
    freeze({
      key: chip.id,
      type: chip.type,
      team: chip.team,
      selectable: chip.selectable,
      isSelected: chip.isSelected,
      isKeeper: chip.isKeeper,
      position: chip.position,
      onClick: () => {
        if (chip.isSelected) return chip.isBall() ? null : selectChip()
        if (chip.selectable) return selectChip(chip.id)
      }
    })
  )
}
