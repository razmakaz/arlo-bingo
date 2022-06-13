import styled from "styled-components"

const Container = styled.form`
  display: flex;
  flex-wrap: wrap;
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: var(--inline-spacing);
`

export const FormRow = styled.div`
  display: flex;
  grid-gap: var(--inline-spacing);
`

export const FormContainer = ({children}) => {
  return (
    <Container>
      <Wrapper>
        {children}
      </Wrapper>
    </Container>
  )
}