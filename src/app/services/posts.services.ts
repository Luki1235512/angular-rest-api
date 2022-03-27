import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {PostModelPost} from "../models/post.model";



@Injectable({
  providedIn: 'root'
})
export class PostsServices {

  constructor(private http: HttpClient) {
  }

  getPostsList(page: number): Observable<any> {
    return this.http.get(`https://gorest.co.in/public/v1/posts?page=${page}`)
  }

  addPost(post: PostModelPost): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json',
        'Authorization': 'Bearer 5dc717bd23ced3295a527b42331aaa936b3ff4698d7f59b68681beac1a8823b7' })
    };
    return this.http.post('https://gorest.co.in/public/v1/posts', post, httpOptions)
  }


}
