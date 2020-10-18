import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface AllTransactionsDto {
  transactions: Transaction[];
  balance: Balance;
}

interface CreateTransactionDto {
  title: string;
  value: number;
  type: string;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public getBalance(): Balance {
    const sumerise = (type: string): number => {
      return this.transactions
        .map(el => (el.type === type ? el.value : 0))
        .reduce((acc, cur) => acc + cur, 0);
    };

    const income = sumerise('income');
    const outcome = sumerise('outcome');

    return {
      income,
      outcome,
      total: income - outcome,
    };
  }

  public all(): AllTransactionsDto {
    return {
      transactions: this.transactions,
      balance: this.getBalance(),
    };
  }

  public create({ title, value, type }: CreateTransactionDto): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    this.getBalance();

    return transaction;
  }
}

export default TransactionsRepository;
