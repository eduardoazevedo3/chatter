import { Dispatch, SetStateAction, createContext, useEffect, useState } from 'react'
import useApi from '../hooks/api'
import useStorage from '../hooks/storage'
import { TUser } from '../types/User.type'

type ContextProps = {
  user?: TUser
  setUser: Dispatch<SetStateAction<TUser>>
}

type ProviderProps = {
  children: React.ReactNode
}

const defaultValue = {
  setUser: () => null,
}

const AuthContext = createContext<ContextProps>(defaultValue)

const AuthProvider = ({ children }: ProviderProps) => {
  const [token] = useStorage('authToken')
  const [user, setUser] = useState<TUser>({} as TUser)
  const api = useApi()

  useEffect(() => {
    const getUser = async () => {
      if (!token) return

      const { data } = await api.get('/users/signed_in')
      setUser(data)
    }

    getUser()
  }, [api, token])

  return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>
}

export default AuthContext
export { AuthProvider }
