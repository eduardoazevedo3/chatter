import styled, { css } from 'styled-components'

type Props = {
  color?: 'default' | 'primary' | 'success' | 'danger'
  size?: 'large' | 'small'
  fullWidth?: boolean
  mb?: number
  ml?: number
  mr?: number
  mt?: number
}

const Button = styled.button<Props>`
  ${({ color = 'default', size, fullWidth, theme, ...props }) => css`
    background-color: ${theme[color].backgroundColor};
    border: 1px solid ${theme[color].borderColor};
    color: #fff;
    padding: 12px 24px;
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

export default Button
