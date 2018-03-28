import {
  rowFromIndex, colFromIndex, positionFromIndex,
  normalizePosition,
  normalizeRow
} from './position'
import { BLUE, COLUMNS, RED, ROWS } from './constants'
import { Either, Left, Right } from 'monet'
import {log} from 'immootable'

const INITIAL_CHIPS = [
  {id: 'r1', index: 27, team: RED, keeper: true},
  {id: 'r2', index: 47, team: RED},
  {id: 'r3', index: 51, team: RED},
  {id: 'r4', index: 68, team: RED},
  {id: 'r5', index: 74, team: RED},
  {id: 'b1', index: 137, team: BLUE, keeper: true},
  {id: 'b2', index: 124, team: BLUE},
  {id: 'b3', index: 128, team: BLUE},
  {id: 'b4', index: 101, team: BLUE},
  {id: 'b5', index: 107, team: BLUE}
]

const fieldTeamFromIndex = index =>
  rowFromIndex(index)
    .map(row => row < ROWS / 2)
    .map(isRed => isRed ? RED : BLUE)

// position -> Either(position)
const checkRowArea = position => Right(position.row)
  .map(normalizeRow)
  .flatMap(row => row < 1 ? Left(row) : Right(row))
  .flatMap(row => row > 4 ? Left(row) : Right(position))

// position -> Either(position)
const checkColArea = position => Either.of(position.col)
  .flatMap(col => col < 1 ? Left(col) : Right(col))
  .flatMap(col => col > COLUMNS - 2 ? Left(col) : Right(position))

// position -> Boolean
const isArea = position =>
  Either.of(position)
    .flatMap(checkRowArea)
    .flatMap(checkColArea)
    .cata(_ => false, _ => true)

// index -> Maybe(Boolean)
const areaFromIndex = index => positionFromIndex(index).map(isArea)

const isGoal = position => Right(position)
  .map(normalizePosition)
  .flatMap(p => p.row > 0 ? Left() : Right(p))
  .flatMap(p => p.col < 3 ? Left() : Right(p))
  .cata(_ => false, _ => true)

const isOutside = position => Right(position)
  .map(normalizePosition)
  .flatMap(p => p.row > 0 ? Left() : Right(p))
  .flatMap(p => p.col > 3 ? Left() : Right(p))
  .cata(_ => false, _ => true)

const isBonus = position => Right(position)
  .map(normalizePosition)
  .flatMap(p => p.row !== 1 ? Left() : Right(p))
  .flatMap(p => (p.col === 1 || p.col === 2) ? Left() : Right(p))
  .cata(_ => false, _ => true)

const goalFromIndex = index => positionFromIndex(index).map(isGoal)

const outsideFromIndex = index => positionFromIndex(index).map(isOutside)

const bonusFromIndex = index => positionFromIndex(index).map(isBonus)

const tileFromIndex = index => ({
  row: rowFromIndex(index).some(),
  col: colFromIndex(index).some(),
  field: fieldTeamFromIndex(index).some(),
  area: areaFromIndex(index).some(),
  goal: goalFromIndex(index).some(),
  outside: outsideFromIndex(index).some(),
  bonus: bonusFromIndex(index).some()
})

const createIndexArray = size =>
  Array(size).join(',').split(',').map((_, i) => i)

const createTiles = _ => createIndexArray(165).map(tileFromIndex)

export const createGame = _ => ({
  currentPlayer: RED,
  chips: INITIAL_CHIPS,
  movements: [],
  highlights: [],
  score: [0, 0],
  tiles: createTiles()
})
