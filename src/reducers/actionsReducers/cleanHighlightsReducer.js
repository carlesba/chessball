export const cleanHighlightsReducer = (tiles) => {
  return tiles.map(tile => Object.assign({}, tile, {highlighted: null}))
}
