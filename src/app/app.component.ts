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
  
  user!: string;
  isloggedIn!: boolean;
  currentPage!: string;
  isChatOpened!: boolean;
  
  sub!: Subscription;
  subTwo!: Subscription;
  subThree!: Subscription; 
  
  constructor(private data: DataService) {
    this.isloggedIn = this.data.isLoggedIn;
    this.currentPage = this.data.currentPage;
    this.isChatOpened = this.data.isChatOpened;
    
    this.sub = this.data.$isLoggedIn.subscribe({
      next: isloggedIn => {
        this.isloggedIn = isloggedIn;
        if(isloggedIn === true){
          this.user = data.user.username;
        }
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

    this.subThree = this.data.$isChatOpened.subscribe({
      next: data => {
        this.isChatOpened = data; 
      },
      error: (err) => {
        alert(err);
      }
    })
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
    this.subTwo.unsubscribe();
    this.subThree.unsubscribe();
  }

  goToBlogsList() {
    this.data.setPage("blogsList");
  }

  goToUsersList() {
    this.data.setPage("usersList");
  }

  goToProfile() {
    this.data.currentPage = "profile";
    this.data.$currentPage.next(this.data.currentPage);
    this.data.profileAccount = this.data.user;
    this.data.$profileAccount.next(this.data.profileAccount);
  }

  goToChats() {
    this.data.currentPage = "chatsList";
    this.data.$currentPage.next(this.data.currentPage);
  }

  logout(drawer:any) {
    this.data.isLoggedIn = false;
    this.data.$isLoggedIn.next(false);
    if(drawer.opened){
      drawer.toggle()
    }
    this.data.isChatOpened = false;
    this.data.$isChatOpened.next(false);
  }
}
