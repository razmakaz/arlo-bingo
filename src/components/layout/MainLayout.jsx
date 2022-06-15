import styled from "styled-components"
import { Navigation } from "../ui/nav/Navigation"
import { TopNav } from "../ui/nav/TopNav"

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`

const NavWrapper = styled.div`
  width: 200px;
  height: 100vh;
  transition: all 555ms;
  z-index: 1;

  @media (max-width: 767px) {
    transform: translateX(-200px);
    width: 0; 
  }
`

const NavTopWrapper = styled.div`
  position: absolute;
  top: 0; 
  right: 0; 
  left: 0; 
  transition: all 555ms;
  transform: translateY(-60px);
  height: 56px;
  background: var(--surface-b);
  z-index: 1;
  padding-right: 16px;

  @media (max-width: 767px) {
    transform: translateX(0px);
  }
`

const ContentWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  z-index: 0;

  @media (max-width: 767px) {
    padding-top: 80px;
    height: calc(100% - 80px);
  }
`

export const MainLayout = ({children}) => {
  return (
    <Container>
      <NavTopWrapper>
        <TopNav />
      </NavTopWrapper>
      <NavWrapper>
        <Navigation />
      </NavWrapper>
      <ContentWrapper>
        {children}
      </ContentWrapper>
    </Container>  
  )
}