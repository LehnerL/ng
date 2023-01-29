import { Component, OnInit } from '@angular/core';
import { UserManager } from '../user-manager';
import { BankAccountDetails } from '../bank-account-details';
import { Router } from '@angular/router';
import { MenuComponent } from '../menu/menu.component';

const BANK_DETAILS: string = "BANK_DETAILS";

@Component({
  selector: 'app-bank-details',
  templateUrl: './bank-details.component.html',
  styleUrls: ['./bank-details.component.css']
})
export class BankDetailsComponent implements OnInit {
  static bankDetails: BankAccountDetails = new BankAccountDetails("Rimonim Givataim", 762, 113344);
  edit?: boolean = false;
  valid?: boolean = false;
  branchName: string = BankDetailsComponent.bankDetails.branchName;
  branchNumber: number = BankDetailsComponent.bankDetails.branchNumber;
  accountNumber: number = BankDetailsComponent.bankDetails.accountNumber;
  showName: boolean = false;
  currentBalance: number = 0;
  constructor(private router_srv: Router) {
    MenuComponent.setShowMenu(true);
  }

  ngOnInit(): void {
    if (!UserManager.isUserSignedIn())
      this.router_srv.navigateByUrl('/AccountLogin');

    BankDetailsComponent.loadFill(); 
    this.getBankDetails();
  }

  getBankDetails(): BankAccountDetails {
    let bankDetails: any;
    bankDetails = localStorage.getItem(BANK_DETAILS);
    bankDetails = JSON.parse(bankDetails);
 
    if (bankDetails != "" && bankDetails != null) {
      this.branchName = bankDetails.branchName;
      this.branchNumber = bankDetails.branchNumber;
      this.accountNumber = bankDetails.accountNumber;
      return bankDetails;
    }
    return bankDetails;
  }

  static loadFill() {
    if (localStorage.getItem(BANK_DETAILS) == null) {
      localStorage.setItem(BANK_DETAILS, JSON.stringify(BankDetailsComponent.bankDetails));
    }
    else {
      try {
        let bankDetails: any = localStorage.getItem(BANK_DETAILS);
        BankDetailsComponent.bankDetails = JSON.parse(bankDetails);
      }
      catch (prblm: any) {
        localStorage.setItem(BANK_DETAILS, JSON.stringify(BankDetailsComponent.bankDetails));
        console.log("JSON problem: " + prblm.message);
      }
    }
  }

  changeDetails(): void {
    this.edit = true;
    let bankDetails: any;
    bankDetails = localStorage.getItem(BANK_DETAILS);
    bankDetails = JSON.parse(bankDetails);
    if (bankDetails != null) {
      bankDetails.branchName = this.branchName;
      bankDetails.branchNumber = this.branchNumber;
      bankDetails.accountNumber = this.accountNumber;
    }
  }

  updIt() {
    this.edit = false;
    if (this.branchName?.trim() == "") {
      UserManager.showErrorFocus(" שם הינו שדה חובה, נא לכתוב שם שונה מקודמו.", "branchName");
      this.changeDetails();
      return;
    }
    if (this.branchNumber == null || this.branchNumber < 0 || String(this.branchNumber).trim() == "") {
      UserManager.showErrorFocus("מספר סניף חייב להיות מספר חיובי שונה מקודמו", "branchNumber");
      this.changeDetails();
      return;
    }
    if (this.accountNumber == null || this.accountNumber < 0 || String(this.accountNumber).trim() == "") {
      UserManager.showErrorFocus("מספר חשבון חייב להיות מספר חיובי שונה מקודמו", "accountNumber");
      this.changeDetails();
      return;
    }

    if (BankDetailsComponent.bankDetails.branchName == this.branchName.trim()) {
      UserManager.showErrorFocus("נא לכתוב שם שונה מקודמו", "branchName");
      this.changeDetails();
      return;
    }
    if (BankDetailsComponent.bankDetails.branchNumber == this.branchNumber) {
      UserManager.showErrorFocus("נא לכתוב מספר סניף שונה מקודמו", "branchNumber");
      this.changeDetails();
      return;
    }
    if (BankDetailsComponent.bankDetails.accountNumber != this.accountNumber) {
      UserManager.showErrorFocus("נא לכתוב מספר חשבון תקין, זהה לקודמו", "accountNumber");
      this.changeDetails();
      return;
    }
    BankDetailsComponent.bankDetails = new BankAccountDetails(this.branchName, this.branchNumber, this.accountNumber);
    localStorage.setItem(BANK_DETAILS, JSON.stringify(new BankAccountDetails(this.branchName, this.branchNumber, this.accountNumber)));
    this.valid = true;
  }
}
