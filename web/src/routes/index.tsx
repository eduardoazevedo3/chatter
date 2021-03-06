import { Switch } from 'react-router-dom'
import Chat from '../containers/Chat'
import Home from '../containers/Home/index'
import Login from '../containers/Login/index'
import User from '../containers/User/index'
import UserForm from '../containers/User/UserForm'
import PrivateRoute from './PrivateRoute'
import PublicRoute from './PublicRoute'

export default function Routes() {
  return (
    <Switch>
      <PublicRoute path="/login" component={Login} exact />

      <PrivateRoute path="/" component={Home} exact />
      <PrivateRoute path="/users" component={User} exact />
      <PrivateRoute path="/users/new" component={UserForm} />
      <PrivateRoute path="/users/:id" component={UserForm} />
      <PrivateRoute path="/chats" component={Chat} exact />
    </Switch>
  )
}
