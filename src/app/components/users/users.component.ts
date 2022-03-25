import { Component, OnInit } from '@angular/core';
import {UserModel} from "../../models/user.model";
import {UsersService} from "../../services/users.service";
import {PaginationModel} from "../../models/pagination.model";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  usersList: UserModel[] = []
  paginationInfo: PaginationModel = {} as PaginationModel
  usersLoaded: Promise<boolean> = Promise.resolve(false)
  page: number = JSON.parse(<string>localStorage.getItem('usersPage'))

  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
    this.getPageWithUsers(this.page)
    console.log(this.page)
  }

  getPageWithUsers(page: number) {
    this.usersService.getUsersList(page).subscribe(response => {
      this.paginationInfo = response['meta']['pagination']
      this.usersList = response['data']
      console.log(this.paginationInfo.links)
      this.page = this.paginationInfo.page
      this.usersLoaded = Promise.resolve(true)
    })
  }

  setPage(page: number) {
    // console.log(page)
    localStorage.setItem('usersPage', String(page))
    this.getPageWithUsers(page)
  }


}
