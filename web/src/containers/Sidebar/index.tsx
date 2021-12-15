import { Link, useHistory } from 'react-router-dom'
import Card from '../../components/Card'
import useApi from '../../hooks/api'
import useStorage from '../../hooks/storage'

const Sidebar = () => {
  const api = useApi()
  const history = useHistory()
  const [token, removeToken] = useStorage('authToken')

  const logout = async () => {
    try {
      if (token) {
        await api.delete('/auth/sign_out')
        removeToken()
      }
      history.push('/login')
    } catch (e: any) {
      if ([401, 404].includes(e.response.status)) {
        removeToken()
        history.push('/login')
      }
    }
  }

  return (
    <Card>
      <Link to="/">Home</Link>
      <Link to="/chats" style={{ marginLeft: '20px' }}>
        Chats
      </Link>
      <Link to="/users" style={{ marginLeft: '20px' }}>
        Users
      </Link>
      <Link to="/users/new" style={{ marginLeft: '20px' }}>
        New User
      </Link>
      <Link to="#" style={{ marginLeft: '20px' }} onClick={logout}>
        Logout
      </Link>
    </Card>
  )
}

export default Sidebar
