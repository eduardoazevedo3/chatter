import { useCallback, useContext, useEffect, useRef, useState } from 'react'
import Button from '../../components/Button'
import Card from '../../components/Card'
import ChatConversation, { ChatContent } from '../../components/ChatConversation'
import Form from '../../components/Form'
import { Input } from '../../components/TextField'
import Typography from '../../components/Typography'
import ActionCableContext from '../../contexts/ActionCableContext'
import AuthContext from '../../contexts/AuthContext'
import useApi from '../../hooks/api'
import { TChatMessage } from '../../types/ChatMessage.type'
import { TUser } from '../../types/User.type'

type Props = {
  user: TUser
}

const ChatMessages = ({ user }: Props) => {
  const api = useApi()
  const chatContainer = useRef<HTMLDivElement>(null)
  const { cable } = useContext(ActionCableContext)
  const { user: currentUser } = useContext(AuthContext)
  const [inputMessage, setInputMessage] = useState<string>('')
  const [messages, setMessages] = useState<TChatMessage[]>([])

  const subscribe = useCallback(
    (chatMessages: TChatMessage[]) => {
      let messagesContext = chatMessages

      const sub = cable?.subscriptions.create(
        { channel: 'ChatMessagesChannel', room: `${currentUser?.id}_${user.id}` },
        {
          received(data: { message: TChatMessage }) {
            messagesContext = messagesContext.concat([data.message])
            setMessages(messagesContext)
          },
        }
      )

      return sub
    },
    [cable, currentUser, user]
  )

  const sendMessage = async () => {
    if (inputMessage === '') return

    const params = {
      userId: user.id,
      text: inputMessage,
    }

    setInputMessage('')

    await api.post('/chat_messages', { chatMessage: { ...params } })
  }

  useEffect(() => {
    const chatContainerScrollBottom = () => {
      const domNode = chatContainer.current

      if (domNode) {
        domNode.scrollTop = domNode.scrollHeight
      }
    }

    chatContainerScrollBottom()
  }, [messages])

  useEffect(() => {
    let sub: ActionCable.Channel | undefined

    if (user?.id) {
      const getChatMessages = async () => {
        const { data } = await api.get(`/chat_messages?user_id=${user.id}`)
        setMessages(data)

        sub = subscribe(data)
      }

      getChatMessages()
    }

    return () => {
      sub?.unsubscribe()
    }
  }, [api, subscribe, user])

  return (
    <>
      <Card style={{ height: 600, overflowY: 'auto' }} ref={chatContainer}>
        {messages.map((message) => (
          <ChatConversation key={message.id}>
            <ChatContent author={currentUser?.id === message.author.id}>
              <Typography component="h3" color="white">
                {message.text}
              </Typography>
              <Typography variant="small">{new Date(message.createdAt).toLocaleTimeString()}</Typography>
            </ChatContent>
          </ChatConversation>
        ))}
      </Card>
      <Form onSubmit={(e) => e.preventDefault()} visible={!!user?.id}>
        <Card style={{ display: 'flex' }}>
          <Input type="text" name="message" value={inputMessage} onChange={(e) => setInputMessage(e.target.value)} />
          <Button color="primary" onClick={sendMessage}>
            Send
          </Button>
        </Card>
      </Form>
    </>
  )
}

export default ChatMessages
