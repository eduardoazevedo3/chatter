import { ThemeProvider } from 'styled-components'
import { BrowserRouter as Router } from 'react-router-dom'
import Routes from './routes'
import GlobalStyle from './components/GlobalStyle'
import darkTheme from './theme'

// export const lightTheme = {
//   backgroundColor: '#eee',
//   color: '#282c34',
//   default: 'transparent',
//   primary: '#8257e5',
//   success: '#139664',
//   danger: '#be1f89',
//   primaryHover: '#8d68e2',
//   successHover: '#2fa779',
//   dangerHover: '#d64ca8',
// }

export default function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <Router>
        <Routes />
      </Router>
      <GlobalStyle />
    </ThemeProvider>
  )
}
