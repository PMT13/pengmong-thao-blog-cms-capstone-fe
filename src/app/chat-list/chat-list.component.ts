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
        this.chatList = data.reverse();
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
    this.chatList = this.data.chatList.reverse();
    this.user = this.data.user;
  }

  openChat(i: number) {
    this.data.chatOpened = this.chatList[i];
    this.data.$chatOpened.next(this.data.chatOpened);
    this.data.isChatOpened = true;
    this.data.$isChatOpened.next(true);
    if(this.user.username === this.chatList[i].person1){
      this.chatList[i].lastVisitedPerson1 = new Date().toString();
    }else{
      if(this.user.username === this.chatList[i].person2){
        this.chatList[i].lastVisitedPerson2 = new Date().toString();
      }
    }
    this.data.updateChat(this.chatList[i]);
  }

  countNewMessages(i:number): number{
    let newMessagesCount = 0;
    if(this.user.username === this.chatList[i].person1){
      for(let message of this.chatList[i].messages){
        if(this.chatList[i].lastVisitedPerson1 < message.dateCreated){
          if(message.creator !== this.user.username){
            newMessagesCount++;
          }
        }
      }
    }else{
      if (this.user.username === this.chatList[i].person2) {
        for (let message of this.chatList[i].messages) {
          if (this.chatList[i].lastVisitedPerson2 < message.dateCreated) {
            if(message.creator !== this.user.username){
              newMessagesCount++;
            }
          }
        }
      }
    }
    return newMessagesCount;
  }

  getChatParticipant(participant: string) {
    const participantAccount = this.data.accountList.find(account => account.username === participant);
    if(participantAccount !== undefined){
      return participantAccount;
    }
    return this.data.user;
  }
}
