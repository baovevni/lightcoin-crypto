class Accout {

  constructor(username) {
    this.username = username;
    this.transactions = [];
  }

  get balance() {
  	let balance = 0;
    for (let t of this.transactions) {
    	balance += t.value;
    }
    return balance;
  };


  addTransaction(transaction) {
    this.transactions.push(transaction);
  }
}

class Transaction {

  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
  }

  commit() {
    if (!this.isAllowed()) return false;
      this.time = new Date();
      this.account.addTransaction(this);
      return true;
    }

  }

class Deposit extends Transaction {

  get value() {
    return this.amount;
  }

  isAllowed() {
    return true;
  }

}

class Withdrawal extends Transaction {

  get value() {
    return -this.amount;

  }

  isAllowed() {
    return (this.account.balance - this.amount >= 0)
  };

};


// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected

const account1 = new Accout("Snow-Patrol");

console.log('Starting Account Balance: ', account1.balance);

console.log('Attempting to withdraw even $1 should fail...');
const t1 = new Withdrawal(1.00, account1);
console.log('Commit result:', t1.commit());
console.log('Account Balance: ', account1.balance);

console.log('Depositing should succeed...');
const t2 = new Deposit(9.99, account1);
console.log('Commit result:', t2.commit());
console.log('Account Balance: ', account1.balance);

console.log('Withdrawal for 9.99 should be allowed...');
const t3 = new Withdrawal(9.99, account1);
console.log('Commit result:', t3.commit());

console.log('Ending Account Balance: ', account1.balance);
console.log("Lookings like I'm broke again");

console.log('Depositing should succeed...');
const t4 = new Deposit(99.99, account1);
console.log('Commit result:', t4.commit());
console.log('Account Balance: ', account1.balance);

// console.log('Account Transaction History: ', account1.transactions);
// We can't print an object so instead we loop over the array and just printed each item
for(let transaction in account1.transactions) {
  console.log(`Transaction ${transaction}: ${account1.transactions[transaction].constructor.name}, Amount: ${account1.transactions[transaction].amount}, Time: ${account1.transactions[transaction].time}`);
}
