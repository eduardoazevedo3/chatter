import { ButtonHTMLAttributes } from 'react'
import styled, { css } from 'styled-components'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color?: 'default' | 'primary' | 'success' | 'danger'
  size?: 'large' | 'medium' | 'small'
  confirm?: string
  fullWidth?: boolean
  mb?: number
  ml?: number
  mr?: number
  mt?: number
}

const ButtonStyled = styled.button<ButtonProps>`
  ${({ color = 'default', size = 'medium', fullWidth, theme, ...props }) => css`
    background-color: ${theme[color].backgroundColor};
    border: 1px solid ${theme[color].borderColor};
    color: #fff;
    border-radius: 5px;
    font-size: 1.1rem;
    margin-bottom: ${props.mb || 0}px;
    margin-left: ${props.ml || 0}px;
    margin-right: ${props.mr || 0}px;
    margin-top: ${props.mt || 0}px;

    &:hover:not(:disabled) {
      filter: brightness(1.25);
      cursor: pointer;
    }

    &:active:not(:disabled) {
      filter: brightness(1.5);
    }

    &:disabled {
      opacity: 0.5;
    }

    ${size &&
    css`
      padding: ${theme.button.size[size].padding};
      font-size: ${theme.button.size[size].fontSize};
    `}

    ${fullWidth &&
    css`
      width: 100%;
    `}
  `}
`

const Button = ({ children, onClick, confirm, ...props }: ButtonProps) => {
  const onClickConfirmation = (e: any) => {
    if (onClick) {
      if (confirm) {
        // eslint-disable-next-line no-alert
        if (window.confirm(confirm)) onClick(e)
      } else {
        onClick(e)
      }
    }
  }

  return (
    <ButtonStyled onClick={onClickConfirmation} {...props}>
      {children}
    </ButtonStyled>
  )
}

export default Button
