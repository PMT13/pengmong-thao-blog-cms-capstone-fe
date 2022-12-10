import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DataService } from '../data.service';
import { IAccount } from '../Interfaces/IAccount';

@Component({
  selector: 'app-edit-account-dialog',
  templateUrl: './edit-account-dialog.component.html',
  styleUrls: ['./edit-account-dialog.component.css']
})
export class EditAccountDialogComponent {
  editUsername: string;
  editPassword: string;
  imageURL: string;
  error: boolean = false;

  constructor(private data: DataService, private dialogRef: MatDialogRef<EditAccountDialogComponent>) {
    this.editUsername = this.data.profileAccount.username;
    this.editPassword = this.data.profileAccount.password;
    this.imageURL = this.data.profileAccount.profilePic;
  }

  cancelEdit() {
    this.editUsername = this.data.profileAccount.username;
    this.editPassword = this.data.profileAccount.password;
    this.imageURL = this.data.profileAccount.profilePic;
  }

  saveAccount() {
    const accountExist = this.data.accountList.find((account) => {return account.username === this.editUsername});
    if(accountExist !== undefined){
      if(accountExist.username !== this.data.user.username) {
        this.data.errorMsg = "Username already exists.";
        this.data.$errorMsg.next(this.data.errorMsg);
        this.error = true;
        return;
      }
    }
    if(this.editUsername === undefined || this.editPassword === undefined){
      this.data.errorMsg = "Please fill in all input fields";
      this.data.$errorMsg.next(this.data.errorMsg);
      this.error = true;
      return;
    }
    if(this.editUsername.includes(" ")){
      this.data.errorMsg = "No spaces allowed in input fields";
      this.data.$errorMsg.next(this.data.errorMsg);
      this.error = true;
      return;
    }
    if(this.editUsername === "" || this.editPassword === ""){
      this.data.errorMsg = "Please fill in all input fields";
      this.data.$errorMsg.next(this.data.errorMsg);
      this.error = true;
      return;
    }
    const updatedAccount: IAccount =
      {
        id: this.data.profileAccount.id,
        username: this.editUsername,
        password: this.editPassword,
        profilePic: this.imageURL
      }

    for(let blog of this.data.blogList){
      for(let comment of blog.comments){
        if(comment.creator === this.data.profileAccount.username){
          comment.creator = this.editUsername;
          this.data.updateComment(comment);
        }
      }
      for(let view of blog.views){
        if(view === this.data.profileAccount.username){
          blog.views[blog.views.indexOf(view)] = this.editUsername;
          console.log(view);
          this.data.updateBlog(blog);
        }
      }
    }
    this.data.updateAccount(updatedAccount);
    this.dialogRef.close();
  }

  badImg($event: ErrorEvent) {
    // @ts-ignore
    event.target.src='https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-1-scaled-1150x647.png';
  }
}
