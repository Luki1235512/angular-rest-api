// model for receiving todos from api
export interface TodoModel {
  id: number
  user_id: number
  title: string
  due_on: Date
  status: string
}
