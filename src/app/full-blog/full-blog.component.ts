import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { first, Subscription } from 'rxjs';
import { DataService } from '../data.service';
import { IAddCommentDTO } from '../dto/IAddCommentDTO';
import { HttpService } from '../http.service';
import { IBlog } from '../Interfaces/IBlog';
import {MatDialog} from '@angular/material/dialog';
import { EditBlogDialogComponent } from '../edit-blog-dialog/edit-blog-dialog.component';

@Component({
  selector: 'app-full-blog',
  templateUrl: './full-blog.component.html',
  styleUrls: ['./full-blog.component.css']
})
export class FullBlogComponent implements OnInit,OnDestroy{
  @ViewChild('like')
  private likeButton!: ElementRef;

  blog!: IBlog;

  author!: string;
  user!: string;
  isUser!: boolean;

  isEditingComment: number = -1;
  commentBody: string = "";
  newComment: string = "";

  sub!:Subscription;
  subTwo!:Subscription;

  constructor(private data: DataService, private httpService: HttpService, public dialog: MatDialog) {
    this.sub = this.data.$fullBlog.subscribe({
      next: data => {
        this.blog = data;
        this.blog.comments = this.blog.comments.sort(function(a, b){return Date.parse(b.dateUpdated) - Date.parse(a.dateUpdated)});
      },
      error: (err) => {
        alert(err);
      }
    })

    this.subTwo = this.data.$user.subscribe({
      next: data => {
        this.user = data.username;
      },
      error: (err) => {
        alert(err);
      }
    })
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
    this.subTwo.unsubscribe();
  }

  ngOnInit(): void {
    this.blog = this.data.fullBlog;
    this.blog.comments = this.blog.comments.sort(function(a, b){return Date.parse(b.dateUpdated) - Date.parse(a.dateUpdated)});
    this.user = this.data.user.username;
    this.httpService.getAccountById(this.data.fullBlog.creatorId).pipe(first()).subscribe({
      next: data => {
        this.author = data.username;
        if(this.author === this.data.user.username){
          this.isUser = true;
        }else{
          this.isUser = false;
        }
      },
      error: (err) => {
        alert(err);
      }
    })
  }

  openDialog() {
    this.dialog.open(EditBlogDialogComponent,{
      height: 'fit-content',
      width: '600px',
    });
  }

  editComment(i: number) {
    this.commentBody = this.blog.comments[i].body;
    this.isEditingComment = i;
  }

  deleteComment(i: number) {
    const commentToDelete = {...this.blog.comments[i]};
    this.data.deleteComment(commentToDelete.id,this.blog.id);
  }

  cancelEdit(i: number) {
    this.commentBody = this.blog.comments[i].body;
    this.isEditingComment = -1;
  }

  saveComment(i: number) {
    this.blog.comments[i].body = this.commentBody;
    this.blog.comments[i].dateUpdated = new Date().toString();
    this.data.updateComment(this.blog.comments[i]);
    this.isEditingComment = -1;
  }

  postComment(){
    const currentDate = new Date();
    const newComment:IAddCommentDTO =
      {
        creator: this.data.user.username,
        dateCreated: currentDate.toString(),
        dateUpdated:currentDate.toString(),
        body: this.newComment
      }
    this.data.addComment(newComment,this.blog.id);
    this.newComment = "";
  }

  editBlog() {
    this.openDialog();
  }

  deleteBlog() {
    this.data.deleteBlog(this.blog.id);
  }
}
