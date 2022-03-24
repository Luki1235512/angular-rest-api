export interface UserModel {
  // data: {
  //   id: number,
  //   name: string,
  //   email: string,
  //   gender: string,
  //   status: string,
  // }


  id: number
  name: string
  email: string
  gender: string
  status: string


}

export interface UserModelRequest {
  name: string
  email: string
  gender: string
  status: string
}
