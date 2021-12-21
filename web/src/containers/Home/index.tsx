import { useContext } from 'react'
import Card from '../../components/Card'
import Container from '../../components/Containter'
import Typography from '../../components/Typography'
import AuthContext from '../../contexts/AuthContext'
import Sidebar from '../Sidebar'

const Home = () => {
  const { user: currentUser } = useContext(AuthContext)

  return (
    <Container>
      <Typography variant="h1">Home</Typography>
      <Sidebar />
      <Card>
        <Typography variant="h3">Olá, {currentUser?.fullName}</Typography>
      </Card>
    </Container>
  )
}

export default Home
