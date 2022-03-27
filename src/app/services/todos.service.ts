import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";



@Injectable({
  providedIn: 'root'
})
export class TodosService {

  constructor(private http: HttpClient) {
  }

  // get request to get todos from specific page
  getTodosList(page: number): Observable<any> {
    return this.http.get(`https://gorest.co.in/public/v1/todos?page=${page}`)
  }


}
