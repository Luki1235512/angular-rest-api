import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {UserModelPost} from "../models/user.model";



@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) {
  }


  // get request to get users from specific page
  getUsersList(page: number): Observable<any> {
    return this.http.get(`https://gorest.co.in/public/v1/users?page=${page}`)
  }

  // post request to api with user
  addUser(user: UserModelPost): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json',
        'Authorization': 'Bearer 5dc717bd23ced3295a527b42331aaa936b3ff4698d7f59b68681beac1a8823b7' })
    };
    return this.http.post('https://gorest.co.in/public/v1/users', user, httpOptions)
  }


}
