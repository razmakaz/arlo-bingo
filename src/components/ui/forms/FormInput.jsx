import styled from "styled-components"

const Input = styled.input`
  border: none;
  outline: none;
  background: var(--surface-c);
  color: var(--surface-900);
  padding: var(--inline-spacing);
  border-radius: var(--border-radius);

  :placeholder {
    color: var(--primary-700);
  }
`

export const FormInput = ({...rest}) => {
  console.log(rest);
  return (
    <Input {...rest} />
  )
}