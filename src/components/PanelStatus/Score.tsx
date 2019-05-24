import * as React from 'react'
import styled from '@emotion/styled'

const Box = styled.div`
  font-family: Helvetica, sans-serif;
  text-align: center;
  flex: 1;
  margin: 0 5px;
`
const Team = styled.div`
  font-size: 12px;
  font-weight: bold;
  height: 12px;
  text-transform: uppercase;
  font-style: italic;
`
const TeamScore = styled.div`
  font-size: 60px;
  height: 60px;
  line-height: 60px;
  font-weight: bold;
`
const Wrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`

const Score = ({ value }) => {
  return (
    <Wrapper>
      <div>
        <Box>
          <Team color="red">Reds</Team>
          <TeamScore>{value[0]}</TeamScore>
        </Box>
      </div>
      <div>
        <Box>
          <Team color="blue">Blues</Team>
          <TeamScore>{value[1]}</TeamScore>
        </Box>
      </div>
    </Wrapper>
  )
}

export default Score
