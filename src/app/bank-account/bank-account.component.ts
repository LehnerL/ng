import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BankAccountDetails } from '../bank-account-details';
import { TransactionType, BankTransaction } from '../bank-transaction';
import { UserManager } from '../user-manager';
import { MenuComponent } from '../menu/menu.component';
import { TransactionManager } from '../transaction-manager';

@Component({
  selector: 'app-bank-account',
  templateUrl: './bank-account.component.html',
  styleUrls: ['./bank-account.component.css']
})

export class BankAccountComponent implements OnInit {
  static currentBalance: number = 0;
  static transaction?: BankTransaction = undefined;
  static note?: string = BankAccountComponent.note;
  static all_actions: BankTransaction[];

  currentAmount: number = 0;
  currentBalance: number = 0;
  transaction?: BankTransaction = undefined;
  accountDetails: BankAccountDetails;
  currentTransactionType: TransactionType = -1;
  currentTransactionAsmachta: string = "";
  currentTransactionDateS: string = "";
  transactionTypeNames: string[] = [];
  lastActionFail: boolean = false
  show_action: boolean = false;
  all_actions: BankTransaction[] = [];
  note?: string;
  currentCnt: number = 1;
  asmachtaSign: string = '#';

  constructor(private router_srv: Router) {
    this.accountDetails = new BankAccountDetails("Rimonim Givataim", 762, 113344);
    MenuComponent.setShowMenu(true);

    for (let optn in TransactionType)
      if (isNaN(Number(optn)))
        this.transactionTypeNames.push(optn);
  }

  ngOnInit(): void {
    if (!UserManager.isUserSignedIn())
      this.router_srv.navigateByUrl('/AccountLogin');

    this.all_actions = TransactionManager.getAllTransactions();
    // TransactionManager.resetCounter();
  }

  doTransaction(): void {
    this.lastActionFail = false;
    if (this.currentAmount.toString().trim() == "") {
      UserManager.showErrorFocus("סכום חובה", "amount");
      return;
    }
    if (this.currentAmount == null || this.currentAmount < 0) {
      UserManager.showErrorFocus("סכום חייב להיות מספר לא שלילי", "amount");
      return;
    }

    if (this.currentTransactionDateS.trim() == "") {
      UserManager.showErrorFocus("תאריך חובה", "taarich");
      return;
    }
    if (this.currentTransactionType.toString().trim() == "") {
      UserManager.showErrorFocus("סוג פעולה חובה", "sugpeula");
      return;
    }

    let achshav: Date = new Date();
    let typedDt: Date = new Date(this.currentTransactionDateS);

    if (typedDt > achshav) {
      UserManager.showErrorFocus("תאריך מאוחר מהיום או מוקדם מפעולה אחרונה הינו אסור", "taarich");
      return;
    }

    let allTransactions: BankTransaction[] = TransactionManager.getAllTransactions();
    if (allTransactions.length > 0 && allTransactions != null) {
      let lastTypedDt: Date = new Date(String(allTransactions[allTransactions.length - 1].trnDate));
      if (lastTypedDt > typedDt) {
        UserManager.showErrorFocus("תאריך מוקדם מפעולה אחרונה הינו אסור", "taarich");
        return;
      }
    }

    this.currentBalance = TransactionManager.getBalance();
    switch (this.currentTransactionType * 1) {
      case TransactionType.openAcount: this.currentBalance = this.currentAmount;
        break;
      case TransactionType.deposit: this.currentBalance += this.currentAmount;
        break;
      case TransactionType.withdraw: if ((this.currentBalance - this.currentAmount) < this.accountDetails.limit) {
        this.lastActionFail = true;
        return;
      }
        this.currentBalance -= this.currentAmount;
        break;
      default: UserManager.showErrorFocus('לא בחרת סוג פעולה', "sugpeula");
        return;
    }

    let allTransactionsLength: number = this.getArrayLength();
    if (allTransactionsLength == 0) {

      if (this.currentTransactionType == TransactionType.openAcount) {
        if (typedDt.getDate() - achshav.getDate() != 0) {
          this.currentTransactionAsmachta = this.asmachtaSign + this.currentCnt;
          UserManager.showErrorFocus("פתיחת חשבון מתבצעת רק בתאריך הנוכחי", "taarich");
          return;
        }
      }

      if (this.currentTransactionType != TransactionType.openAcount) {
        if (this.currentTransactionType == TransactionType.deposit) {
          this.currentTransactionType = TransactionType.openAcount;
          this.note = 'סוג הפעולה הראשוני הינו פתיחת חשבון';
          this.currentTransactionAsmachta = this.asmachtaSign + this.currentCnt;
          UserManager.showErrorFocus('סוג הפעולה הראשוני הינו פתיחת חשבון', "sugpeula");
          return;
        }
        else {
          UserManager.showErrorFocus('חלה שגיאה, הפעולה איננה בוצעה.', "sugpeula");
          return;
        }
      }
    }

    if (allTransactionsLength > 0) {
      this.currentCnt = TransactionManager.getCounter();
      if (this.currentTransactionAsmachta.trim() == "" || this.currentTransactionAsmachta.trim() == this.asmachtaSign + this.currentCnt) {
        TransactionManager.increaseCounter();
        this.currentCnt = TransactionManager.getCounter();
        this.currentTransactionAsmachta = this.asmachtaSign + this.currentCnt;
        this.all_actions[this.all_actions.length - 1].asmachta = this.asmachtaSign + this.currentCnt;
      }
    }

    this.transaction = new BankTransaction(this.currentAmount, new Date(this.currentTransactionDateS), this.currentTransactionAsmachta, this.currentTransactionType, this.currentBalance, this.note, TransactionManager.getCounter());
    TransactionManager.addTransaction(this.transaction);
  }

  toString(): string {
    let ezer = `${this.transaction} into ${this.accountDetails}`;
    return ezer;
  }

  getArrayLength(): number {
    return TransactionManager.getArrayLength();
  }
}
