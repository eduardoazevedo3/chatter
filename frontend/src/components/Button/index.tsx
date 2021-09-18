import styled, { css } from 'styled-components'

type Props = {
  primary?: boolean
  success?: boolean
  danger?: boolean
  small?: boolean
}

const Button = styled.button<Props>`
  ${({ primary, success, danger, small, theme }) => css`
    background-color: transparent;
    border: 1px solid #8257e5;
    color: #fff;
    padding: 12px 24px;
    border-radius: 5px;
    font-size: 14px;

    &:hover {
      background-color: ${theme.primary};
      cursor: pointer;
    }

    ${primary &&
    css`
      background-color: ${theme.primary};
      border-color: ${theme.primary};

      &:hover {
        background-color: ${theme.primaryHover};
        border-color: ${theme.primaryHover};
      }
    `}

    ${success &&
    css`
      background-color: ${theme.success};
      border-color: ${theme.success};

      &:hover {
        background-color: ${theme.successHover};
        border-color: ${theme.successHover};
      }
    `}

    ${danger &&
    css`
      background-color: ${theme.danger};
      border-color: ${theme.danger};

      &:hover {
        background-color: ${theme.dangerHover};
        border-color: ${theme.dangerHover};
      }
    `}

    ${small &&
    css`
      padding: 6px 12px;
    `}
  `}
`

export default Button
