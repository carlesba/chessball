import * as React from 'react'
import { squares, isEmpty, goal } from '../Entities/Board'
import { Position } from '../Entities/Position'
import styled from '@emotion/styled'

/**
 * Colors
 */
const GRASS = '#414446'
const GRASS_DARK = 'rgba(10, 10, 10, .3)'
const LINES = 'rgba(244, 246, 246, 0.8)'

export function sizeFromUnits(units: number): string {
  return units * 32 + 'px'
}
export const unit = sizeFromUnits(1)

const EmptySquare = styled.div`
  width: ${unit};
  height: ${unit};
  background: transparent;
`
const GoalSquare = styled(EmptySquare)``
interface FieldSquareProps {
  dark: boolean
  children?: JSX.Element
}
const FieldSquare = styled(EmptySquare)`
  ${(p: FieldSquareProps) => (p.dark ? `background: ${GRASS_DARK};` : '')};
  display: inline-flex;
  align-items: center;
  justify-content: center;
`
const BonusDot = styled.div`
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: ${LINES};
  z-index: 10;
  position: relative;
`
export const BonusSquare = ({ dark }) => {
  return (
    <FieldSquare dark={dark}>
      <BonusDot />
    </FieldSquare>
  )
}

interface AreaProps {
  bottom?: boolean
}
const BigArea = styled.div`
  position: absolute;
  box-sizing: border-box;
  width: ${sizeFromUnits(9)};
  height: ${sizeFromUnits(4)};
  border: 2px solid ${LINES};
  left: ${sizeFromUnits(1)};
  top: ${(p: AreaProps) => (p.bottom ? sizeFromUnits(10) : sizeFromUnits(1))};
  ${(p: AreaProps) => (p.bottom ? 'border-bottom: none;' : 'border-top: none;')}
  border-radius: ${(p: AreaProps) =>
    p.bottom ? '3px 3px 0 0' : '0 0 3px 3px'};
  background: rgba(10, 10, 10, .1);
`
const SmallArea = styled.div`
  box-sizing: border-box;
  position: absolute;
  width: ${sizeFromUnits(7)};
  height: ${sizeFromUnits(2)};
  border: 2px solid ${LINES};
  left: ${sizeFromUnits(2)};
  top: ${(p: AreaProps) => (p.bottom ? sizeFromUnits(12) : sizeFromUnits(1))};
  ${(p: AreaProps) => (p.bottom ? 'border-bottom: none;' : 'border-top: none;')}
  border-radius: ${(p: AreaProps) =>
    p.bottom ? '3px 3px 0 0' : '0 0 3px 3px'};
  background: rgba(10, 10, 10, .1);
`
const GoalArea = styled.div`
  box-sizing: border-box;
  position: absolute;
  width: ${sizeFromUnits(5)};
  height: ${sizeFromUnits(1)};
  left: ${sizeFromUnits(3)};
  top: ${(p: AreaProps) => (p.bottom ? sizeFromUnits(14) : sizeFromUnits(0))};
  border: 2px solid ${LINES};
  ${(p: AreaProps) => (p.bottom ? 'border-top: none;' : 'border-bottom: none;')}
  border-radius: ${(p: AreaProps) =>
    p.bottom ? '0 0 3px 3px' : '3px 3px 0 0'};
  background: rgba(200, 200, 200, .1);
`
const FieldArea = styled.div`
  box-sizing: border-box;
  position: absolute;
  width: ${sizeFromUnits(11)};
  height: ${sizeFromUnits(13)};
  left: 0;
  top: ${sizeFromUnits(1)};
  border: 2px solid ${LINES};
  border-radius: 3px;
`
const Wrapper = styled.div`
  position: relative;
  background: ${GRASS};
  width: ${sizeFromUnits(11)};
  height: ${sizeFromUnits(15)};
  overflow: hidden;
  border-radius: 32px;
`
interface RowProps {
  first?: boolean
  last?: boolean
}
const Row = styled.div`
  font-size: 0;
  display: flex;
  overflow: hidden;
  border-radius: ${(p: RowProps) => {
    if (p.first) return '3px 3px 0 0'
    if (p.last) return '0 0 3px 3px'
    return '0'
  }};
`

const PlaceWrapper = styled.div`
  position: absolute;
  width: ${sizeFromUnits(1)};
  height: ${sizeFromUnits(1)};
  transition: 200ms ease-out left, 200ms ease-out top;
  display: flex;
  justify-content: center;
  align-items: center;
`
interface PlaceProps {
  position: Position
  children: any
}
export const Place = ({ position, children }: PlaceProps) => {
  const style = {
    left: sizeFromUnits(position[1]),
    top: sizeFromUnits(position[0])
  }
  return <PlaceWrapper style={style}>{children}</PlaceWrapper>
}

const Board = ({ children }) => {
  return (
    <Wrapper>
      {squares.map((row, rowIndex) => (
        <Row
          key={rowIndex}
          first={rowIndex === 1}
          last={rowIndex === squares.length - 2}
        >
          {row.map((square, columnIndex) => {
            const position = [rowIndex, columnIndex]
            if (isEmpty(position)) return <EmptySquare key={columnIndex} />
            if (goal(position)) return <GoalSquare key={columnIndex} />
            const even = (rowIndex + columnIndex) % 2 === 0
            return square.bonus ? (
              <BonusSquare key={columnIndex} dark={even} />
            ) : (
              <FieldSquare key={columnIndex} dark={even} />
            )
          })}
        </Row>
      ))}
      <BigArea />
      <BigArea bottom />
      <SmallArea />
      <SmallArea bottom />
      <GoalArea />
      <GoalArea bottom />
      <FieldArea />
      {children}
    </Wrapper>
  )
}

export default Board
