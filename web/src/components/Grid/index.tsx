import styled, { css } from 'styled-components'

type Props = {
  container?: boolean
  xs?: number
}

const Grid = styled.div`
  ${({ container, xs }: Props) => css`
    ${container
      ? css`
          display: flex;
          flex-flow: row wrap;
          width: calc(100% + 16px);
          margin-top: -15px;
          margin-left: -15px;
        `
      : css`
          margin: 0px;
          flex-direction: row;
          flex-basis: ${(100 / 12) * (xs || 100)}%;
          webkit-box-flex: 0;
          flex-grow: 0;
          max-width: ${(100 / 12) * (xs || 100)}%;
          padding-left: 15px;
        `}
  `}
`

export default Grid
