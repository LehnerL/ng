import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';

import { BankAccountComponent } from './bank-account/bank-account.component';
import { AccountLoginComponent } from './account-login/account-login.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AccountOwnerComponent } from './account-owner/account-owner.component';
import { MenuComponent } from './menu/menu.component';
import { BankDetailsComponent } from './bank-details/bank-details.component';
import { TransactionTableComponent } from './transaction-table/transaction-table.component';
import { AllTransactionDetailsComponent } from './all-transaction-details/all-transaction-details.component';
import { AboutComponent } from './about/about.component';


@NgModule({
  declarations: [
    AppComponent,
    AccountOwnerComponent,
    BankAccountComponent,
    AccountLoginComponent,
    ChangePasswordComponent,
    PageNotFoundComponent,
    MenuComponent,
    BankDetailsComponent,
    TransactionTableComponent,
    AllTransactionDetailsComponent,
    AboutComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
