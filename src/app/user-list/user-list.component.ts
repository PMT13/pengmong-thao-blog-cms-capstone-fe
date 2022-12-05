import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from '../data.service';
import { IAccount } from '../Interfaces/IAccount';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit, OnDestroy{

  accountList!: IAccount[];
  sub!: Subscription;

  constructor(private data: DataService) {
    this.sub = this.data.$accountList.subscribe({
      next: data => {
        this.accountList = data;
      },
      error: (err) => {
        alert(err);
      }
    })
  }

  ngOnInit(): void {
    this.accountList = this.data.accountList;
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
