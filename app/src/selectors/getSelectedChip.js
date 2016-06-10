
export default function getSelectedChip (state) {
  return state.chips.find(({isSelected}) => isSelected)
}
