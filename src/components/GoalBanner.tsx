import * as React from 'react'
import styled from '@emotion/styled'
import { RED_BG, BLUE_BG } from './colors'

const GoalBannerWrapper = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${p => p.color};
  z-index: 30;
`
const Big = styled.h2`
  font-weight: bold;
  font-style: italic;
  font-size: 100px;
  font-family: Helvetica, sans-serif;
  text-transform: uppercase;
  letter-spacing: -10px;
  transform: skew(-10deg, 168deg);
  color: #d2d2d2;
`
const GoalBanner = ({ team, onClick }) => {
  const color = team === 'red' ? RED_BG : BLUE_BG
  return (
    <GoalBannerWrapper color={color} onClick={onClick}>
      <Big>Goal!</Big>
    </GoalBannerWrapper>
  )
}

export default GoalBanner
