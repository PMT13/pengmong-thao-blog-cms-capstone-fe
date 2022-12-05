import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IAccount} from "./Interfaces/IAccount";
import {Observable} from "rxjs";
import { IBlog } from './Interfaces/IBlog';
import { IAddAccountDTO } from './dto/IAddAccountDTO';
import { IComment } from './Interfaces/IComment';
import { IAddCommentDTO } from './dto/IAddCommentDTO';
import { IAddBlogDTO } from './dto/IAddBlogDTO';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private httpClient: HttpClient) {
  }

  getAllAccounts() {
    return this.httpClient.get('http://localhost:8080/api/account/all') as Observable<IAccount[]>;
  }

  getAccountById(creatorId: number) {
    return this.httpClient.get('http://localhost:8080/api/account/id/' + creatorId) as Observable<IAccount>;
  }
  
  createAccount(account: IAddAccountDTO){
    return this.httpClient.post('http://localhost:8080/api/account',account) as Observable<IAccount>;
  }
  
  getAllBlogs() {
    return this.httpClient.get('http://localhost:8080/api/blog/all') as Observable<IBlog[]>;
  }
  
  createBlog(blog: IAddBlogDTO){
    return this.httpClient.post('http://localhost:8080/api/blog',blog) as Observable<IBlog>;
  }
  
  updateBlog(blog: IBlog){
    return this.httpClient.put('http://localhost:8080/api/blog', blog) as Observable<IBlog[]>;
  }
  
  deleteBlog(blogId: number){
    return this.httpClient.delete('http://localhost:8080/api/blog/' + blogId) as Observable<IBlog[]>;
  }
  
  addComment(comment: IAddCommentDTO, blogId: number){
    return this.httpClient.post('http://localhost:8080/api/comment/' + blogId,comment) as Observable<IBlog[]>;
  }
  
  updateComment(comment: IComment){
    return this.httpClient.put('http://localhost:8080/api/comment',comment) as Observable<IBlog[]>;
  }

  deleteComment(commentId: number, blogId: number){
    return this.httpClient.delete('http://localhost:8080/api/comment/' + blogId + "/" + commentId) as Observable<IBlog[]>;
  }
}
