import * as React from 'react'
import Score from './Score'
import Tips from './Tips'
import styled from '@emotion/styled'

export const PANEL_HEIGHT = 120

const PanelWrapper = styled.div`
  display: flex;
  width: 100%;
  padding: 0 10px;
  box-sizing: border-box;
  justify-content: space-evenly;
`
const PanelSection = styled.div`
  height: ${PANEL_HEIGHT}px;
  box-sizing: border-box;
  padding-top: 50px;
`
const PanelStatus = ({ score, moves, passes }) => {
  return (
    <PanelWrapper>
      <PanelSection>
        <Score value={score} />
      </PanelSection>
      <PanelSection>
        <Tips moves={moves} passes={passes} />
      </PanelSection>
    </PanelWrapper>
  )
}
export default PanelStatus
