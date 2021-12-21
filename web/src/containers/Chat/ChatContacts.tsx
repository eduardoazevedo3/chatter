import { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import Card from '../../components/Card'
import Typography from '../../components/Typography'
import useApi from '../../hooks/api'
import { TUser } from '../../types/User.type'
import UserContext from './contexts/UserContext'

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

const ChatContacts = () => {
  const api = useApi()
  const [users, setUsers] = useState<TUser[]>([])
  const { setUser } = useContext(UserContext)

  useEffect(() => {
    const getUsers = async () => {
      const { data } = await api.get('/users')
      setUsers(data)
    }

    getUsers()
  }, [api])

  return (
    <>
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
    </>
  )
}

export default ChatContacts
