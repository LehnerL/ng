import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserCredentials } from '../user-credentials';
import { UserManager } from '../user-manager';
import { MenuComponent } from '../menu/menu.component';

@Component({
  selector: 'app-account-login',
  templateUrl: './account-login.component.html',
  styleUrls: ['./account-login.component.css']
})
export class AccountLoginComponent implements OnInit {
  doel?: string;
  sisma?: string;
  private static currentUser?: UserCredentials;
  static theUserCredentials: UserCredentials = new UserCredentials("siteAdmin@bigbank.com", "1234");
  constructor(private router_srv: Router) {
    MenuComponent.setShowMenu(false);
  }

  ngOnInit(): void {
  }

  logIn(): void {
    if (UserManager.validateUser(this.doel?.trim(), this.sisma?.trim())) {
      UserManager.userSignedIn();
      this.router_srv.navigateByUrl('/BankAccount');
    }
   
    else {
      UserManager.showErrorFocus("שם המשתמש או הסיסמא או הצירוף שגוי", "pwd");
      return;
    }
  }
}
