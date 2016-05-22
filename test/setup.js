var Module = require('module')
var originalRequire = Module.prototype.require

Module.prototype.require = function () {
  Object.keys(arguments).forEach((key) => {
    const value = arguments[key]
    if (value.slice(0, 4) === 'src/') {
      arguments[key] = process.cwd() + '/app/' + value
    } else {
      arguments[key] = value
    }
  })
  return originalRequire.apply(this, arguments)
}
