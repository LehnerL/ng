import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { AccountLoginComponent } from './account-login/account-login.component';
import { AccountOwnerComponent } from './account-owner/account-owner.component';
import { AllTransactionDetailsComponent } from './all-transaction-details/all-transaction-details.component';
import { BankAccountComponent } from './bank-account/bank-account.component';
import { BankDetailsComponent } from './bank-details/bank-details.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { TransactionTableComponent } from './transaction-table/transaction-table.component';

const routes: Routes = [
  { path: 'About', component: AboutComponent },
  { path: 'AccountLogin', component: AccountLoginComponent },
  { path: 'BankAccount', component: BankAccountComponent },
  { path: 'ChangePassword', component:ChangePasswordComponent},
  { path: 'AccountOwner', component: AccountOwnerComponent },
  { path: 'BankDetails', component: BankDetailsComponent },
  { path: 'Transactions', component: TransactionTableComponent },
  { path: 'TransactionDetails/:counter', component: AllTransactionDetailsComponent },
  { path: '', component: AboutComponent },
  { path: '**', component: PageNotFoundComponent }
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
