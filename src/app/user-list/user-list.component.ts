import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from '../data.service';
import { IAddChatDTO } from '../dto/IAddChatDTO';
import { IAccount } from '../Interfaces/IAccount';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit, OnDestroy{

  showFiller = -1;
  accountList!: IAccount[];
  user!: IAccount;
  searchInput!: string;
  
  sub!: Subscription;
  subTwo!: Subscription;
  subThree!: Subscription;

  constructor(private data: DataService) {
    this.sub = this.data.$accountList.subscribe({
      next: data => {
        this.accountList = data;
      },
      error: (err) => {
        alert(err);
      }
    })

    this.subTwo = this.data.$isLoggedIn.subscribe({
      next: data => {
        if(data === false){
          this.showFiller = -1;
        }
      },
      error: (err) => {
        alert(err);
      }
    })

    this.subThree = this.data.$user.subscribe({
      next: data => {
        this.user = data;
        this.data.getChatsByUsername(this.user.username);
      },
      error: (err) => {
        alert(err);
      }
    })
  }

  ngOnInit(): void {
    this.accountList = this.data.accountList;
    this.user = this.data.user;
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
    this.subTwo.unsubscribe();
  }

  goToProfile(account:IAccount): void{
    this.data.currentPage = "profile";
    this.data.$currentPage.next(this.data.currentPage);
    this.data.profileAccount = account;
    this.data.$profileAccount.next(account);
  }

  showOptions(i: number): void{
    if(this.showFiller === -1 || this.showFiller !== i) {
      this.showFiller = i;
    }else{
      this.showFiller = -1;
    }
  }

  startChat(username: string): void {
    for(let chat of this.data.chatList){
      if((chat.person1 === username && chat.person2 === this.data.user.username) || (chat.person2 === username && chat.person1 === this.data.user.username)){
        this.data.chatOpened = chat;
        this.data.$chatOpened.next(this.data.chatOpened);
        this.data.isChatOpened = true;
        this.data.$isChatOpened.next(true);
        return;
      }
    }
    const newChat:IAddChatDTO =
      {
        person1: this.user.username,
        person2: username,
        messages: [],
        lastVisitedPerson1: new Date().toString(),
        lastVisitedPerson2: ''
      }
    this.data.createChat(newChat);
  }

  filter() {
    this.accountList = this.data.accountList.filter(account => account.username.includes(this.searchInput));
  }
}
