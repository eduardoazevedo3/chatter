import { TUser } from './User.type'

export type TChatMessage = {
  id: number
  author: TUser
  user: TUser
  delivered: boolean
  read: boolean
  text: string
  createdAt: string
  updatedAt: string
}
