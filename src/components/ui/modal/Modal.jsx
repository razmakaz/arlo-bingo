import { useContext, useState } from "react";
import styled, { keyframes } from "styled-components"
import { AppState } from "../../../App";
import BackgroundImage from '../../../media/images/slider-background-arlo-al.png';
import { SaveBingoConfig } from "../../../tools/DataUtils";

const ModalFrame = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  top: 0; 
  left: 0; 
  right: 0; 
  bottom: 0; 
  opacity: 0; 
  pointer-events: none;
  z-index: 1000;
  overflow: hidden;

  transition: all 222ms;
  ${p => p.active && `
    opacity: 1; 
    pointer-events: all;
  `}
`

const Container = styled.div`
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  padding: var(--content-padding);
  display: flex;
  justify-content: center;
  align-items: flex-start;
  background: var(--surface-hover);
  backdrop-filter: blur(2px);

`

const Wrapper = styled.div`
  display: flex;
  margin-top: 10vw;
  margin-bottom: 20vw;
  max-width: 500px;
  flex-direction: column;
  border-radius: var(--border-radius);
  box-shadow: 0 2px 32px var(--maskbg);
  border: 1px solid var(--primary-800);
  overflow: hidden;
  background: var(--surface-card);
  transform: translateY(100px);
  opacity: 0; 
  transition: all 222ms;
  z-index: 5;

  ${p => p.active && `
    opacity: 1;
    transform: translateY(0px);
  `}
`

const Title = styled.div`
  padding: var(--inline-spacing);
  font-size: 22px;
  font-weight: bold;
  border-bottom: 1px solid var(--primary-900);
`

const Content = styled.div`
  padding: var(--inline-spacing) var(--content-padding);
`

const Actions = styled.div`
  padding: var(--inline-spacing);
  display: flex;
  justify-content: space-between;
  grid-gap: var(--inline-spacing);
`

const ActionsWrapper = styled.div`
  display: flex;
  grid-gap: 8px;
`

const BackgroundAnim = keyframes`
  0% {
    transform: translateX(0%) translateY(0%) scale(2);
  }

  100% {
    transform: translateX(-512px) translateY(1024px) scale(2);
  }
`

const BackgroundContainer = styled.div`
  position: absolute;
  top: -512px; 
  right: -256px;
  bottom: 0; 
  left: 0;
  background-color: var(--surface-a);
  overflow: hidden;
`

const Background = styled.div` 
  width: 100%;
  height: 100%;
  filter: blur(0px) invert(0);
  opacity: 0.5;
  transition: all 222ms;
  mix-blend-mode: soft-light;
  background: url(${BackgroundImage}) repeat scroll;
  z-index: 2;
  animation: ${BackgroundAnim} 30s linear infinite;
`

const DisableWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  grid-gap: 8px;
`

const DisableBox = styled.div`
  position: relative;
  width: 24px;
  height: 24px;
  border-radius: 3px;
  background: var(${p => p.active ? '--green-700' : '--surface-50'});
  border: 1px solid var(${p => p.active ? '--green-500' : '--primary-700'});
  cursor: pointer;
  transition: all 222ms;
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
  overflow: hidden;

  &:hover {
    border: 1px solid var(--primary-400);
  }

`

const DisableCheck = styled.div`
  position: absolute;
  margin-left: -1px;
  margin-top: -1px;
  font-size: 24px;
  transition: all 222ms;
  transform: translateY(${p => p.active ? '0px' : '-32px'});
  color: var(${p => p.active ? '--primary-50' : '--primary-900'});
`

export const Modal = ({
  title,
  allowDisable,
  active,
  children,
  actions
}) => {

  const [state, setState] = useContext(AppState);
  const { disableIntroModal } = state.config;

  const HandleDisable = () => setState(prev => {
    let stx = {...prev};
    stx.config.disableIntroModal = !disableIntroModal;
    SaveBingoConfig(stx.config);
    return stx;
  })

  return (
    <ModalFrame active={active}>
      <BackgroundContainer>
        <Background />
      </BackgroundContainer>
      <Container>
        <Wrapper active={active}> 
          <Title>{title}</Title>
          <Content>{children}</Content>
          <Actions>
            {allowDisable && 
            <DisableWrapper>
              Don't Show Again
              <DisableBox onClick={HandleDisable} active={disableIntroModal}>
                <DisableCheck active={disableIntroModal}>✔</DisableCheck>
              </DisableBox>
            </DisableWrapper>}
            <ActionsWrapper>
              {actions}
            </ActionsWrapper>
          </Actions>
        </Wrapper>
      </Container>
    </ModalFrame>
  )
}