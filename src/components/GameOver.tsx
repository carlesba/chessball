import * as React from 'react'
import styled from '@emotion/styled'
import { RED_BG, BLUE_BG } from './colors'
import { Team } from '../Entities/Pieces'

interface WrapperProps {
  color: string
}
const Wrapper = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background: ${(p: WrapperProps) => p.color};
  z-index: 50;
  p {
    font-weight: bold;
    font-style: italic;
    font-size: 100px;
    font-family: Helvetica, sans-serif;
    text-transform: uppercase;
    transform: skew(0, 168deg);
    color: #d2d2d2;
  }
  button {
    background: transparent;
    outline: none;
    color: #d2d2d2;
    border: 5px solid currentColor;
    padding: 25px;
    margin-top: 50px;
    font-size: 30px;
    border-radius: 20px;
    text-transform: uppercase;
    font-weight: bold;
    cursor: pointer;
    font-style: italic;
  }
`

interface GameOverProps {
  team: Team
  score: number[]
  onRestart: () => void
}
const GameOver = ({ team, score, onRestart }: GameOverProps) => {
  let color
  if (team === 'red') {
    color = RED_BG
  }
  if (team === 'blue') {
    color = BLUE_BG
  }
  return (
    <Wrapper color={color}>
      <p>{team}s</p>
      <p>win!</p>
      <p>
        {score[0]}-{score[1]}
      </p>
      <button onClick={onRestart}>Play Again</button>
    </Wrapper>
  )
}

export default GameOver
