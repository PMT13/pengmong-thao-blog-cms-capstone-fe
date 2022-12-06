import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from '../data.service';
import { IAddMessageDTO } from '../dto/IAddMessageDTO';
import { IMessage } from '../Interfaces/IMessage';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy{

  messages!: IMessage[];
  participants!: string;
  messageInput: string = ""; 
  
  sub!: Subscription;
  
  constructor(private data: DataService) {
    this.sub = this.data.$chatOpened.subscribe({
      next: data => {
        this.messages = data.messages.sort(function(a, b){return Date.parse(a.dateCreated) - Date.parse(b.dateCreated)});
        this.participants = "(" + data.person1 + "," + data.person2 + ")";
      },
      error: err =>{
        alert(err)
      }
    })
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
  ngOnInit(): void {
    this.messages = this.data.chatOpened.messages.sort(function(a, b){return Date.parse(a.dateCreated) - Date.parse(b.dateCreated)});
    this.participants = "(" + this.data.chatOpened.person1 + "," + this.data.chatOpened.person2 + ")";
  }

  sendMessage(){
    const newMessage: IAddMessageDTO = {
      creator: this.data.user.username,
      body: this.messageInput,
      dateCreated: new Date().toString()
    }
    this.data.addMessage(newMessage,this.data.chatOpened.id);
    this.messageInput = "";
  }
  
  closeChat() {
    this.data.isChatOpened = false;
    this.data.$isChatOpened.next(false);
    this.messageInput = "";
  }
}
