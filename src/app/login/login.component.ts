import { Component } from '@angular/core';
import { DataService } from '../data.service';
import { IAddAccountDTO } from '../dto/IAddAccountDTO';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  errorMsg: string = "";
  error: boolean = false;

  username: string = "";
  password: string = "";

  constructor(private data: DataService) {
  }

  login(): void {
    const foundAccount = this.data.accountList.find((account) => {
      return account.username === this.username &&
        account.password === this.password
    });
    if( foundAccount === undefined){
      this.errorMsg = "Invalid Login";
      this.error = true;
    }else{
      this.errorMsg = "Succesful Login";
      this.error = true;
      this.data.user = foundAccount;
      this.data.$user.next(foundAccount);
      this.data.isLoggedIn = true;
      this.data.$isLoggedIn.next(true);
      this.data.getChatsByUsername(foundAccount.username);
      this.data.setPage("blogsList");
    }
  }

  register(): void {
    const accountExist = this.data.accountList.find((account) => {return account.username === this.username});
    if( accountExist !== undefined){
      this.errorMsg = "Username already exists.";
      this.error = true;
      return;
    }
    if(this.username === undefined || this.password === undefined){
      this.errorMsg = "Please fill in all input fields";
      this.error = true;
      return;
    }
    if(this.username.replace(/\s/g, '') === "" || this.password.replace(/\s/g, '') === ""){
      this.errorMsg = "Please fill in all input fields";
      this.error = true;
      return;
    }
    const newAccount: IAddAccountDTO =
      {
        username:this.username,
        password:this.password,
        profilePic: "https://t4.ftcdn.net/jpg/05/09/59/75/360_F_509597532_RKUuYsERhODmkxkZd82pSHnFtDAtgbzJ.jpg"
      }
    this.data.createAccount(newAccount);
  }
}
