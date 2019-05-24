export type Team = string

type Piece = {
  team: Team | 'ball'
  keeper: boolean
}

type Pieces = { [key: string]: Piece }

const redPiece: Piece = {
  team: 'red',
  keeper: false
}
const bluePiece: Piece = { ...redPiece, team: 'blue' }

export const pieces: Pieces = {
  R1: { ...redPiece, keeper: true },
  R2: redPiece,
  R3: redPiece,
  R4: redPiece,
  R5: redPiece,
  B1: { ...bluePiece, keeper: true },
  B2: bluePiece,
  B3: bluePiece,
  B4: bluePiece,
  B5: bluePiece,
  ball: { team: 'ball', keeper: false }
}

export function getPiece(id: string): Piece {
  return pieces[id]
}
