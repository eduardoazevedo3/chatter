import { useEffect, useState } from 'react'
import { Switch } from 'react-router-dom'
import Chat from '../containers/Chat'
import Home from '../containers/Home/index'
import Login from '../containers/Login/index'
import User from '../containers/User/index'
import UserForm from '../containers/User/UserForm'
import AuthContext from '../contexts/AuthContext'
import useApi from '../hooks/api'
import { TUser } from '../types/User.type'
import PrivateRoute from './PrivateRoute'
import PublicRoute from './PublicRoute'

export default function Routes() {
  const [user, setUser] = useState<TUser>({} as TUser)
  const api = useApi()

  useEffect(() => {
    const getUser = async () => {
      const { data } = await api.get('/users/signed_in')
      setUser(data)
    }

    getUser()
  }, [api])

  return (
    <Switch>
      <PublicRoute path="/login" component={Login} />

      <AuthContext.Provider value={{ user, setUser }}>
        <PrivateRoute path="/" component={Home} exact />
        <PrivateRoute path="/users" component={User} exact />
        <PrivateRoute path="/users/new" component={UserForm} />
        <PrivateRoute path="/users/:id" component={UserForm} />
        <PrivateRoute path="/chats" component={Chat} exact />
      </AuthContext.Provider>
    </Switch>
  )
}
