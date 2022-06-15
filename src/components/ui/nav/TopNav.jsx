import { useContext } from "react"
import styled from "styled-components"
import { AppState } from "../../../App"
import ArloLogo from '../../../media/images/arlo.svg'
import { Button } from "../buttons/button"

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  padding: 0 var(--inline-spacing);
  justify-content: space-between;
  align-items: center;
  z-index: 500;
`

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`

const Logo = styled.img`
  width: 48px;
  height: 48px;
`

export const TopNav = () => {

  const [state, setState] = useContext(AppState);

  const HandleClick = (destination) => setState({...state, page: destination});

  return (
    <Container>
      <Wrapper>
        <Logo src={ArloLogo} />
      </Wrapper>
      <Wrapper>
        {state.page === 'bingo' && 
          <Button color="primary" onClick={() => HandleClick('faq')}>FAQ</Button>
        }
        {state.page === 'faq' && 
          <Button color="primary" onClick={() => HandleClick('bingo')}>Bingo</Button>
        }
      </Wrapper>
    </Container>
  )
}