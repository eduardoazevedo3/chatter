import { User } from './user.type'

export type ChatMessage = {
  id: number
  author: User
  user: User
  delivered: boolean
  read: boolean
  text: string
  created_at: string
  updated_at: string
}
