import { ThemeProvider } from 'styled-components'
import { BrowserRouter as Router } from 'react-router-dom'
import Routes from './routes'
import GlobalStyle from './components/GlobalStyle'
import darkTheme from './theme'
import GlobalContext from './contexts'

const App = () => (
  <ThemeProvider theme={darkTheme}>
    <GlobalContext>
      <Router>
        <Routes />
      </Router>
      <GlobalStyle />
    </GlobalContext>
  </ThemeProvider>
)

export default App
