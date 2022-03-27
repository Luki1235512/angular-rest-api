import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";


@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(private http: HttpClient) {
  }

  // get request to get comments from specific page
  getCommentsList(page: number): Observable<any> {
    return this.http.get(`https://gorest.co.in/public/v1/comments?page=${page}`)
  }

  // get request to get comments from default page
  getComments(): Observable<any> {
    return this.http.get(`https://gorest.co.in/public/v1/comments`)
  }



}
