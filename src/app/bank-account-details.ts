const activeBank: string = "Big Bank Inc";

export class BankAccountDetails {
    bankName: string = activeBank;
    limit: number=-2000;
    constructor(public branchName: string, public branchNumber: number, public accountNumber: number) { }

    toString(): string { return `${this.bankName} Branch: (${this.branchNumber}) ${this.branchName} Account#: ${this.accountNumber}`; }
};
//var t: BankAccountDetails = new BankAccountDetails("plonit almonit", "ta", "female", 129387465/*, 'My bank'*/);
//console.log(t.toString());
