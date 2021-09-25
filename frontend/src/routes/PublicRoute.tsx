import { RouteProps, Redirect, Route } from 'react-router-dom'
import useStorage from '../hooks/storage'

const PublicRoute = (props: RouteProps) => {
  const [token] = useStorage('authToken')
  return token ? <Redirect to="/" /> : <Route {...props} />
}

export default PublicRoute
