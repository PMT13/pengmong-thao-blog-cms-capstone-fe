import { Component } from '@angular/core';
import { DataService } from '../data.service';
import { IAddBlogDTO } from '../dto/IAddBlogDTO';

@Component({
  selector: 'app-create-blog-dialog',
  templateUrl: './create-blog-dialog.component.html',
  styleUrls: ['./create-blog-dialog.component.css']
})
export class CreateBlogDialogComponent {  
  blogTitle: string = "";
  blogBody: string = "";
  
  constructor(private data: DataService) {
  }

  cancel() {
    this.blogTitle = "";
    this.blogBody = "";
  }

  saveBlog() {
    const newBlog: IAddBlogDTO =
      {
        title: this.blogTitle,
        dateCreated: new Date().toString(),
        dateUpdated: new Date().toString(),
        body: this.blogBody,
        creatorId: this.data.user.id,
        views: [],
        comments: []
      }
    this.data.createBlog(newBlog);
  }
}
