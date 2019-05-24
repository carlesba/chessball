import * as React from 'react'
import styled from '@emotion/styled'
import { pieces as PiecesConfig, Team } from '../Entities/Pieces'
import { Place, unit } from './Board'
import { BLUE_BG, BLUE, RED, RED_BG, BALL_BG } from './colors'

interface PieceProps {
  selectable: boolean
  selected: boolean
  children?: any
}
export const PieceView = styled.div`
  width: ${unit};
  height: ${unit};
  ${(p: PieceProps) => {
    let size = 0.95
    if (p.selectable) {
      size = 1
    }
    if (p.selected) {
      size = 1.3
    }
    return `transform: scale(${size});`
  }}
  border-radius: 50%;
  position: absolute;
  transition: 200ms ease-out left, 200ms ease-out top,
    200ms box-shadow cubic-bezier(0.22, 0.61, 0.36, 1), 200ms width ease-out,
    200ms height ease-out, 200ms transform ease-out;
  box-shadow: ${(p: PieceProps) => {
    if (p.selected) return 'inset 0 0 0 3px rgba(255, 165, 0, 0.8)'
    if (p.selectable) return 'inset 0 0 0 2px rgba(255, 165, 0, 0.8)'
    return ''
  }};
  z-index: ${(p: PieceProps) => (p.selected ? 40 : 20)};
`

interface PlayerProps {
  team: Team
  selectable: boolean
  selected: boolean
}
const Player = styled(PieceView)`
  ${(p: PlayerProps) => {
    switch (p.team) {
      case 'blue':
        return `background: ${BLUE_BG}; color: ${BLUE}`
      case 'red':
        return `background: ${RED_BG}; color: ${RED};`
      default:
        return ''
    }
  }};
`
const Keeper = styled(Player)`
  position: relative;
  &::after {
    pointer-events: none;
    content: ' ';
    border: 10px solid transparent;
    ${(p: PlayerProps) => {
      if (p.team === 'red')
        return `
        border-bottom-color: currentColor;
        transform: rotate(15deg);
        top: 5px;
      `
      if (p.team === 'blue')
        return `
        border-top-color: currentColor;
        transform: rotate(-15deg);
        bottom: 5px;
      `
    }}
    width: 0;
    height: 0;
    position: absolute;
    left: -20px;
  }
  &::before {
    pointer-events: none;
    content: ' ';
    border: 10px solid transparent;
    ${(p: PlayerProps) => {
      if (p.team === 'red')
        return `
        border-bottom-color: currentColor;
        transform: rotate(-15deg);
        top: 5px;
      `
      if (p.team === 'blue')
        return `
        border-top-color: currentColor;
        transform: rotate(15deg);
        bottom: 5px;
      `
    }}
    width: 0;
    height: 0;
    position: absolute;
    right: -20px;
  }
`
const Ball = styled(PieceView)`
  background: ${BALL_BG};
`

const Pieces = ({
  positions,
  selectedPiece,
  ballOwner,
  onSelectPiece,
  teamMoving
}) => {
  return (
    <div>
      {Object.keys(positions).map(pieceId => {
        const piece = PiecesConfig[pieceId]
        const selectable =
          (ballOwner && pieceId === 'ball') ||
          (!ballOwner && piece.team === teamMoving)
        const position = positions[pieceId]

        if (pieceId === 'ball')
          return (
            <Place key={pieceId} position={position}>
              <Ball
                selected={selectedPiece === pieceId}
                selectable={selectable}
                onClick={() => selectable && onSelectPiece(pieceId)}
              />
            </Place>
          )
        if (piece.keeper) {
          return (
            <Place key={pieceId} position={position}>
              <Keeper
                team={piece.team}
                selected={selectedPiece === pieceId}
                selectable={selectable}
                onClick={() => selectable && onSelectPiece(pieceId)}
              />
            </Place>
          )
        }
        return (
          <Place key={pieceId} position={position}>
            <Player
              team={piece.team}
              selected={selectedPiece === pieceId}
              selectable={selectable}
              onClick={() => selectable && onSelectPiece(pieceId)}
            />
          </Place>
        )
      })}
    </div>
  )
}

export default Pieces
