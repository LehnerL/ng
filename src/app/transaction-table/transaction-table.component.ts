import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BankTransaction, TransactionType } from '../bank-transaction';
import { MenuComponent } from '../menu/menu.component';
import { UserManager } from '../user-manager';
import { BankAccountDetails } from '../bank-account-details';
import { TransactionManager } from '../transaction-manager';

@Component({
  selector: 'app-transaction-table',
  templateUrl: './transaction-table.component.html',
  styleUrls: ['./transaction-table.component.css']
})
export class TransactionTableComponent implements OnInit {
  lastActionFail: boolean = false;
  show_action: boolean = true;
  all_actions: BankTransaction[] = [];
  transactionTypeNames: string[] = [];
  currentBalance: number = 0;
  accountDetails: BankAccountDetails;
  transaction?: BankTransaction = undefined;
  
  constructor(private router_srv: Router) { 
    MenuComponent.setShowMenu(true);
    this.accountDetails = new BankAccountDetails("Rimonim Givataim", 762, 113344);

    for (let optn in TransactionType)
      if (isNaN(Number(optn)))
        this.transactionTypeNames.push(optn);
  }

  ngOnInit(): void {
    if (!UserManager.isUserSignedIn())
    this.router_srv.navigateByUrl('/AccountLogin');

    TransactionManager.loadFill();
    let allTransactions: BankTransaction[] = TransactionManager.getAllTransactions();
    if (allTransactions.length > 0 && allTransactions != null) {
      this.all_actions = allTransactions;
      //console.log(this.all_actions);
    }

    if (this.currentBalance<0) {
      this.lastActionFail = true;
      return;
    }
  }
}
