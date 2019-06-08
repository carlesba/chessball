import * as React from 'react'
import { initialState, getWinner } from './Entities/GameState'
import { Position } from './Entities/Position'
import { goal } from './Entities/Board'
import selectPieceAction from './Actions/selectPiece'
import movePieceAction from './Actions/movePiece'
import kickOff from './Actions/kickOff'
import Board from './components/Board'
import Movements from './components/Movements'
import Pieces from './components/Pieces'
import PanelStatus, { PANEL_HEIGHT } from './components/PanelStatus/index'
import GoalBanner from './components/GoalBanner'
import Help from './components/Help'
import styled from '@emotion/styled'
import GameOver from './components/GameOver'

const BACKGROUND = '#2f3133'
const TEXT = '#FBF8F8'

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: ${BACKGROUND};
  overflow: hidden;
  position: relative;
  color: ${TEXT};
`
const BoardCenterer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - ${PANEL_HEIGHT}px);
`

const App = () => {
  const [state, update] = React.useState(initialState)
  const [goalBanner, setGoalBanner] = React.useState(null)
  function selectPiece(id: string) {
    console.log('selectPiece', state, id)
    update(selectPieceAction(state, id))
  }
  function movePiece(position: Position) {
    console.log('movePiece', state, position)
    const teamDidGoal = goal(position)
    update(movePieceAction(state, position))
    if (teamDidGoal) {
      setGoalBanner(teamDidGoal)
    }
  }
  function hideBanner() {
    console.log('hideBanner', state)
    setGoalBanner(null)
    update(kickOff(state))
  }
  function restart() {
    console.log('restart', state)
    update(initialState)
    setGoalBanner(null)
  }
  const winner = getWinner(state)
  return (
    <Wrapper>
      {winner && (
        <GameOver team={winner} score={state.score} onRestart={restart} />
      )}
      <PanelStatus
        score={state.score}
        moves={state.moves}
        passes={state.passes}
      />
      <BoardCenterer>
        <Board>
          {goalBanner && <GoalBanner team={goalBanner} onClick={hideBanner} />}
          <Movements value={state.movements} onMovePiece={movePiece} />
          <Pieces
            positions={state.positions}
            selectedPiece={state.selectedPiece}
            ballOwner={state.ballOwner}
            onSelectPiece={selectPiece}
            teamMoving={state.moves}
          />
        </Board>
      </BoardCenterer>
      <Help />
    </Wrapper>
  )
}

export default App
