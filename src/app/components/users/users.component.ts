import { Component, OnInit } from '@angular/core';
import {UserModel, UserModelPost} from "../../models/user.model";
import {UsersService} from "../../services/users.service";
import {PaginationModel} from "../../models/pagination.model";
import {FormBuilder} from "@angular/forms";

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

  checkoutFrom = this.formBuilder.group({
    name: '',
    email: '',
    gender: ''
  })

  constructor(private usersService: UsersService, private formBuilder: FormBuilder) { }

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

  addButton() {
    const user: UserModelPost = {
      name: this.checkoutFrom.value.name,
      email: this.checkoutFrom.value.email,
      gender: this.checkoutFrom.value.gender,
      status: "active"
    }

    this.usersService.addUser(user).subscribe()
    this.checkoutFrom.reset()

  }


}
