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
  page: number = 1

  constructor(private todosService: TodosService) { }

  ngOnInit(): void {
    this.getPageWithTodos(this.page)
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
    console.log(page)
    this.getPageWithTodos(page)
  }

}
