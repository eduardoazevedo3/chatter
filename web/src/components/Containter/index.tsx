import styled, { css } from 'styled-components'

type Props = {
  flex?: boolean
}

const Container = styled.div<Props>`
  ${({ flex }) => css`
    display: ${flex ? 'flex' : 'block'};
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 15px;
    flex-direction: column;
  `}
`

export default Container
