import { Component, OnInit } from '@angular/core';
import {PaginationModel} from "../../models/pagination.model";;
import {TodosService} from "../../services/todos.service";
import {TodoModel} from "../../models/todo.model";

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {

  todosList: TodoModel[] = []
  paginationInfo: PaginationModel = {} as PaginationModel
  todosLoaded: Promise<boolean> = Promise.resolve(false)
  page: number = JSON.parse(<string>localStorage.getItem('todosPage'))

  constructor(private todosService: TodosService) { }

  ngOnInit(): void {
    this.getPageWithTodos(this.page)
    console.log(this.page)
  }

  getPageWithTodos(page: number) {
    this.todosService.getTodosList(page).subscribe(response => {
      this.paginationInfo = response['meta']['pagination']
      this.todosList = response['data']
      console.log(this.paginationInfo.links)
      this.page = this.paginationInfo.page
      this.todosLoaded = Promise.resolve(true)
    })
  }

  setPage(page: number) {
    // console.log(page)
    localStorage.setItem('todosPage', String(page))
    this.getPageWithTodos(page)
  }

}
