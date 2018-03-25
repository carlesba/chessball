import React from 'react'
import styled from 'styled-components'
import { Left, Right, Just } from 'monet'
import { isRed } from './chip'

const whenTileIs = attribute => value => x =>
  x[attribute] ? Left(value) : Right(x)

const colorFromTile = tile => Right(tile)
  .flatMap(whenTileIs('selection')('pink'))
  .flatMap(whenTileIs('bonus')('yellow'))
  .flatMap(whenTileIs('area')('#006000'))
  .flatMap(whenTileIs('goal')('#666666'))
  .flatMap(whenTileIs('outside')('white'))
  .cata(Just, _ => Just('green'))
  .some()

const colorFromChip = chip => Right(chip)
  .flatMap(c => isRed(c) ? Left('red') : Right('blue'))
  .cata(Just, Just)
  .some()

const Tile = styled.div`
  width: 50px;
  height: 50px;
  background: ${p => colorFromTile(p.value)};
  outline: 2px solid black;
  float: left;
  ${p => p.value.col === 0 && 'clear: left;'}
`

const Chip = styled.div`
  width: 40px;
  height: 40px;
  margin: 5px;
  border-radius: ${p => p.value.keeper ? '30' : '50'}%;
  background: ${p => colorFromChip(p.value)};
`

const renderPosition = ({row, col}, index) => (
  <div>
    <div>{`${row},${col}`}</div>
    <div>{index}</div>
  </div>
)

const Board = ({tiles, onSelect}) => {
  return (
    <div>
      {tiles.map((tile, index) =>
        <Tile
          key={index}
          value={tile}
          onClick={_ => onSelect(index)}
        >
          {renderPosition(tile, index)}
          {tile.chip && <Chip value={tile.chip} />}
        </Tile>
      )}
    </div>
  )
}

export default Board
