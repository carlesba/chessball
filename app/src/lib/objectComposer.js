import {freeze} from 'freezr'

export default function objectComposer (...styles) {
  return styles.reduce(
    (acc, style) => {
      if (Array.isArray(style)) {
        return style[1] === true
          ? acc.merge(style[0])
          : acc
      } else {
        return acc.merge(style)
      }
    },
    freeze({})
  )
}
