import { Component } from '@angular/core';
import { DataService } from '../data.service';
import { IAddAccountDTO } from '../dto/IAddAccountDTO';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  
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
      this.data.errorMsg = "Invalid Login";
      this.data.$errorMsg.next(this.data.errorMsg);
      this.error = true;
    }else{
      this.data.errorMsg = "Succesful Login";
      this.data.$errorMsg.next(this.data.errorMsg);
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
      this.data.errorMsg = "Username already exists.";
      this.data.$errorMsg.next(this.data.errorMsg);
      this.error = true;
      return;
    }
    if(this.username === undefined || this.password === undefined){
      this.data.errorMsg = "Please fill in all input fields";
      this.data.$errorMsg.next(this.data.errorMsg);
      this.error = true;
      return;
    }
    if(this.username.includes(" ")){
      this.data.errorMsg = "No spaces allowed in input fields";
      this.data.$errorMsg.next(this.data.errorMsg);
      this.error = true;
      return;
    }
    if(this.username === "" || this.password === ""){
      this.data.errorMsg = "Please fill in all input fields";
      this.data.$errorMsg.next(this.data.errorMsg);
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
