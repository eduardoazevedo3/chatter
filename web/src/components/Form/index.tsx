import styled, { css } from 'styled-components'

type Props = {
  mb?: number
  ml?: number
  mr?: number
  mt?: number
  pb?: number
  pl?: number
  pr?: number
  pt?: number
  visible?: boolean
}

const Form = styled.form<Props>`
  ${(props) => css`
    margin-bottom: ${props.mb || 0}px;
    margin-left: ${props.ml || 0}px;
    margin-right: ${props.mr || 0}px;
    margin-top: ${props.mt || 0}px;
    padding-bottom: ${props.pb || 0}px;
    padding-left: ${props.pl || 0}px;
    padding-right: ${props.pr || 0}px;
    padding-top: ${props.pt || 0}px;
    ${props.visible === false &&
    css`
      display: none;
    `}
  `}
`

export default Form
