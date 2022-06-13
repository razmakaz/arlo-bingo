import { useContext, useEffect, useState } from "react"
import styled, { css, keyframes } from "styled-components"
import { AppState } from "../../../App"
import ArloBadge from '../../../media/images/arlo-badge.svg';
import StampImage from '../../../media/images/stamp.svg';
import { Button } from "../buttons/button";

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
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
  width: max(5vw, 8px);
  height: max(5vw, 8px);
  font-weight: bold;
  padding: 8px;
  font-size: max(0.75vw, 8px);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: var(--border-radius);
  border: 1px solid var(--primary-800);
  box-shadow: 0 0 3px var(--primary-800);
  user-select: none;
`

const BingoCellButton = styled(BingoCell)`
  position: relative;
  cursor: pointer;
  transition: all 222ms;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(${p => p.stamped ? '--green-800' : 'primary-900'});

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

const HoverCard = keyframes`
  0% {
    transform: perspective(1000px) translateY(0px);
  }

  50% {
    transform: perspective(1000px) translateY(-20px);
  }

  100% {
    transform: perspective(1000px) translateY(0px);
  }
`

const BingoCardTransitionContainer = styled.div`
  ${p => p.cardState === 'show' && css`animation: ${HoverCard} 5000ms ease-in-out infinite;`}
`


const BingoCardContainer = styled.div`
  background: var(--primary-900);
  box-shadow: 0 2px 16px var(--maskbg);
  padding: 8px;
  border-radius: var(--border-radius);
  transform-style: preserve-3d;
  transition: all 555ms;
  transform: perspective(1000px) rotate3d(${p => p.cardState === 'ready' ? '0, 0, 0, 0deg' : '0.1, 1, 0.1, -180deg'});

  & ${BingoCardFront} {
    backface-visibility: hidden;
  }
  & ${BingoCardBack} {  
    backface-visibility: hidden;
  }
`

const BadgeBackground = styled.img`
  width: 50%;
  height: 50%;
`

const BingoStamp = styled.img`
  position: absolute;
  top: -24px; 
  right:-24px;
  bottom: -24px;
  left: -24px;
  pointer-events: none;
  filter: blur(1px) grayscale(100%);
  transform: rotateZ(${p => p.rotation}deg) scale(${p => p.stamped ? 1 : 2});
  opacity: ${p => p.stamped ? 1 : 0};
  z-index: 3;
  transition: all 333ms;

`


export const BingoCard = () => {

  const [state, setState] = useContext(AppState);
  const [cardState, setCardState] = useState('show');
  const { bingoCard } = state.bingoCard;
  console.log(bingoCard);

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
          let randomRotate = Math.floor(Math.random() * (120 - -120 + 1) - -120);
          let stamped = Math.random() > 0.5;
          items.push(<BingoCellButton stamped={stamped} key={cell+i} id={cell+i}>
            {setup[cellsDataLetters[j]+i]?.name}
            <BingoStamp stamped={stamped} src={StampImage} rotation={randomRotate} />
          </BingoCellButton>)
        }
      })
    }

    return items;
  }

  return (
    <Container>
      <BingoCardTransitionContainer cardState={cardState} >
        <BingoCardContainer cardState={cardState} >
          <BingoCardOuterWrapper>
            <BingoCardBack>
              <BadgeBackground src={ArloBadge} />
              <Button color='primary' onClick={() => setCardState('ready')}>LET'S GO!</Button>
            </BingoCardBack>
            <BingoCardFront>
              {GetGrid()}
            </BingoCardFront>
          </BingoCardOuterWrapper>
        </BingoCardContainer>
      </BingoCardTransitionContainer>
    </Container>
  )
}