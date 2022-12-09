import { Component } from '@angular/core';
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


  constructor(private data: DataService) {
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
    const updatedAccount: IAccount =
      {
        id: this.data.profileAccount.id,
        username: this.editUsername,
        password: this.editPassword,
        profilePic: this.imageURL
      }
    this.data.updateAccount(updatedAccount);
  }

  badImg($event: ErrorEvent) {
    // @ts-ignore
    event.target.src='https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-1-scaled-1150x647.png';
  }
}
