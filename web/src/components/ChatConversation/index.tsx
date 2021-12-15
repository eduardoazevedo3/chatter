import styled, { css } from 'styled-components'

type Props = {
  author?: boolean
}

const ChatConversation = styled.div`
  &:after {
    display: block;
    clear: both;
    content: '';
  }
`

const ChatContent = styled.div<Props>`
  ${({ author, theme }) => css`
    padding: 10px;
    border-radius: 12px;
    max-width: 60%;
    margin: 6px 0;
    overflow-wrap: break-word;
    float: ${author ? 'right' : 'left'};
    background-color: ${author ? theme.success.backgroundColor : theme.primary.backgroundColor};
  `}
`

export default ChatConversation
export { ChatContent }
