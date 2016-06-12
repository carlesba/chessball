
export default function selectedChipSelector (state) {
  return state.chips.find(({isSelected}) => isSelected)
}
