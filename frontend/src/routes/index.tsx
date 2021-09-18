import { Switch, Route, RouteProps, Redirect } from 'react-router-dom'
import Chat from '../containers/Chat'
import Home from '../containers/Home/index'
import Login from '../containers/Login/index'
import UserList from '../containers/User/index'
import UserForm from '../containers/User/UserForm'

const isAutheticated = localStorage.getItem('authHeaders') !== null

const PublicRoute = (props: RouteProps) => {
  return isAutheticated ? <Redirect to="/" /> : <Route {...props} />
}

const PrivateRoute = (props: RouteProps) => {
  return isAutheticated ? <Route {...props} /> : <Redirect to="/login" />
}

export default function Routes() {
  return (
    <Switch>
      <PublicRoute path="/login" component={Login} />

      <PrivateRoute path="/" component={Home} exact />
      <PrivateRoute path="/users" component={UserList} exact />
      <PrivateRoute path="/users/new" component={UserForm} />
      <PrivateRoute path="/users/:id" component={UserForm} />
      <PrivateRoute path="/chats" component={Chat} exact />
    </Switch>
  )
}
