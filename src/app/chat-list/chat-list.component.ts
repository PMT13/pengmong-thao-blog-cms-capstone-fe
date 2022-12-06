import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from '../data.service';
import { IAccount } from '../Interfaces/IAccount';
import { IChat } from '../Interfaces/IChat';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.css']
})
export class ChatListComponent implements OnInit, OnDestroy{
  chatList!: IChat[];
  user!: IAccount;
  
  sub!: Subscription;
  subTwo!: Subscription;
  
  constructor(private data: DataService) {
    this.sub = this.data.$chatList.subscribe({
      next: data => {
        this.chatList = data;
      },
      error: err => {
        alert(err);
      }
    })
    this.subTwo = this.data.$user.subscribe({
      next: data => {
        this.user = data;
      },
      error: err => {
        alert(err);
      }
    })
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
    this.subTwo.unsubscribe();
  }

  ngOnInit(): void {
    this.chatList = this.data.chatList;
    this.user = this.data.user;
  }

  openChat(i: number) {
    this.data.chatOpened = this.chatList[i];
    this.data.$chatOpened.next(this.data.chatOpened);
    this.data.isChatOpened = true;
    this.data.$isChatOpened.next(true);
  }
}
