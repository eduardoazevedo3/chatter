/* eslint-disable camelcase */
export type User = {
  id: number
  active: boolean
  full_name: string
  email: string
  phone_number?: string
  created_at: string
  updated_at: string
}

export type UserLogin = {
  email?: string
  password?: string
}
