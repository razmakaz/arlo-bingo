import styled from "styled-components"

const Container = styled.div`
  position: absolute;
  top: 0;
  right: 0; 
  display: flex;
  flex-direction: column;
  padding: var(--content-padding);
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const ScoreItem = styled.div`

`

export const ScoreKeeper = ({ children }) => {
  return (
    <Container>
      <Wrapper>
        {children}
      </Wrapper>
    </Container>
  )
}