import styled, { css } from 'styled-components'

type Props = {
  hover?: boolean
  striped?: boolean
}

const Table = styled.table<Props>`
  ${({ hover, striped }) => css`
    border-spacing: 0;

    & > thead > tr > th {
      background-color: #121214;
    }

    & > thead > tr > th,
    & > tbody > tr > td {
      padding: 6px 12px;
    }

    ${striped &&
    css`
      & > tbody > tr:nth-child(even) {
        background-color: #1a1a1e;
      }
    `}

    ${hover &&
    css`
      & > tbody > tr:hover {
        background-color: #121214;
      }
    `}
  `}
`

export default Table
