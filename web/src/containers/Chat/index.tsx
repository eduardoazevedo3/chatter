import { useState } from 'react'
import Container from '../../components/Containter'
import Grid from '../../components/Grid'
import Typography from '../../components/Typography'
import { TUser } from '../../types/User.type'
import Sidebar from '../Sidebar'
import UserContext from './contexts/UserContext'
import ChatContacts from './ChatContacts'
import ChatMessages from './ChatMessages'

const Chat = () => {
  const [user, setUser] = useState<TUser>({} as TUser)

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Container>
        <Typography variant="h1">Chats</Typography>
        <Sidebar />
        <Grid container>
          <Grid xs={4}>
            <ChatContacts />
          </Grid>
          <Grid xs={8}>
            <ChatMessages user={user} />
          </Grid>
        </Grid>
      </Container>
    </UserContext.Provider>
  )
}

export default Chat
