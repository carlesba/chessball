const isAllowed = ({row, col}, list) => {
  return list.findIndex((p) => {
    return p.row === row && p.col === col
  }) >= 0
}

export const moveChipReducer = (chips, action, highlights = []) => {
  const {nextPosition, chipId} = action
  if (isAllowed(nextPosition, highlights)) {
    return chips.map((chip) => {
      if (chip.chipId === chipId) {
        return Object.assign({}, chip, nextPosition)
      } else {
        return chip
      }
    })
  } else {
    return chips
  }
}
