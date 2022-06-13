import { useContext, useEffect, useState } from "react"
import styled, { css, keyframes } from "styled-components"
import { AppState } from "../../../App"

const Container = styled.div`
  position: absolute;
  top: 0; 
  left: 0; 
  right: 0; 
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`

const BingoCardOuterWrapper = styled.div`
  position: relative;
  border: 3px solid var(--primary-500);
  border-radius: 3px;
  transform-style: preserve-3d;
  box-shadow: 0 0 6px var(--maskbg);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
`

const BingoCardBack = styled.div`
  position: absolute;
  top: 0; 
  left: 0; 
  right: 0; 
  bottom: 0; 
  background: var(--primary-900);
  transform-style: preserve-3d;
  transform: perspective(1000px) rotateY(180deg) translateZ(1px);
`

const BingoCardFront = styled.div`
  position: relative;
  background: var(--primary-900);
  display: grid;
  grid-template-rows: repeat(6, 1fr);
  grid-template-columns: repeat(5, 1fr);
  place-items: center;
  grid-gap: 8px;
  margin: 8px;
  transform: perspective(1000px) translateZ(0px);
`

const BingoCell = styled.div`
  width: 5vw;
  height: 5vw;
  font-weight: bold;
  padding: 16px;
  font-size: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: var(--border-radius);
  border: 1px solid var(--primary-800);
  box-shadow: 0 0 3px var(--primary-800);
  user-select: none;
`

const BingoCellButton = styled(BingoCell)`
  cursor: pointer;
  transition: all 222ms;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    box-shadow: 0 0 8px var(--primary-800);
    transform: scale(1.1);
  }
`

const BingoHeader = styled(BingoCell)`
  font-size: 30px;
  font-weight: bold;
  border: 2px solid var(--primary-500);
`


const BingoCardContainer = styled.div`
  background: var(--primary-900);
  box-shadow: 0 2px 16px var(--maskbg);
  padding: 8px;
  border-radius: var(--border-radius);
  transform-style: preserve-3d;
  transition: all 888ms;
  transform: perspective(1000px) rotate3d(${p => p.cardState === 'ready' ? '0, 0, 0, 0deg' : '0.1, 1, 0.1, -180deg'});

  & ${BingoCardFront} {
    backface-visibility: hidden;
  }
  & ${BingoCardBack} {  
    backface-visibility: hidden;
  }
`

const CardConfirmWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`


export const BingoCard = () => {

  const [state, setState] = useContext(AppState);
  const [cardState, setCardState] = useState('show');

  useEffect(() => {
    setTimeout(() => {
      setCardState('ready');
    }, 10)
  }, [])

  const cellsLetters = ['B','I','N','G','O']
  const cellsDataLetters = ['a', 'b', 'c', 'd', 'e'];

  const GetGrid = () => {
    let items = []
    let setup = {...state.bingoCard.bingoCard};
    for (let i = 0; i <= 5; i++) {
    cellsLetters.forEach((cell, j) => {
        if (i === 0) {
          items.push(<BingoHeader key={cell+i} id={cell}>{cell}</BingoHeader>)
        } else {
          items.push(<BingoCellButton key={cell+i} id={cell+i}>{setup[cellsDataLetters[j]+i]?.name}</BingoCellButton>)
        }
      })
    }

    return items;
  }

  return (
    <Container>
      <BingoCardContainer cardState={cardState} >
        <BingoCardOuterWrapper>
          <BingoCardBack>
            <CardConfirmWrapper>
              asdf
            </CardConfirmWrapper>
          </BingoCardBack>
          <BingoCardFront>
            {GetGrid()}
          </BingoCardFront>
        </BingoCardOuterWrapper>
      </BingoCardContainer>
    </Container>
  )
}