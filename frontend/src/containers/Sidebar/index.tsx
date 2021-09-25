import { Link, useHistory } from 'react-router-dom'
import Card from '../../components/Card'
import useApi from '../../hooks/api'
import useStorage from '../../hooks/storage'

const Sidebar = () => {
  const api = useApi()
  const history = useHistory()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [token, removeToken] = useStorage('authToken')

  const logout = async () => {
    try {
      await api.delete('/auth/sign_out')
      removeToken()
      history.push('/login')
    } catch (e: any) {
      if (e.response.status === 401 || e.response.status === 404) {
        removeToken()
        history.push('/login')
      }
    }
  }

  return (
    <Card>
      <Link to="/chats">Chats</Link>
      <Link to="/users" style={{ marginLeft: '20px' }}>
        Users
      </Link>
      <Link to="/users/new" style={{ marginLeft: '20px' }}>
        New User
      </Link>
      <Link
        to="#"
        style={{ marginLeft: '20px' }}
        onClick={() => {
          logout()
        }}
      >
        Logout
      </Link>
    </Card>
  )
}

export default Sidebar
