import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { DataService } from '../data.service';
import { EditAccountDialogComponent } from '../edit-account-dialog/edit-account-dialog.component';
import { IAccount } from '../Interfaces/IAccount';
import { IBlog } from '../Interfaces/IBlog';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit, OnDestroy{

  profile!: IAccount;
  blogList: IBlog[] = [];
  user!: string;
  
  sub!: Subscription;
  subTwo!: Subscription;

  constructor(private data: DataService, public dialog: MatDialog) {
    this.sub = this.data.$blogList.subscribe({
      next: data => {
        if(data !== null || data !== undefined) {
          this.blogList = data.filter(blog => blog.creatorId === this.profile.id).sort(function (a, b) {
            return Date.parse(b.dateUpdated) - Date.parse(a.dateUpdated)
          });
        }
      },
      error: (err) => {
        alert(err);
      }
    })
    this.subTwo = this.data.$profileAccount.subscribe({
      next: data => {
        this.profile = data;
        if(this.data.blogList !== null || this.data.blogList !== undefined) {
          this.blogList = this.data.blogList.filter(blog => blog.creatorId === this.profile.id).sort(function (a, b) {
            return Date.parse(b.dateUpdated) - Date.parse(a.dateUpdated)
          });
        }
      },
      error: err =>{
        alert(err);
      }
    })
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
    this.subTwo.unsubscribe();
  }

  ngOnInit(): void {
    this.profile = this.data.profileAccount;
    this.user = this.data.user.username;
    if(this.data.blogList !== null || this.data.blogList !== undefined) {
      this.blogList = this.data.blogList.filter(blog => blog.creatorId === this.profile.id).sort(function (a, b) {
        return Date.parse(b.dateUpdated) - Date.parse(a.dateUpdated)
      });
    }
  }

  openDialog() {
    this.dialog.open(EditAccountDialogComponent,{
      height: 'fit-content',
      width: '600px',
    });
  }
}
