import {AfterViewChecked, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from '../data.service';
import { IAddMessageDTO } from '../dto/IAddMessageDTO';
import { IMessage } from '../Interfaces/IMessage';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy, AfterViewChecked{
  @ViewChild('chat')
  private myScrollContainer!: ElementRef;

  messages!: IMessage[];
  chattingWith!: string;
  messageInput: string = "";

  sub!: Subscription;

  constructor(private data: DataService) {
    this.sub = this.data.$chatOpened.subscribe({
      next: data => {
        this.messages = data.messages.sort(function(a, b){return Date.parse(a.dateCreated) - Date.parse(b.dateCreated)});
        if(data.person1 === this.data.user.username){
          this.chattingWith = data.person2;
        }else{
          this.chattingWith = data.person1;
        }
      },
      error: err =>{
        alert(err)
      }
    })
  }

  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
  ngOnInit(): void {
    this.messages = this.data.chatOpened.messages.sort(function(a, b){return Date.parse(a.dateCreated) - Date.parse(b.dateCreated)});
    if(this.data.chatOpened.person1 === this.data.user.username){
      this.chattingWith = this.data.chatOpened.person2;
    }else{
      this.chattingWith = this.data.chatOpened.person1;
    }
    this.scrollToBottom();
  }

  //Referenced from https://stackoverflow.com/questions/35232731/angular-2-scroll-to-bottom-chat-style
  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch(err) { }
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
