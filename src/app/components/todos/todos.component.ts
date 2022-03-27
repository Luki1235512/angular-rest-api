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

  // Initialize all variables
  todosList: TodoModel[] = []
  paginationInfo: PaginationModel = {} as PaginationModel
  todosLoaded: Promise<boolean> = Promise.resolve(false)
  page: number = JSON.parse(<string>localStorage.getItem('todosPage'))

  constructor(private todosService: TodosService) { }

  ngOnInit(): void {
    this.getPageWithTodos(this.page)
  }

  // get information about todos from current page
  getPageWithTodos(page: number) {
    this.todosService.getTodosList(page).subscribe(response => {
      this.paginationInfo = response['meta']['pagination']
      this.todosList = response['data']
      this.page = this.paginationInfo.page
      this.todosLoaded = Promise.resolve(true)
    })
  }

  // saves todos page and loads new content
  setPage(page: number) {
    localStorage.setItem('todosPage', String(page))
    this.getPageWithTodos(page)
  }

}
