import { createContext } from 'react'
import { Cable } from 'actioncable'

type ActionCableProps = {
  cable?: Cable
}

export default createContext<ActionCableProps>({})
