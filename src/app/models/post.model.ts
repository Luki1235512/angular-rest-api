// model for receiving posts from api
export interface PostModel {
  id: number
  user_id: number
  title: string
  body: string
}

// model for sending posts to api
export interface PostModelPost {
  user_id: number
  title: string
  body: string
}
