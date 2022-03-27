// model for receiving comments from api
export interface CommentModel {
  id: number
  post_id: number
  name: string
  email: string
  body: string
}
