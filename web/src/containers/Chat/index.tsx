import { useCallback, useContext, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import Button from '../../components/Button'
import Card from '../../components/Card'
import ChatConversation, { ChatContent } from '../../components/ChatConversation'
import Container from '../../components/Containter'
import Form from '../../components/Form'
import Grid from '../../components/Grid'
import { Input } from '../../components/TextField'
import Typography from '../../components/Typography'
import ActionCableContext from '../../contexts/ActionCableContext'
import AuthContext from '../../contexts/AuthContext'
import useApi from '../../hooks/api'
import { TChatMessage } from '../../types/ChatMessage.type'
import { TUser } from '../../types/User.type'
import Sidebar from '../Sidebar'

const ContactLink = styled.a`
  font-size: 14px;
  display: block;
  padding: 10px 0;
  border-bottom: 1px solid #353535;
  text-decoration: none;
  cursor: pointer;

  &:last-child {
    border-bottom: 0;
  }

  &:hover {
    text-decoration: underline;
  }

  &:active {
    color: #fff;
  }
`

const Chat = () => {
  const api = useApi()
  const chatContainer = useRef<HTMLDivElement>(null)
  const { user: currentUser } = useContext(AuthContext)
  const { cable } = useContext(ActionCableContext)
  const [users, setUsers] = useState<TUser[]>([])
  const [messages, setMessages] = useState<TChatMessage[]>([])
  const [inputMessage, setInputMessage] = useState<string>('')
  const [user, setUser] = useState<TUser>()
  const [subscription, setSubscription] = useState<any>()

  const getUsers = useCallback(async () => {
    const { data } = await api.get('/users')
    setUsers(data)
  }, [api])

  const chatContainerScrollBottom = () => {
    const domNode = chatContainer.current

    if (domNode) {
      domNode.scrollTop = domNode.scrollHeight
    }
  }

  const getChatMessages = useCallback(async () => {
    const { data } = await api.get(`/chat_messages?user_id=${user?.id}`)
    setMessages(data)
  }, [api, user])

  const putMessage = useCallback(
    (text: string, author = currentUser) => {
      const message = {
        id: 99999,
        author,
        text,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      } as TChatMessage

      setMessages(messages.concat([message]))
    },
    [messages, currentUser]
  )

  const sendMessage = async () => {
    if (inputMessage === '') return

    putMessage(inputMessage)

    const params = {
      userId: user?.id,
      text: inputMessage,
    }

    setInputMessage('')

    await api.post('/chat_messages', { chatMessage: { ...params } })
  }

  const cableSubscription = useCallback(() => {
    if (!currentUser?.id || subscription) return

    const sub = cable?.subscriptions.create(
      { channel: 'ChatMessagesChannel', room: `${currentUser.id}` },
      {
        received(data) {
          putMessage(data?.message?.text)
        },
      }
    )

    setSubscription(sub)
  }, [cable, putMessage, currentUser, subscription])

  useEffect(() => {
    chatContainerScrollBottom()
  }, [messages])

  useEffect(() => {
    getUsers()
  }, [getUsers])

  useEffect(() => {
    getChatMessages()
  }, [getChatMessages])

  useEffect(() => {
    cableSubscription()
  }, [cableSubscription])

  return (
    <Container>
      <Typography variant="h1">Chats</Typography>
      <Sidebar />
      <Grid container>
        <Grid xs={4}>
          <Card>
            <Typography variant="h2" style={{ margin: 0 }}>
              Contacts
            </Typography>
          </Card>
          <Card>
            {users.map((u) => (
              <ContactLink key={u.id} onClick={() => setUser(u)}>
                {u.fullName}
              </ContactLink>
            ))}
          </Card>
        </Grid>
        <Grid xs={8}>
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
          <Form onSubmit={(e) => e.preventDefault()}>
            <Card style={{ display: 'flex' }}>
              <Input type="text" name="message" value={inputMessage} onChange={(e) => setInputMessage(e.target.value)} />
              <Button color="primary" onClick={sendMessage}>
                Send
              </Button>
            </Card>
          </Form>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Chat
