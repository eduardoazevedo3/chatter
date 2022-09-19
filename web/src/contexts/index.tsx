import { ActionCableProvider } from './ActionCableContext'
import { AuthProvider } from './AuthContext'

type Props = {
  children: React.ReactNode
}

const GlobalContext = ({ children }: Props) => (
  <AuthProvider>
    <ActionCableProvider>{children}</ActionCableProvider>
  </AuthProvider>
)

export default GlobalContext
