import expect from 'expect'
import reducers from 'src/reducers'

describe('reducers', () => {
  it('test', () => {
    expect(reducers().chips).toBe(2)
  })
})
