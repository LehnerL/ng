import { Component, OnInit } from '@angular/core';
import { MenuComponent } from '../menu/menu.component';
import { AccountOwner } from '../account-owner';
import { UserManager } from '../user-manager';
import { Router } from '@angular/router';

const USER_DETAILS: string = "USER_DETAILS";

@Component({
  selector: 'app-account-owner',
  templateUrl: './account-owner.component.html',
  styleUrls: ['./account-owner.component.css']
})
export class AccountOwnerComponent implements OnInit {
  owner: AccountOwner = new AccountOwner("plonit almonit", "ta", 129387465);
  edit?: boolean = false;
  valid?: boolean = false;
  currentBalance: number = 0;
  static currentOwner?: string = AccountOwnerComponent.getUserName();
  static theUserDetails: AccountOwner = new AccountOwner("plonit almonit", "ta", 129387465);

  static loadFill(): void {
    if (localStorage.getItem(USER_DETAILS) == null) {
      localStorage.setItem(USER_DETAILS, JSON.stringify(AccountOwnerComponent.theUserDetails));
    }
    else {
      try {
        let userDetails: any = localStorage.getItem(USER_DETAILS);
        AccountOwnerComponent.theUserDetails = JSON.parse(userDetails);
      }
      catch (prblm: any) {
        localStorage.setItem(USER_DETAILS, JSON.stringify(AccountOwnerComponent.theUserDetails));
        console.log("JSON problem: " + prblm.message);
      }
    }
  }

  constructor(private router_srv: Router) {
    MenuComponent.setShowMenu(true);
  }

  ngOnInit(): void {
    if (!UserManager.isUserSignedIn())
      this.router_srv.navigateByUrl('/AccountLogin');

    AccountOwnerComponent.loadFill();
    this.owner = AccountOwnerComponent.getUserDetails();
  }

  static getUserDetails(): AccountOwner {
    let userDetails: any;
    userDetails = localStorage.getItem(USER_DETAILS);
    userDetails = JSON.parse(userDetails);
    return userDetails;
  }

  changeDetails(): void {
    this.edit = true;
    let userDetails: AccountOwner;
    userDetails = AccountOwnerComponent.getUserDetails();
  }

  updIt() {
    this.edit = false;
    if (this.owner.name?.trim() == "" || this.owner.name.trim().length < 2) {
      UserManager.showErrorFocus("שם הינו שדה חובה, נא לכתוב שם שונה מקודמו.", "shem");
      this.changeDetails();
      return;
    }
    if (this.owner.address?.trim() == "" || this.owner.address.trim().length < 2) {
      UserManager.showErrorFocus(" כתובת הינה שדה חובה, נא לכתוב שם שונה מקודמו.", "adrs");
      this.changeDetails();
      return;
    }
    AccountOwnerComponent.theUserDetails = new AccountOwner(this.owner.name, this.owner.address, this.owner.tz);
    localStorage.setItem(USER_DETAILS, JSON.stringify(AccountOwnerComponent.theUserDetails));
    this.valid = true;
  }

  static getUserName(): string {
    return AccountOwnerComponent.theUserDetails?.name;
  }
}