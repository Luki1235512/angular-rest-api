import { Component, OnInit } from '@angular/core';
import {PostsServices} from "../../services/posts.services";
import {PostModel, PostModelPost} from "../../models/post.model";
import {PaginationModel} from "../../models/pagination.model";
import {CommentsService} from "../../services/comments.service";
import {CommentModel} from "../../models/comment.model";
import {FormBuilder} from "@angular/forms";
import {UserModelPost} from "../../models/user.model";

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  postsList: PostModel[] = []
  paginationPostsInfo: PaginationModel = {} as PaginationModel
  postsLoaded: Promise<boolean> = Promise.resolve(false)
  postsPage: number = JSON.parse(<string>localStorage.getItem('postsPage'))

  commentsList: CommentModel[] = []
  paginationCommentsInfo: PaginationModel = {} as PaginationModel
  commentsLoaded: Promise<boolean> = Promise.resolve(false)

  checkoutFrom = this.formBuilder.group({
    user_id: '',
    title: '',
    body: ''
  })

  constructor(private postsService: PostsServices,
              private commentsService: CommentsService,
              private formBuilder: FormBuilder) { }

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
    this.commentsService.getComments().subscribe(response => {
      this.paginationCommentsInfo = response['meta']['pagination']

      for (let i = 1; i <= this.paginationCommentsInfo.pages; i++) {
        this.commentsService.getCommentsList(i).subscribe(response => {
          let tmp: CommentModel[]
          tmp = response['data']
          for (let j = 0; j < tmp.length; j++) {
            this.commentsList.push(tmp[j])
          }
        })
      }

      this.commentsLoaded = Promise.resolve(true)
    })
  }

  setPage(page: number) {
    console.log(page)
    localStorage.setItem('postsPage', String(page))
    this.getPageWithPosts(page)
  }

  addButton() {
    const post: PostModelPost = {
      user_id: this.checkoutFrom.value.user_id,
      title: this.checkoutFrom.value.title,
      body: this.checkoutFrom.value.body
    }

    this.postsService.addPost(post).subscribe()
    this.checkoutFrom.reset()

  }

}
