import { Injectable } from '@angular/core';
import {HttpService} from "./http.service";
import {first, Subject} from "rxjs";
import {IAccount} from "./Interfaces/IAccount";
import { IBlog } from './Interfaces/IBlog';
import { IAddAccountDTO } from './dto/IAddAccountDTO';
import { IComment } from './Interfaces/IComment';
import { IAddCommentDTO } from './dto/IAddCommentDTO';
import { IAddBlogDTO } from './dto/IAddBlogDTO';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  user!: IAccount;
  $user: Subject<IAccount> = new Subject<IAccount>();
  isLoggedIn: boolean =  false;
  $isLoggedIn: Subject<boolean> = new Subject<boolean>();

  currentPage: string = "login";
  $currentPage: Subject<string> = new Subject<string>();
  
  fullBlog!: IBlog;
  $fullBlog: Subject<IBlog> = new Subject<IBlog>();


  accountList!: IAccount[];
  $accountList: Subject<IAccount[]> = new Subject<IAccount[]>();
  blogList!: IBlog[];
  $blogList: Subject<IBlog[]> = new Subject<IBlog[]>();

  constructor(private httpService: HttpService) {
    this.getAllAccounts();
    this.getAllBlogs();
  }

  setPage(page: string) {
    this.currentPage = page;
    this.$currentPage.next(this.currentPage);
  }

  getAllAccounts(): void{
    this.httpService.getAllAccounts().pipe(first()).subscribe({
      next: data => {
        this.accountList = data;
        this.$accountList.next(this.accountList);
      },
      error: (err) => {
        alert(err);
      }
    })
  }

  // getAccountById(creatorId: number): void {
  //   this.httpService.getAccountById(creatorId).pipe(first()).subscribe({
  //     next: data => {
  //       return data.username;
  //     },
  //     error: (err) => {
  //       alert(err);
  //       return "Account Not Found";
  //     }
  //   })
  // }

  createAccount(newAccount: IAddAccountDTO): void {
    this.httpService.createAccount(newAccount).pipe(first()).subscribe({
      next: data => {
        this.getAllAccounts();
        this.user = data;
        this.$user.next(this.user);
        this.isLoggedIn = true;
        this.$isLoggedIn.next(this.isLoggedIn);
        this.setPage("blogsList");
      },
      error: (err) => {
        alert(err);
      }
    })
  }

  getAllBlogs():void{
    this.httpService.getAllBlogs().pipe(first()).subscribe({
      next: data => {
        this.blogList = data;
        this.$blogList.next(this.blogList);
      },
      error: (err) => {
        alert(err);
      }
    })
  }

  createBlog(blog: IAddBlogDTO) : void{
    this.httpService.createBlog(blog).pipe(first()).subscribe({
      next: data => {
        this.fullBlog = data;
        this.$fullBlog.next(this.fullBlog);
        this.setPage("fullBlog");
        this.getAllBlogs();
      },
      error: (err) => {
        alert(err);
      }
    })
  }

  updateBlog(blog: IBlog):void {
    this.httpService.updateBlog(blog).pipe(first()).subscribe({
      next: data => {
        this.blogList = data;
        this.$blogList.next(this.blogList);
      },
      error: (err) => {
        alert(err);
      }
    })
  }

  deleteBlog(blogId: number): void {
    this.httpService.deleteBlog(blogId).pipe(first()).subscribe({
      next: data => {
        this.blogList = data;
        this.$blogList.next(this.blogList);
        this.setPage("blogsList");
      },
      error: (err) => {
        alert(err);
      }
    })
  }

  addComment(newComment: IAddCommentDTO, blogId: number) {
    this.httpService.addComment(newComment,blogId).pipe(first()).subscribe({
      next: data => {
        this.blogList = data;
        this.$blogList.next(this.blogList);
        for(let blog of data){
          if(blog.id == this.fullBlog.id){
            this.fullBlog = blog;
            this.$fullBlog.next(this.fullBlog);
          }
        }
      },
      error: (err) => {
        alert(err);
      }
    })
  }

  updateComment(comment: IComment): void {
    this.httpService.updateComment(comment).pipe(first()).subscribe({
      next: data => {
        this.blogList = data;
        this.$blogList.next(this.blogList);
        for(let blog of data){
          if(blog.id == this.fullBlog.id){
            this.fullBlog = blog;
            this.$fullBlog.next(this.fullBlog);
          }
        }
      },
      error: (err) => {
        alert(err);
      }
    })
  }

  deleteComment(commentId: number,blogId: number): void {
    this.httpService.deleteComment(commentId, blogId).pipe(first()).subscribe({
      next: data => {
        this.blogList = data;
        this.$blogList.next(this.blogList);
        for(let blog of data){
          if(blog.id == this.fullBlog.id){
            this.fullBlog = blog;
            this.$fullBlog.next(this.fullBlog);
          }
        }
      },
      error: (err) => {
        alert(err);
      }
    })
  }
}
