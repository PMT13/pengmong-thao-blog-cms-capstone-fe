import { Component, Input } from '@angular/core';
import { DataService } from '../data.service';
import { IBlog } from '../Interfaces/IBlog';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent {
  @Input() blog!: IBlog;


  constructor(private data: DataService) {
  }

// have editing and deleting be on full blog page

  goToFullBlog() {
    this.data.setPage("fullBlog");
    this.data.fullBlog = this.blog; 
  }
}
