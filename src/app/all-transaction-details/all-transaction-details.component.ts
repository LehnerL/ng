import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserManager } from '../user-manager';
import { BankTransaction, TransactionType } from '../bank-transaction';
import { MenuComponent } from '../menu/menu.component';
import { TransactionManager } from '../transaction-manager';

const BALANCE: string = "BALANCE";

@Component({
  selector: 'app-all-transaction-details',
  templateUrl: './all-transaction-details.component.html',
  styleUrls: ['./all-transaction-details.component.css']
})
export class AllTransactionDetailsComponent implements OnInit {
  all_actions: BankTransaction[] = TransactionManager.getAllTransactions();
  counter?: number;
  transactionTypeNames: string[] = [];
  currentTransaction?: BankTransaction;
  balance?: any = localStorage.getItem(BALANCE);
  note?: string;

  constructor(private route: ActivatedRoute, private router_srv: Router) {
    MenuComponent.setShowMenu(false);

    for (let optn in TransactionType)
      if (isNaN(Number(optn)))
        this.transactionTypeNames.push(optn);
  }

  ngOnInit(): void {
    if (!UserManager.isUserSignedIn())
      this.router_srv.navigateByUrl('/AccountLogin');

    this.counter = TransactionManager.getCounter();
    const id = this.route.snapshot.paramMap.get('counter');
    if (id) {
      this.currentTransaction = TransactionManager.getActionById(id);
    }
    this.balance = TransactionManager.getBalance();
    this.all_actions = TransactionManager.getAllTransactions();
  }

  deleteAction(counter: any): void {
    counter = this.route.snapshot.paramMap.get('counter');
    let confirmDelete = TransactionManager.onDeleteConfirmMsg(counter);
    if (confirmDelete) {
      TransactionManager.deleteAction(counter);
      this.router_srv.navigateByUrl('/Transactions');
    }
  }
}
