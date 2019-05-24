import * as React from 'react'
import styled from '@emotion/styled'
import { RED, BLUE } from '../colors'

const Row = styled.div`
  font-family: Helvetica, sans-serif;
  font-size: 20px;
  line-height: 30px;
  box-sizing: border-box;
`
const Wrapper = styled.div`
  text-align: right;
`
const Team = styled.span`
  text-transform: uppercase;
  font-weight: bold;
  font-style: italic;
  color: ${p => p.color};
  margin-right: 0.5em;
`
const Text = styled.span`
  font-size: 16px;
`
const Passes = styled.span``

const Tips = ({ moves, passes }) => {
  const color = moves === 'red' ? RED : BLUE
  return (
    <Wrapper>
      <Row>
        <Team color={color}>{moves}</Team>
        <Text> moves</Text>
      </Row>
      {passes > 0 && (
        <Row>
          <Passes>{3 - passes}</Passes>
          <Text> passes left</Text>
        </Row>
      )}
    </Wrapper>
  )
}

export default Tips
