import * as Position from './Position'

test('Sum positions', () => {
  expect(Position.sum([4, 3], [1, -1])).toEqual([5, 2])
})

test('Multiply positions', () => {
  expect(Position.multiply([4, 3], 2)).toEqual([8, 6])
})

test('Get whether positions are the same', () => {
  expect(Position.equals([1, 2], [1, 1])).toBe(false)
  expect(Position.equals([1, 2], [1, 2])).toBe(true)
})

test('areNeighbors is true when positions are next to each other', () => {
  const p = [5, 5]
  expect(Position.areNeighbors(p, [4, 4])).toBeTruthy()
  expect(Position.areNeighbors(p, [4, 5])).toBeTruthy()
  expect(Position.areNeighbors(p, [4, 6])).toBeTruthy()
  expect(Position.areNeighbors(p, [5, 4])).toBeTruthy()
  expect(Position.areNeighbors(p, [5, 6])).toBeTruthy()
  expect(Position.areNeighbors(p, [6, 4])).toBeTruthy()
  expect(Position.areNeighbors(p, [6, 5])).toBeTruthy()
  expect(Position.areNeighbors(p, [6, 6])).toBeTruthy()
  expect(Position.areNeighbors(p, [5, 5])).toBeFalsy()
  expect(Position.areNeighbors(p, [5, 8])).toBeFalsy()
  expect(Position.areNeighbors(p, [4, 7])).toBeFalsy()
})
