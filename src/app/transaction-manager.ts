import { ActivatedRoute, Router } from "@angular/router";
import { BankTransaction, TransactionType } from "./bank-transaction";

const TRANSACTIONS: string = "TRANSACTIONS";
const COUNTER: string = "COUNTER";
const BALANCE: string = "BALANCE";

export class TransactionManager {
    private static all_actions: BankTransaction[] = [];
    private static counter: number = 1;
    private static currentTransaction?: BankTransaction;
    private static balance?: any = localStorage.getItem(BALANCE);
    private static transactionTypeNames: string[] = [];

    constructor(private route: ActivatedRoute, private router_srv: Router) {
        const id = this.route.snapshot.paramMap.get('counter');
        if (id) {
            TransactionManager.currentTransaction = TransactionManager.getActionById(id);
        }

        for (let optn in TransactionType)
            if (isNaN(Number(optn)))
                TransactionManager.transactionTypeNames.push(optn);
    }

    static loadFill(): void {
        if (localStorage.getItem(TRANSACTIONS) == null) {
            localStorage.setItem(TRANSACTIONS, JSON.stringify(this.all_actions));
            localStorage.setItem(COUNTER, JSON.stringify(1));
        }
        else {
            try {
                let allTransactions: any = localStorage.getItem(TRANSACTIONS);
                let counter: any = localStorage.getItem(COUNTER);
                TransactionManager.all_actions = JSON.parse(allTransactions);
                TransactionManager.counter = JSON.parse(counter);
            }
            catch (prblm: any) {
                localStorage.setItem(TRANSACTIONS, JSON.stringify(this.all_actions));
                localStorage.setItem(COUNTER, JSON.stringify(1));
                console.log("JSON problem: " + prblm.message);
            }
        }
    }

    static getActionById(id: string): BankTransaction | undefined {
        TransactionManager.loadFill();
        for (let i = 0; i < TransactionManager.all_actions.length; i++)
            if (TransactionManager.all_actions[i].counter == Number(id)) {
                return TransactionManager.all_actions[i];
            }
        return undefined;
    }

    static getBalance(): number {
        TransactionManager.loadFill();
        TransactionManager.all_actions = TransactionManager.getAllTransactions();
        if (TransactionManager.all_actions.length == 0)
            return 0;
        else
            return TransactionManager.all_actions[TransactionManager.all_actions.length - 1].balance;
    }

    static addTransaction(transaction: BankTransaction): void {
        TransactionManager.all_actions.push(transaction);
        localStorage.setItem(TRANSACTIONS, JSON.stringify(TransactionManager.all_actions));
    }

    static getAllTransactions(): BankTransaction[] {
        let allTransactions: any;
        allTransactions = localStorage.getItem(TRANSACTIONS);
        allTransactions = JSON.parse(allTransactions);
        return allTransactions;
    }

    static getCounter(): number {
        return TransactionManager.counter;
    }

    static resetCounter(): void {
        TransactionManager.counter = 1;
        localStorage.setItem(COUNTER, JSON.stringify(TransactionManager.counter));
    }

    static increaseCounter(): void {
        TransactionManager.counter++;
        localStorage.setItem(COUNTER, JSON.stringify(TransactionManager.counter));
    }

    static decreaseCounter(): void {
        TransactionManager.counter--;
        localStorage.setItem(COUNTER, JSON.stringify(TransactionManager.counter));
    }

    static getArrayLength(): number {
        return TransactionManager.all_actions.length;
    }

    static onDeleteConfirmMsg(counter: any): boolean {
        let text = "האם למחוק רשומה זו?";
        if (confirm(text) == true) {
           return TransactionManager.isDeleteActionValid(counter);
        }
        return false;
    }

    static isDeleteActionValid(counter: any): boolean {
        let deleteActionValid: boolean = false;
        TransactionManager.currentTransaction = this.getActionById(counter);
        if (TransactionManager.currentTransaction?.trnTyp == TransactionType.openAcount) {
            alert('לא ניתן למחוק פעולת פתיחת חשבון');
            return deleteActionValid;
        }
        return deleteActionValid = true;
    }

    static deleteAction(counter: any): void {
        if (TransactionManager.isDeleteActionValid(counter) == true) {
            let transactions: BankTransaction[] = TransactionManager.getAllTransactions();
            let currentBalance: number = TransactionManager.getBalance();
            if (TransactionManager.currentTransaction?.trnTyp == TransactionType.deposit) {
                TransactionManager.balance = localStorage.setItem(BALANCE, JSON.stringify(currentBalance - transactions[transactions.length - 1].amount));
            }
            if (TransactionManager.currentTransaction?.trnTyp == TransactionType.withdraw) {
                TransactionManager.balance = localStorage.setItem(BALANCE, JSON.stringify(currentBalance + transactions[transactions.length - 1].amount));
            }
            TransactionManager.all_actions.splice((counter - 1), 1);
            TransactionManager.decreaseCounter();
            localStorage.setItem(TRANSACTIONS, JSON.stringify(TransactionManager.all_actions));
        }
    }
}
