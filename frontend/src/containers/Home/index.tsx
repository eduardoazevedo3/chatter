import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Header = styled.header`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  text-align: center;
`

const Home = () => (
  <Header>
    <Link to="/users">Users</Link>
    <Link to="/chats">Chats</Link>
    <Link to="/login">Login</Link>
  </Header>
)

export default Home
