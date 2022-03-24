import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";



@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) {
  }


  getUsersList(page: number): Observable<any> {
    return this.http.get(`https://gorest.co.in/public/v1/users?page=${page}`)
  }


}
