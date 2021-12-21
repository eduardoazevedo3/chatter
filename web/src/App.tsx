import { useEffect, useState } from 'react'
import { ThemeProvider } from 'styled-components'
import { BrowserRouter as Router } from 'react-router-dom'
import actionCable from 'actioncable'
import Routes from './routes'
import GlobalStyle from './components/GlobalStyle'
import darkTheme from './theme'
import ActionCableContext from './contexts/ActionCableContext'
import useStorage from './hooks/storage'
import { CABLE_URL } from './constants'
import { TUser } from './types/User.type'
import useApi from './hooks/api'
import AuthContext from './contexts/AuthContext'

export default function App() {
  const [token] = useStorage('authToken')
  const tokenWS = btoa(JSON.stringify(token))
  const cable = actionCable.createConsumer(`${CABLE_URL}?token=${tokenWS}`)

  const [user, setUser] = useState<TUser>({} as TUser)
  const api = useApi()

  useEffect(() => {
    const getUser = async () => {
      if (!token) return

      const { data } = await api.get('/users/signed_in')
      setUser(data)
    }

    getUser()
  }, [api, token])

  return (
    <ActionCableContext.Provider value={{ cable }}>
      <AuthContext.Provider value={{ user, setUser }}>
        <ThemeProvider theme={darkTheme}>
          <Router>
            <Routes />
          </Router>
          <GlobalStyle />
        </ThemeProvider>
      </AuthContext.Provider>
    </ActionCableContext.Provider>
  )
}
