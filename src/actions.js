import { Left, Right, Some, Identity } from 'monet'
import * as Chip from './chip'
import * as Status from './status'
import * as Game from './game'

const selectAndHighlightBall = game =>
  Some(game)
    .map(Game.selectBall)
    .map(Game.enableTiles)
    .orSome(game)

const eitherSelectedChipMatchesIndex = index => game =>
  Game.getSelectedChip(game)
    .cata(
      _ => Right(game),
      chip => Chip.checkIndex(index)(chip)
        ? Left(chip)
        : Right(game)
    )

// index -> game -> Either(game)
const eitherApplyMove = index => game => Right(game)
  .map(Game.isEnabled(index))
  .flatMap(enabled => enabled ? Left(game) : Right(game))
  .leftMap(Game.moveSelectedChipTo(index))
  .leftMap(Game.cleanHighlights)
  .leftMap(Status.logMovement(index))
  .cata(
    g => Game.ballHasOwner(g)
      ? Left(selectAndHighlightBall(g))
      : Left(Status.toggleTurn(g)),
    Identity
  )

const eitherUnselectChip = index => game => Right(game)
  .flatMap(eitherSelectedChipMatchesIndex(index))
  .leftMap(Chip.deselect)
  .leftMap(Game.setChip(game))

// index -> game -> Either(game)
const eitherSelectChip = index => game => Right(game)
  .map(Game.getChipByIndex(index))
  .flatMap(chip => chip && Game.isChipTeamTurn(game, chip) ? Left(chip) : Right(game))
  .leftMap(Chip.select)
  .leftMap(Game.setChip(game))
  .leftMap(g => Some(game)
    .flatMap(Game.getSelectedChip)
    .map(Chip.deselect)
    .map(Game.setChip(g))
    .orSome(g)
  )
  .leftMap(Game.enableTiles)

export const selectTile = index => game => Right(game)
  .flatMap(eitherApplyMove(index))
  .flatMap(eitherUnselectChip(index))
  .flatMap(eitherSelectChip(index))
  .map(Game.cleanHighlights)
  .cata(x => x, x => x)
