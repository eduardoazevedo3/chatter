import { ActionCableProvider } from './ActionCableContext'
import { AuthProvider } from './AuthContext'

type Props = {
  children: React.ReactNode
}

const GlobalContext = ({ children }: Props) => (
  <ActionCableProvider>
    <AuthProvider>{children}</AuthProvider>
  </ActionCableProvider>
)

export default GlobalContext
