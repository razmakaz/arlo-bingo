import { useContext, useState } from "react"
import styled from "styled-components"
import { AppState } from "../../../App"
import { SaveBingoCard } from "../../../tools/DataUtils"
import { Button } from "../buttons/button"

const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  transition: all 222ms;
  background: var(--maskbg);
  opacity: ${p => p.active ? 1 : 0};
  z-index: 500;
  pointer-events: ${p => p.active ? 'all' : 'none'};
`

const Wrapper = styled.div`
  margin: 16px;
  text-align: center;
  max-width: 500px;
  background: var(--surface-a);
  border: 1px solid var(--primary-800);
  border-radius: 8px;
  padding-bottom: 16px;
  box-shadow: 0 1px 8px var(--primary-900);
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: all 555ms;

  transform: ${p => p.active ? 'translateY(0%) rotateZ(0deg)' : 'translateY(-100%) rotateZ(-15deg)'};
`

const Header = styled.div`
  font-size: 32px;
  font-weight: bold;
  color: var(--primary-500);
  padding: 8px 16px;
  border-bottom: 1px solid var(--primary-900);
`

const NameInput = styled.input`
  text-align: center;
  background: var(--surface-c);
  padding: 16px;
  font-size: 24px;
  border-radius: 8px;
  color: var(--primary-500);
  border: 1px solid var(--primary-900);
  outline: none;
  margin-top: 8px;
  margin-bottom: 16px;
  transition: all 222ms;

  &:focus {
    border: 1px solid var(--primary-500);
  }
`

export const StartForm = ({ active }) => {

  const [state, setState] = useContext(AppState);
  const [nameInput, setNameInput] = useState(''); 

  const HandleSubmit = () => {
    let { bingoCard } = {...state};
    if (!nameInput) {
      bingoCard.name = 'Another Nameless Soul'
    } else {
      bingoCard.name = nameInput;
    }

    window.dataLayer.push({"name_entered": { value: bingoCard.name }});

    setState({...state, bingoCard});

    SaveBingoCard(bingoCard);
  }

  return (
    <Container active={active}>
      <Wrapper active={active} >
        <Header>Let's Get You A Bingo Card</Header>
        <h2>What's your name?</h2>
        <p>You don't have to use your real name. 🤫</p>
        <NameInput value={nameInput} onChange={e => setNameInput(e.target.value)} placeholder="Your Name" />
        <Button color='primary' onClick={HandleSubmit}>
          Let's Go!
        </Button>
      </Wrapper>
    </Container>
  )
}
