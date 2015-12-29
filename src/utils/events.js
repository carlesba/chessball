export const observe = (element, evt, cb) => {
  element['addEventListener'](evt, cb)
  return () => element['removeEventListener'](evt, cb)
}

export const once = (element, evt, cb) => {
  const dispose = observe(element, evt, () => {
    cb.apply(this, arguments)
    dispose()
  })
  return dispose
}
