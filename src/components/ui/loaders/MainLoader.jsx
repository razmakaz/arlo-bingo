import styled, { keyframes } from "styled-components"
import { RiGameFill } from 'react-icons/ri';
import { GoPrimitiveDot } from 'react-icons/go';
import { useContext, useEffect, useState } from "react";
import { AppState } from "../../../App";

const Container = styled.div`
  position: absolute;
  left: 0; 
  right: 0; 
  bottom: 0; 
  top: 0; 
  z-index: 10000;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  background: var(--surface-ground);
  transition: all 333ms;

  opacity: ${p => p.active ? 1 : 0};
  pointer-events: ${p => p.active ? 'all' : 'none' };
`

const LoaderTopWrapper = styled.div`
  position: absolute;
  left: 0; 
  right: 0; 
  top: 0; 
  height: 50%;
  background: var(--surface-a);
  width: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: center;
`

const LoaderProgressContainer = styled.div`
  position: absolute;
  top: calc(50% - 3px);
  left: 0; 
  right: 0; 
  height: 6px;
  width: 100%;
  background: var(--surface-50);
  z-index: 5;
`

const LoaderProgressFill = styled.div`
  background: var(--primary-color);
  height: 100%;
  transition: all 222ms;
  width: ${p => p.fill}%;
`

const LoaderPieceWrapper = styled.div`
  position: absolute;
  bottom: 3vw;
  right: 3vw;
  display: flex;
`

const LoaderAnim = keyframes`
  0% {
    transform: translateY(0px);
  }

  40% {
    transform: translateY(-50px);
  }

  80% {
    transform: translateY(-0px);
  }
`

const LoaderPiece = styled.div`
  color: var(--primary-color);
  animation: ${LoaderAnim} 2000ms ease-in-out infinite;
  animation-delay: ${p => p.delay}ms;
`

export const MainLoader = () => {

  const [state,] = useContext(AppState);
  const [active, setActive] = useState(true);
  const [fill, setFill] = useState(10);
  
  useEffect(() => {
    let timeout, reset;
    if (!state.loading) {
      // Give ourselves a global 333ms wait before actually transitioning
      // out to make sure all other transitions have happened before it starts.
      setFill(100);
      timeout = setTimeout(() => {
        setActive(state.loading);
        reset = setTimeout(() => {
          setFill(10);
        }, 333);
      }, 333);
    } else {
      // Transition in immediately.
      setActive(state.loading);
    }

    return () => {
      if (timeout) clearTimeout(timeout);
      if (reset) clearTimeout(reset);
    }
  }, [state.loading]);

  useEffect(() => {
    let timeout;
    if (fill !== 100 && state.loading) {
      timeout = setInterval(() => {
        setFill(fill + 1);
      }, 555);
    }
    return () => {
      if (timeout) clearInterval(timeout);
    }
  }, [fill])

  return (
    <Container active={active}>
      <LoaderProgressContainer>
        <LoaderProgressFill fill={fill} />
      </LoaderProgressContainer>
      
      <LoaderTopWrapper />
      
      <LoaderPieceWrapper>
        <LoaderPiece delay={111}>
          <RiGameFill size={48}/>
        </LoaderPiece>
        <LoaderPiece delay={222}>
          <GoPrimitiveDot size={48}/>
        </LoaderPiece>
        <LoaderPiece delay={333}>
          <GoPrimitiveDot size={48}/>
        </LoaderPiece>
        <LoaderPiece delay={444}>
          <GoPrimitiveDot size={48}/>
        </LoaderPiece>
      </LoaderPieceWrapper>
    </Container>
  )
}