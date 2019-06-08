import * as React from 'react'
import styled from '@emotion/styled'
import { BonusSquare } from './Board'

interface CornerProps {
  bottom?: boolean
  close?: boolean
}
const Corner = styled.a`
  position: fixed;
  right: 10px;
  top: 10px;
  font-size: 15px;
  font-family: Helvetica, sans-serif;
  font-weight: bold;
  border-radius: 50%;
  width: 16px;
  height: 16px;
  text-align: center;
  line-height: ${(p: CornerProps) => (p.close ? 17 : 20)}px;
  box-shadow: 0 0 0 2px currentColor;
  text-decoration: none;
  &:link {
    color: currentColor;
  }
`
const Page = styled.div`
  font-family: Helvetica, sans-serif;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: #2f3133;
  font-size: 20px;
  padding: 0 30px;
  box-sizing: border-box;
  z-index: 40;
  overflow: scroll;
  color: #cacaca;

  h1 {
    font-size: 30px;
    margin: 30px;
    text-align: center;
    text-transform: uppercase;
    font-weight: bold;
    color: #f0f0f0;
  }
  h2 {
    font-size: 22px;
    margin: 40px 20px 20px;
    color: #f0f0f0;
  }
  p {
    font-size: 14px;
    margin: 10px 30px 15px;
    line-height: 1.5em;
  }
  p:last-child {
    padding-bottom: 60px;
  }
  strong {
    font-weight: bold;
    color: white;
  }
`

const Help = () => {
  const [shown, update] = React.useState(false)
  const showHelp = () => update(true)
  const closeHelp = () => update(false)

  if (shown) {
    return (
      <Page onClick={closeHelp}>
        <Corner bottom title="close help" href="javascript: void(0)" close>
          ✕
        </Corner>
        <h1>How to play</h1>

        <h2>Game Sequence</h2>

        <p>
          Each team has to move the ball into other's team goal using their 5
          pieces (one keeper and four players). First team that scores 2 goals
          wins.
        </p>

        <p>
          On your turn, you can move any of your pieces one time. Selectable
          pieces will be highlighted with an orange border. Selecting a piece
          will show the possible movements.
        </p>

        <p>
          After moving the piece, the turn is over unless the ball is owned by
          your team.
        </p>

        <p>
          The ball is owned when a team has more pieces around than the other
          one.
        </p>

        <p>
          When the ball is owned has to be moved by the team that owns it. No
          other piece can be moved.
        </p>

        <p>
          Moving the ball to a position owned by the same team is considered a{' '}
          <strong>pass</strong>.
        </p>

        <p>
          Each team can do <strong>3 passes on each turn</strong>. After the
          last possible pass, the ball has to be placed in a position where it
          won't be owned by anyone. Then the turn is over and the other team
          will move.
        </p>

        <p>
          When the ball is place in a <strong>goal</strong>, pieces will return
          to the original position and the team that got the goal will move.
        </p>

        <h2>Movements</h2>

        <p>
          Players and Keepers move 2 squares on any direction unless another
          piece is on the way. They can't pass over other pieces.
        </p>

        <p>
          Ball moves 4 squares on any direction and can pass over players and
          keepers outside of their areas. A keeper can stop the ball when is in
          its area. Positions on the left and right from the keeper (the hands
          of the keeper) can also stop the ball when they are inside of the
          area. A keeper's hand outside of the are won't stop the ball.
        </p>

        <h2>Bonus Squares</h2>

        <div style={{ marginLeft: 20 }}>
          <BonusSquare dark />
        </div>

        <p>
          Squares with a dot are <strong>Bonus Squares</strong>.
        </p>

        <p>
          There are 14 Bonus Squares in the board: 5 in front of each Goal
          Square and 1 on each corner.
        </p>

        <p>
          Placing the ball in a Bonus Square gives an extra movement to the team
          that did it.
        </p>
      </Page>
    )
  } else {
    return (
      <Corner
        title="show help"
        bottom
        href="javascript: void(0)"
        onClick={showHelp}
      >
        ?
      </Corner>
    )
  }
}

export default Help
