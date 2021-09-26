import { RouteProps, Redirect, Route } from 'react-router-dom'
import useStorage from '../hooks/storage'

const PrivateRoute = (props: RouteProps) => {
  const [token] = useStorage('authToken')
  return token ? <Route {...props} /> : <Redirect to="/login" />
}

export default PrivateRoute
