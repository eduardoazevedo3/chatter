import { createContext } from 'react'
import actionCable, { Cable } from 'actioncable'
import { CABLE_URL } from '../constants'
import useStorage from '../hooks/storage'

type ContextProps = {
  cable?: Cable
}

type ProviderProps = {
  children: React.ReactNode
}

const ActionCableContext = createContext<ContextProps>({})

const ActionCableProvider = ({ children }: ProviderProps) => {
  const [token] = useStorage('authToken')
  const tokenBase64 = btoa(JSON.stringify(token))
  const cable = actionCable.createConsumer(`${CABLE_URL}?token=${tokenBase64}`)

  return <ActionCableContext.Provider value={{ cable }}>{children}</ActionCableContext.Provider>
}

export default ActionCableContext
export { ActionCableProvider }
