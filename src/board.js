import React from 'react'
import styled from 'styled-components'
import { Left, Right, Just, Identity, Some } from 'monet'
import { isRed } from './chip'
import * as Game from './game'

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
  border-color: black;
  border-style: solid;
  border-width: ${p => p.value.selected ? '3px' : '0'};
`

const renderPosition = ({row, col}, index) => (
  <div>
    <div>{`${row},${col}`}</div>
    <div>{index}</div>
  </div>
)

const renderChip = (game, index) => {
  const chip = Game.getChipByIndex(index)(game)
  return !chip
    ? undefined
    : <Chip value={chip} />
}

const Board = ({game, onSelect}) => {
  return (
    <div>
      {Game.getTiles(game).map((tile, index) =>
        <Tile
          key={index}
          value={tile}
          onClick={_ => onSelect(index)}
        >
          {renderPosition(tile, index)}
          {renderChip(game, index)}
        </Tile>
      )}
    </div>
  )
}

export default Board
