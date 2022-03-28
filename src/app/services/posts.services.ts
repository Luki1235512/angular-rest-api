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

  // get request to get posts from specific page
  getPostsList(page: number): Observable<any> {
    return this.http.get(`https://gorest.co.in/public/v1/posts?page=${page}`)
  }

  // post request to api with post
  addPost(post: PostModelPost): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json',
        'Authorization': 'Bearer YOUR_BEARER_TOKEN' })
    };
    return this.http.post('https://gorest.co.in/public/v1/posts', post, httpOptions)
  }


}
