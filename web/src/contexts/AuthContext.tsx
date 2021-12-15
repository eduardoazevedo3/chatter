import { Dispatch, SetStateAction, createContext } from 'react'
import { TUser } from '../types/User.type'

type AuthProps = {
  user?: TUser
  setUser: Dispatch<SetStateAction<TUser>>
}

const defaultValue = {
  setUser: () => null,
}

export default createContext<AuthProps>(defaultValue)
