import styled from 'styled-components'

type Props = {
  severity: 'error' | 'warning' | 'info' | 'success'
}

const Alert = styled.div<Props>`
  background-color: #9b4040;
  color: #e4cbcb;
  border-radius: 4px;
  padding: 12px 15px;
  width: 100%;
`

export default Alert
