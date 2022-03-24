import { Component, OnInit } from '@angular/core';
import {PostsServices} from "../../services/posts.services";
import {PostModel} from "../../models/post.model";
import {PaginationModel} from "../../models/pagination.model";
import {CommentsService} from "../../services/comments.service";
import {CommentModel} from "../../models/comment.model";

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  postsList: PostModel[] = []
  paginationPostsInfo: PaginationModel = {} as PaginationModel
  postsLoaded: Promise<boolean> = Promise.resolve(false)
  postsPage: number = 1

  commentsList: CommentModel[] = []
  paginationCommentsInfo: PaginationModel = {} as PaginationModel
  commentsPage: number = 1
  commentsLoaded: Promise<boolean> = Promise.resolve(false)

  constructor(private postsService: PostsServices,
              private commentsService: CommentsService) { }

  ngOnInit(): void {
    this.getPageWithPosts(this.postsPage)
    this.getComments()
  }

  getPageWithPosts(page: number) {
    this.postsService.getPostsList(page).subscribe(response => {
      this.paginationPostsInfo = response['meta']['pagination']
      this.postsList = response['data']
      console.log(this.paginationPostsInfo.links)
      this.postsPage = this.paginationPostsInfo.page
      this.postsLoaded = Promise.resolve(true)
    })
  }

  getComments() {
    this.commentsService.getCommentsList(1).subscribe(response => {
      this.paginationCommentsInfo = response['meta']['pagination']
      this.getAllComments()
      // this.commentsLoaded = Promise.resolve(true)
    })
  }

  getAllComments() {
    for (let i = 1; i <= this.paginationCommentsInfo.pages; i++) {
      this.commentsService.getCommentsList(i).subscribe(response => {
        let tmp: CommentModel[] = []
        tmp = response['data']
        for (let j = 0; j < tmp.length; j++) {
          this.commentsList.push(tmp[j])
        }
        // this.commentsList.push(response['data'])
        // console.log(response['data'])
        // console.log(this.commentsList)
      })
    }

    this.commentsLoaded = Promise.resolve(true)
    console.log(this.commentsList)
  }

  setPage(page: number) {
    console.log(page)
    this.getPageWithPosts(page)
  }

}
