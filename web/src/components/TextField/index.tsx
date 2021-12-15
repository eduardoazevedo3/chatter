import { InputHTMLAttributes } from 'react'
import styled, { css } from 'styled-components'
import Box from '../Box'

const Input = styled.input<TextFieldProps>`
  ${({ small, large }) => css`
    background-color: #121214;
    border: 2px solid #121214;
    border-radius: 5px;
    padding: 10px;
    color: #e1e1e6;
    width: 100%;
    font-size: 1rem;

    &:focus {
      border-color: #8257e5;
      outline: unset;
    }

    ${small &&
    css`
      padding: 8px;
    `}

    ${large &&
    css`
      font-size: 1.1rem;
      padding: 12px;
    `}
  `}
`

const InputError = styled.div`
  color: red;
`

export interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  errors?: any
  register?: any
  mt?: number
  small?: boolean
  large?: boolean
}

const TextField = ({ id, name, type, label, mt, register, required, errors, ...props }: TextFieldProps) => (
  <Box mt={mt !== undefined ? mt : 15}>
    <label htmlFor={id}>{label}</label>
    {register ? (
      <Input type={type} id={id} {...register(name, { required: { value: required || false, message: "can't be blank" } })} {...props} />
    ) : (
      <Input type={type} id={id} name={name} {...required} {...props} />
    )}
    {errors && errors[name as keyof typeof errors] && <InputError>{errors[name as keyof typeof errors].message}</InputError>}
  </Box>
)

TextField.defaultProps = {
  label: null,
  errors: null,
  register: null,
}

export { Input }
export default TextField
