import * as React from 'react'
import Score from './Score'
import Tips from './Tips'
import styled from '@emotion/styled'

export const PANEL_HEIGHT = 60

const PanelWrapper = styled.div`
  display: flex;
  width: 100%;
  padding: 0 10px;
  box-sizing: border-box;
  justify-content: space-around;
`
const PanelSection = styled.div`
  height: ${PANEL_HEIGHT}px;
  box-sizing: border-box;
`
const Title = styled.h1`
  font-size: 20px;
  font-family: Helvetica, sans-serif;
  font-weight: bold;
  font-style: italic;
`
const PanelStatus = ({ score, moves, passes }) => {
  return (
    <PanelWrapper>
      <PanelSection>
        <Title>mastergoal</Title>
        <Tips moves={moves} passes={passes} />
      </PanelSection>
      <PanelSection>
        <Score value={score} />
      </PanelSection>
    </PanelWrapper>
  )
}
export default PanelStatus
