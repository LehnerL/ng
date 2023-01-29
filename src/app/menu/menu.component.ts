import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserManager } from '../user-manager';
import { BankTransaction } from '../bank-transaction';
import { AccountOwnerComponent } from '../account-owner/account-owner.component';
import { TransactionManager } from '../transaction-manager';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  static showMenu: boolean = true;
  all_actions?: BankTransaction[];
  currentTransaction?: BankTransaction;
  currentOwner: string = "";
  constructor(private route: ActivatedRoute, private router_srv: Router) {

  }

  ngOnInit(): void {
    this.getUserName();
    this.getBalance();
  }

  logOut(): void {
    UserManager.byeUser();
    this.router_srv.navigateByUrl('/AccountLogin');
  }

  getShowMenu(): boolean {
    return MenuComponent.showMenu;
  }

  static setShowMenu(changeVlue: boolean): void {
    this.showMenu = changeVlue;
  }

  static getAllActions() {
    return TransactionManager.getAllTransactions();
  }

  getUserName(): string {
    AccountOwnerComponent.loadFill();
    return AccountOwnerComponent.getUserName();
  }

  getBalance(): string {
    return TransactionManager.getBalance().toString();
  }
}
