import * as React from 'react'
import styled from '@emotion/styled'
import { Position } from '../Entities/Position'
import { Place, unit } from './Board'

const Movement = styled.div`
  width: ${unit};
  height: ${unit};
  border-radius: 80%;
  background: #c1ffff;
  opacity: 0.4;
  position: absolute;
  z-index: 20;
`

const Movements = ({ value, onMovePiece }) => {
  return (
    <div>
      {value.map((movement: Position, index: number) => {
        return (
          <Place
            key={`${index}${movement[0]}${movement[1]}`}
            position={movement}
          >
            <Movement onClick={() => onMovePiece(movement)} />
          </Place>
        )
      })}
    </div>
  )
}

export default Movements
