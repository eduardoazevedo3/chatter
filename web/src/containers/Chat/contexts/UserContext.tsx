import { createContext, Dispatch, SetStateAction } from 'react'
import { TUser } from '../../../types/User.type'

type Props = {
  user?: TUser
  setUser: Dispatch<SetStateAction<TUser>>
}

const defaultValue = {
  setUser: () => null,
}

export default createContext<Props>(defaultValue)
