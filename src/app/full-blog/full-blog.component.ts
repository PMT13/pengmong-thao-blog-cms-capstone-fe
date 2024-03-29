import { Component, OnDestroy, OnInit } from '@angular/core';
import { first, Subscription } from 'rxjs';
import { DataService } from '../data.service';
import { IAddCommentDTO } from '../dto/IAddCommentDTO';
import { HttpService } from '../http.service';
import { IBlog } from '../Interfaces/IBlog';
import {MatDialog} from '@angular/material/dialog';
import { EditBlogDialogComponent } from '../edit-blog-dialog/edit-blog-dialog.component';
import { IAccount } from '../Interfaces/IAccount';

@Component({
  selector: 'app-full-blog',
  templateUrl: './full-blog.component.html',
  styleUrls: ['./full-blog.component.css']
})
export class FullBlogComponent implements OnInit,OnDestroy{
  blog!: IBlog;

  author!: IAccount;
  user!: IAccount;
  isUser!: boolean;

  isEditingComment: number = -1;
  error: boolean = false;
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
        this.user = data;
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
    this.user = this.data.user;
    this.author = this.user; // dummy data
    this.httpService.getAccountById(this.data.fullBlog.creatorId).pipe(first()).subscribe({
      next: data => {
        this.author = data;
        if(this.author.username === this.data.user.username){
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
    if(this.commentBody === ""){
      this.data.errorMsg = "No empty comments allowed";
      this.data.$errorMsg.next(this.data.errorMsg);
      this.error = true;
      return;
    }
    if(this.commentBody.replace(/\s/g, '') === ""){
      this.data.errorMsg = "No empty comments allowed";
      this.data.$errorMsg.next(this.data.errorMsg);
      this.error = true;
      return;
    }
    this.blog.comments[i].body = this.commentBody;
    this.blog.comments[i].dateUpdated = new Date().toString();
    this.data.updateComment(this.blog.comments[i]);
    this.isEditingComment = -1;
  }

  postComment(){
    if(this.newComment === ""){
      this.data.errorMsg = "Empty Comment";
      this.data.$errorMsg.next(this.data.errorMsg);
      this.error = true;
      return;
    }
    if(this.newComment.replace(/\s/g, '') === ""){
      this.data.errorMsg = "Empty Comment";
      this.data.$errorMsg.next(this.data.errorMsg);
      this.error = true;
      return;
    }
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

  getCommentCreatorAccount(creator: string) {
    const creatorAccount = this.data.accountList.find(account => account.username === creator);
    if(creatorAccount !== undefined){
      return creatorAccount;
    }
    return this.data.user;
  }
}
