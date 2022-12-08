import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import {first, Subscription } from 'rxjs';
import { DataService } from '../data.service';
import { HttpService } from '../http.service';
import { IAccount } from '../Interfaces/IAccount';
import { IBlog } from '../Interfaces/IBlog';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit, OnDestroy{
  @Input() blog!: IBlog;
  user!: IAccount;
  blogAuthor!: string;
  sub:Subscription;

  constructor(private data: DataService, private httpService: HttpService) {
    this.sub = this.data.$user.subscribe({
      next: data =>{
        this.user = data;
      },
      error: err => {
        alert(err)
      }
    })
  }

  ngOnInit(): void {
    this.user = this.data.user;
    this.httpService.getAccountById(this.blog.creatorId).pipe(first()).subscribe({
      next: data => {
        this.blogAuthor = data.username;
      },
      error: (err) => {
        alert(err);
      }
    })
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  goToFullBlog() {
    this.data.fullBlog = this.blog; 
    this.data.$fullBlog.next(this.blog);
    this.data.setPage("fullBlog");
    if(!this.blog.views.includes(this.data.user.username)){
      this.blog.views.push(this.data.user.username);
      this.data.updateBlog(this.blog);
    }
  }
}
