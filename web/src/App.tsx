import { ThemeProvider } from 'styled-components'
import { BrowserRouter as Router } from 'react-router-dom'
import actionCable from 'actioncable'
import Routes from './routes'
import GlobalStyle from './components/GlobalStyle'
import darkTheme from './theme'
import ActionCableContext from './contexts/ActionCableContext'
import useStorage from './hooks/storage'
import { CABLE_URL } from './constants'

export default function App() {
  const [token] = useStorage('authToken')
  const tokenWS = btoa(JSON.stringify(token))
  const cable = actionCable.createConsumer(`${CABLE_URL}?token=${tokenWS}`)

  return (
    <ActionCableContext.Provider value={{ cable }}>
      <ThemeProvider theme={darkTheme}>
        <Router>
          <Routes />
        </Router>
        <GlobalStyle />
      </ThemeProvider>
    </ActionCableContext.Provider>
  )
}
