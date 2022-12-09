import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from '../data.service';

@Component({
  selector: 'app-error-alert',
  templateUrl: './error-alert.component.html',
  styleUrls: ['./error-alert.component.css']
})
export class ErrorAlertComponent implements OnDestroy,OnInit{
  errorMsg: string = "";

  sub!: Subscription;
  
  constructor(private data: DataService) {
    this.sub = this.data.$errorMsg.subscribe({
      next: data =>{
        this.errorMsg = data; 
      },
      error: err => {
        alert(err);
      }
    })
  }

  ngOnInit(): void {
    this.errorMsg = this.data.errorMsg;
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
