import { useCallback, useEffect, useState } from 'react'
import Card from '../../components/Card'
import ChatConversation, { ChatContent } from '../../components/ChatConversation'
import Container from '../../components/Containter'
import Grid from '../../components/Grid'
import Typography from '../../components/Typography'
import useApi from '../../hooks/api'
import { ChatMessage } from '../../types/chat_message.type'
import { User } from '../../types/user.type'
import Sidebar from '../Sidebar'

const Chat = () => {
  const [currentUser, setCurrentUser] = useState<User>()
  const [users, setUsers] = useState<User[]>([])
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const api = useApi()

  const getUsers = useCallback(async () => {
    const { data } = await api.get('/users')
    setCurrentUser(data[0])
    setUsers(data)
  }, [api])

  const getChatMessages = useCallback(async () => {
    const { data } = await api.get('/chat_messages')
    setMessages(data)
  }, [api])

  useEffect(() => {
    getUsers()
    getChatMessages()
  }, [getChatMessages, getUsers])

  return (
    <Container>
      <Typography variant="h1">Chats</Typography>
      <Sidebar />
      <Grid container>
        <Grid xs={4}>
          <Card>
            <Typography variant="h2" style={{ margin: 0 }}>
              Contatos
            </Typography>
          </Card>
          <Card>
            {users.map((user) => (
              <Typography key={user.id}>{user.full_name}</Typography>
            ))}
          </Card>
        </Grid>
        <Grid xs={8}>
          <Card>
            {messages.map((message) => (
              <ChatConversation key={message.id}>
                <ChatContent author={currentUser?.id === message.author.id}>
                  <Typography component="h3" color="white">
                    {message.text}
                  </Typography>
                  <Typography variant="small">{new Date(message.created_at).toLocaleTimeString()}</Typography>
                </ChatContent>
              </ChatConversation>
            ))}
          </Card>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Chat
