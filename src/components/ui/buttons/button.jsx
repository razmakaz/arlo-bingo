import styled, { keyframes } from "styled-components"

const Container = styled.div`
  position: relative;
  padding: var(--inline-spacing) var(--content-padding);
  border-radius: var(--border-radius);
  color: var(--${p => p.color}-500);
  font-weight: bold;
  border: 1px solid var(--${p => p.color}-500);
  box-shadow: 0 2px 5px var(--${p => p.color}-800);
  cursor: pointer;
  user-select: none;
  transition: all 222ms;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    box-shadow: 0 0px 0px 1px var(--${p => p.color}-500);
  }

  &:active {
    transition: all 55ms;
    transform: scale(0.98);
  }
`

export const Button = ({children, ...rest}) => {
  return (
    <Container {...rest}>
      {children}
    </Container>
  )
}