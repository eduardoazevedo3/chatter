export type TUser = {
  id: number
  active: boolean
  fullName: string
  email: string
  phoneNumber?: string
  createdAt: string
  updatedAt: string
}

export type TUserLogin = {
  email?: string
  password?: string
}
