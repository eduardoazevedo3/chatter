import { InputHTMLAttributes } from 'react'
import styled from 'styled-components'

const InputContainer = styled.div`
  margin-top: 15px;
`

const Input = styled.input`
  background-color: #121214;
  border: 2px solid #121214;
  border-radius: 5px;
  padding: 10px;
  color: #e1e1e6;
  width: 100%;

  &:focus {
    border-color: #8257e5;
    outline: unset;
  }
`

const InputError = styled.div`
  color: red;
`

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  errors?: any
  register?: any
}

const TextField = ({ id, name, type, label, register, required, errors, ...props }: Props) => (
  <InputContainer>
    <label htmlFor={id}>{label}</label>
    {register ? (
      <Input type={type} id={id} {...register(name, { required: required || false })} {...props} />
    ) : (
      <Input type={type} id={id} name={name} {...props} />
    )}
    {errors && errors[name as keyof typeof errors] && <InputError>must be filled</InputError>}
  </InputContainer>
)

TextField.defaultProps = {
  label: null,
  errors: null,
  register: null,
}

export default TextField
