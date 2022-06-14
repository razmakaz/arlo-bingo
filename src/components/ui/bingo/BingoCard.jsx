import { useCallback, useContext, useEffect, useMemo, useState } from "react"
import styled, { css, keyframes } from "styled-components"
import { AppState } from "../../../App"
import ArloBadge from '../../../media/images/arlo-badge.svg';
import { SaveBingoCard } from "../../../tools/DataUtils";
import { Button } from "../buttons/button";
import useSound from '../../hooks/useSound';
import StampSound from '../../../media/sounds/TP_Heart.wav';
import UnstampSound from '../../../media/sounds/TP_ItemMenu_Info_Back.wav';
import BingoSound from '../../../media/sounds/BOTW_Fanfare_SmallItem.wav';
import BlackoutSound from '../../../media/sounds/BOTW_Fanfare_HeartContainer.wav'
import CursorSound from '../../../media/sounds/TP_ItemMenu_Cursor.wav';
import { BingoWinGrid } from "../../../data/BingoWinGrid";

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

const BlackoutAnim = keyframes`
  0% {
    transform: scale(1.1) rotateZ(0deg);
  }

  25% {
    transform: scale(1.1) rotateZ(12deg);
  }

  75% {
    transform: scale(1.1) rotateZ(-12deg);
  }

  100% {
    transform: scale(1.1) rotateZ(0deg);
  }
`

const BingoCellButton = styled(BingoCell)`
  position: relative;
  cursor: pointer;
  transition: all 222ms;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(${p => 
    p.stamped === 'blackout' ? '--green-700' : 
    p.stamped === 'bingo' ? '--yellow-700' :
    p.stamped === 'stamped' ? '--cyan-700' : 
    '--primary-900'  
  });

  &:hover {
    box-shadow: 0 0 8px var(--primary-800);
    transform: scale(1.05);
  }

  &:active {
    box-shadow: 0 0 8px var(--primary-800);
    transform: scale(0.9);
  }

  ${p => p.stamped === 'blackout' && css`
    animation: ${BlackoutAnim} 1s linear infinite;
  `}
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

export const BingoCard = () => {

  const [state, setState] = useContext(AppState);
  const [cardState, setCardState] = useState('show');

  const [playStamp] = useSound(StampSound);
  const [playBingo] = useSound(BingoSound);
  const [playBlackout] = useSound(BlackoutSound);
  const [playCursor] = useSound(CursorSound);
  const [playUnstamp] = useSound(UnstampSound);

  const cellsLetters = ['B','I','N','G','O']
  const cellsDataLetters = ['a', 'b', 'c', 'd', 'e'];

  const HandleStamp = (cell, value) => {

    window.dataLayer.push({"bingo_cell_clicked": { value: cell }});

    setState(prev => {
  
      // Set the new value.
      let stx = {...prev};
      stx.bingoCard.bingoCard[cell].stamped = value;
      
      // Play the appropriate sound.
      if (value) {
        playStamp();
      } else {
        playUnstamp();
      }

      /**
       * Check for new bingos.
       */
      // Generate a list of current stamped cells.
      let currentStamps = Object.keys(state.bingoCard.bingoCard).filter(cell => {
        if (state.bingoCard.bingoCard[cell].stamped) {
          return cell;
        }
      })

      // Iterate through vectors of win layouts.
      let bingos = []

      // Set up our new bingo trigger to prevent 
      // trying to play the sound multiple times.
      Object.keys(BingoWinGrid).forEach(vector => {
        let win = true;
        // Check if each of the cells in the win vector.
        BingoWinGrid[vector].forEach(cell => {
          if (!currentStamps.includes(cell)) {
            win = false;
          }
        })

        // If there's a bingo, add it to our list.
        if (win) {
          // Set the bingo list.
          bingos.push(vector);
        }

      })

      // Check if it's a new bingo, if so, play the bingo sound.
      let newBingo = false;
      bingos.forEach(bgo => {
        if (!stx.bingoCard.bingos.includes(bgo)) {
          if (bgo === 'bo') {
            playBlackout();
            window.dataLayer.push({"bingo_blackout": { value: stx.bingoCard.name }});
            newBingo = false;
          } else {
            window.dataLayer.push({"bingo_win": { value: bgo }});
            newBingo = true;
          }
        }
      })
      if (newBingo) playBingo();

      stx.bingoCard.bingos = bingos;

      // Finally, save our updated bingo card.
      SaveBingoCard(stx.bingoCard);

      // Return
      return stx;    
    })

  }

  const GetGrid = () => {
    let items = []
    let setup = {...state.bingoCard.bingoCard};
    for (let i = 0; i <= 5; i++) {
    cellsLetters.forEach((cell, j) => {
        if (i === 0) {
          items.push(<BingoHeader key={cell+i} id={cell}>{cell}</BingoHeader>)
        } else {
          let cellId = cellsDataLetters[j]+i
          let status = setup[cellId].stamped ? 'stamped' : 'none';
          state.bingoCard.bingos?.forEach(bgo => {
            let grid = BingoWinGrid[bgo];
            if (grid.includes(cellId) && setup[cellId].stamped) {
              status = 'bingo'
            }
          })
          if (state.bingoCard.bingos?.includes('bo')) {
            status = 'blackout'
          }
          items.push(
            <BingoCellButton 
              stamped={status} 
              onClick={() => HandleStamp(cellId, !setup[cellId].stamped)}
              onMouseEnter={() => playCursor()}
              key={cell+i} 
              id={cell+i}
            >
              {setup[cellId]?.name}
            </BingoCellButton>
          )
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