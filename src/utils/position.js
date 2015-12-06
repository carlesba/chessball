import { TILE_WIDTH } from './constants'

export const getReferencePoints = (domNode) => {
  const {top, left} = domNode.parentNode.getBoundingClientRect()
  return {
    topRef: top,
    leftRef: left
  }
}

export const calculateTiles = ({translateX, translateY}) => {
  return {
    cols: Math.round(translateX / TILE_WIDTH),
    rows: Math.round(translateY / TILE_WIDTH)
  }
}
