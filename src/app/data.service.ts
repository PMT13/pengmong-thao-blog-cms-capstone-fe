import { Injectable } from '@angular/core';
import {HttpService} from "./http.service";
import {first, Subject} from "rxjs";
import {IAccount} from "./Interfaces/IAccount";
import { IBlog } from './Interfaces/IBlog';
import { IAddAccountDTO } from './dto/IAddAccountDTO';
import { IComment } from './Interfaces/IComment';
import { IAddCommentDTO } from './dto/IAddCommentDTO';
import { IAddBlogDTO } from './dto/IAddBlogDTO';
import { IChat } from './Interfaces/IChat';
import { IAddMessageDTO } from './dto/IAddMessageDTO';
import { IAddChatDTO } from './dto/IAddChatDTO';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  user!: IAccount;
  $user: Subject<IAccount> = new Subject<IAccount>();
  isLoggedIn: boolean =  false;
  $isLoggedIn: Subject<boolean> = new Subject<boolean>();
  isChatOpened: boolean =  false;
  $isChatOpened: Subject<boolean> = new Subject<boolean>();

  currentPage: string = "login";
  $currentPage: Subject<string> = new Subject<string>();

  fullBlog!: IBlog;
  $fullBlog: Subject<IBlog> = new Subject<IBlog>();
  profileAccount!: IAccount;
  $profileAccount: Subject<IAccount> = new Subject<IAccount>();
  chatOpened!: IChat;
  $chatOpened: Subject<IChat> = new Subject<IChat>();

  accountList!: IAccount[];
  $accountList: Subject<IAccount[]> = new Subject<IAccount[]>();
  blogList!: IBlog[];
  $blogList: Subject<IBlog[]> = new Subject<IBlog[]>();
  chatList!: IChat[];
  $chatList: Subject<IChat[]> = new Subject<IChat[]>();

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

  updateAccount(account: IAccount): void{
    this.httpService.updateAccount(account).pipe(first()).subscribe({
      next: data => {
        this.getAllAccounts();
        this.user = data;
        this.$user.next(this.user);
        this.profileAccount = data;
        this.$profileAccount.next(this.profileAccount);
        this.currentPage = "profile";
        this.$currentPage.next(this.currentPage);
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

  getChatsByUsername(username: string){
    this.httpService.getChatsByUsername(username).pipe(first()).subscribe({
      next: data => {
        this.chatList = data;
        this.$chatList.next(this.chatList);
      },
      error: (err) => {
        alert(err);
      }
    })
  }

  createChat(chat: IAddChatDTO) {
    this.httpService.createChat(chat).pipe(first()).subscribe({
      next: data => {
        this.chatOpened = data;
        this.$chatOpened.next(this.chatOpened);
        this.isChatOpened = true;
        this.$isChatOpened.next(true);
        this.getChatsByUsername(this.user.username);
      },
      error: (err) => {
        alert(err);
      }
    })
  }

  updateChat(chat: IChat){
    this.httpService.updateChat(chat).pipe(first()).subscribe({
      next: data => {
        this.getChatsByUsername(this.user.username);
        for(let chat of data){
          if(chat.id == this.chatOpened.id){
            this.chatOpened = chat;
            this.$chatOpened.next(this.chatOpened);
          }
        }
      },
      error: (err) => {
        alert(err);
      }
    })
  }

  addMessage(newMessage: IAddMessageDTO, chatId: number) {
    this.httpService.addMessage(newMessage,chatId).pipe(first()).subscribe({
      next: data => {
        this.getChatsByUsername(this.user.username);
        for(let chat of data){
          if(chat.id == this.chatOpened.id){
            this.chatOpened = chat;
            this.$chatOpened.next(this.chatOpened);
          }
        }
      },
      error: (err) => {
        alert(err);
      }
    })
  }
}
