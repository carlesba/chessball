import expect from 'expect'
import objectComposer from 'src/lib/objectComposer'

describe('objectComposer', () => {
  describe('object in argument', () => {
    it('merges all arguments', () => {
      const argA = {a: 1}
      const argB = {b: 1}
      const argC = {a: 2}
      const expected = Object.assign({}, argA, argB, argC)
      const target = objectComposer(argA, argB, argC)
      Object.keys(expected).forEach((key) => {
        expect(expected[key]).toBe(target[key])
      })
    })
  })
  describe('array in argument', () => {
    it('merges the first element of the array when the second is true', () => {
      const argA = {a: 1}
      const argB = {b: 1}
      const argC = {a: 2}
      const expected = Object.assign({}, argA, argC)
      const target = objectComposer(
        [argA, true],
        [argB, false],
        [argC, true])
      Object.keys(expected).forEach((key) => {
        expect(expected[key]).toBe(target[key])
      })
    })
  })
})
