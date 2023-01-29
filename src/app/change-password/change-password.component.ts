import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuComponent } from '../menu/menu.component';
import { AccountLoginComponent } from '../account-login/account-login.component';
import { UserManager } from '../user-manager';

const PASS_DETAILS: string = "PASS_DETAILS";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  crntPwd: string = "";
  nwPwd: string = "";
  nw2Pwd: string = "";
  jobDone: boolean = false;
  edit?: boolean = false;
  clsRed:boolean=true;
  constructor(private router_srv: Router) { 
    MenuComponent.setShowMenu(false);
  }

  ngOnInit(): void {
    if (!UserManager.isUserSignedIn())
      this.router_srv.navigateByUrl('/AccountLogin');
  }
  updIt() {
    this.edit = false;
    this.jobDone = false;
    if (this.crntPwd.trim() == "" ) {
      UserManager.showErrorFocus("שדה סיסמא נוכחית חובה", "crntpwd" );
      this.changeDetails();
      return;
    }
    if (this.nwPwd.trim() == "" ) {
      UserManager.showErrorFocus("שדה סיסמא מבוקשת חובה",  "nwpwd" );
      this.changeDetails();
      return;
    }
    if (this.nw2Pwd.trim() == "") {
      UserManager.showErrorFocus("שדה וידוא סיסמא הינו חובה", "nw2pwd");
      this.changeDetails();
      return;
    }
    if (!UserManager.isPwdOk(this.crntPwd.trim())) {
      UserManager.showErrorFocus("סיסמא נוכחית שגויה", "crntpwd");
      this.changeDetails();
      return;
    }
    if ((this.nwPwd.trim() != this.nw2Pwd.trim())) {
      UserManager.showErrorFocus(" סיסמא מבוקשת ווידואה חייבות להיות זהות", "nw2pwd");
      this.changeDetails();
      return;
    }
    if ((this.crntPwd.trim() == this.nwPwd.trim())) {
      UserManager.showErrorFocus(" סיסמא מבוקשת  חייבת להיות שונה מנוכחית", "crntpwd");
      this.changeDetails();
      return;
    }
    this.jobDone = true;
    UserManager.changePwd(this.nwPwd.trim());
  }

  changeDetails(): void {
    this.edit = true;
    AccountLoginComponent.theUserCredentials.pwd = this.nwPwd;
    localStorage.setItem(PASS_DETAILS, JSON.stringify(this.nwPwd));
  }
}
