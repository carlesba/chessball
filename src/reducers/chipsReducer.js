
const initialChips = [{
  chipId: 0,
  kind: 'ball'
}, {
  chipId: 1,
  kind: 'player',
  team: 0
}, {
  chipId: 2,
  kind: 'player',
  team: 1
}]

const chips = (state = initialChips, action) => { return state }

export default chips
