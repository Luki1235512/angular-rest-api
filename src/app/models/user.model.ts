// model for receiving users from api
export interface UserModel {
  id: number
  name: string
  email: string
  gender: string
  status: string
}

// model for sending user to api
export interface UserModelPost {
  name: string
  email: string
  gender: string
  status: string
}
