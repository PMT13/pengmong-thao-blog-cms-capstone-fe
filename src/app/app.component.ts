import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy{
  title = 'pengmong-thao-blog-cms-capstone-fe';
  
  isloggedIn!: boolean;
  currentPage!: string;
  
  sub!: Subscription;
  subTwo!: Subscription;
  
  constructor(private data: DataService) {
    this.isloggedIn = this.data.isLoggedIn;
    this.currentPage = this.data.currentPage;
    
    this.sub = this.data.$isLoggedIn.subscribe({
      next: data => {
        this.isloggedIn = data;
      },
      error: (err) => {
        alert(err);
      }
    })

    this.subTwo = this.data.$currentPage.subscribe({
      next: data => {
        this.currentPage = data;
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

  goToBlogsList() {
    this.data.setPage("blogsList");
  }

  goToUsersList() {
    this.data.setPage("usersList");
  }

  goToProfile() {
    
  }

  goToMessages() {
    
  }

  logout() {
    this.data.isLoggedIn = false;
    this.data.$isLoggedIn.next(false);
  }
}
