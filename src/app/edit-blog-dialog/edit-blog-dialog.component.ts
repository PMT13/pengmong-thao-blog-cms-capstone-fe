import { Component } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-edit-blog-dialog',
  templateUrl: './edit-blog-dialog.component.html',
  styleUrls: ['./edit-blog-dialog.component.css']
})
export class EditBlogDialogComponent {

  blogTitle: string = "";
  blogBody: string = "";


  constructor(private data: DataService) {
    this.blogTitle = this.data.fullBlog.title;
    this.blogBody = this.data.fullBlog.body;
  }

  cancelEdit() {
    this.blogTitle = this.data.fullBlog.title;
    this.blogBody = this.data.fullBlog.body;
  }

  saveBlog() {
    this.data.fullBlog.title = this.blogTitle;
    this.data.fullBlog.body = this.blogBody;
    this.data.fullBlog.dateUpdated = new Date().toString();
    this.data.updateBlog(this.data.fullBlog);
  }
}
