import styled, { css, DefaultTheme } from 'styled-components'
import Box from '../Box'

type Props = {
  bgcolor?: string
}

const Card = styled(Box)<Props>`
  ${({ bgcolor, theme }) => css`
    padding: 15px;
    background-color: #202024;
    border-radius: 5px;
    margin: 15px 0;

    background-color: ${bgcolor};

    ${bgcolor &&
    css`
      background-color: ${theme[bgcolor as keyof DefaultTheme]};
    `}
  `}
`

export default Card
