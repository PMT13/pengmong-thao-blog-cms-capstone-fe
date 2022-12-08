import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from '../data.service';
import { IBlog } from '../Interfaces/IBlog';
import {MatDialog} from '@angular/material/dialog';
import { CreateBlogDialogComponent } from '../create-blog-dialog/create-blog-dialog.component';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css']
})
export class BlogListComponent implements OnInit, OnDestroy{

  blogList: IBlog[] = [];
  searchInput!: string;

  sub!:Subscription;

  constructor(private data: DataService, public dialog: MatDialog) {
    this.sub = this.data.$blogList.subscribe({
      next: data => {
        if(data !== null || data !== undefined) {
          this.blogList = data.sort(function (a, b) {
            return Date.parse(b.dateUpdated) - Date.parse(a.dateUpdated)
          });
        }
      },
      error: (err) => {
        alert(err);
      }
    })
  }

  ngOnInit(): void {
    if(this.data.blogList !== null || this.data.blogList !== undefined) {
      this.blogList = this.data.blogList.sort(function (a, b) {
        return Date.parse(b.dateUpdated) - Date.parse(a.dateUpdated)
      });
    }
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  openDialog() {
    this.dialog.open(CreateBlogDialogComponent,{
      height: 'fit-content',
      width: '600px',
    });
  }

  filter() {
    this.blogList = this.data.blogList.filter(blog => blog.title.toLowerCase().includes(this.searchInput.toLowerCase()));
  }
}
