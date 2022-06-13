import styled from "styled-components"
import { Navigation } from "../ui/nav/Navigation"

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`

const NavWrapper = styled.div`
  width: 200px;
  height: 100vh;
  z-index: 1;
`

const ContentWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  z-index: 0;
`

export const MainLayout = ({children}) => {
  return (
    <Container>
      <NavWrapper>
        <Navigation />
      </NavWrapper>
      <ContentWrapper>
        {children}
      </ContentWrapper>
    </Container>  
  )
}