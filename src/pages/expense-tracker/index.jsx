import { useState } from "react";
import { useAddTransaction } from "../../hooks/useAddTransaction";
import { useGetTransactions} from  "../../hooks/useGetTransctions"
import "./expenseTracker.css"

export const ExpenseTracker = () => {
  const { addTransaction } = useAddTransaction();
  const { transactions } = useGetTransactions();
  const [description, setDescription] = useState("");
  const [transactionAmount, setTransactionAmount] = useState(0);
  const [transactionType, setTransactionType] = useState("expense");

  const onSubmit = (e) => {
    e.preventDefault();
    addTransaction({ description, transactionAmount, transactionType });
    setDescription("");
    setTransactionAmount(0);
  };

  // Calculate balance dynamically
  const balance = transactions.reduce(
    (acc, { transactionAmount, transactionType }) =>
      transactionType === "income"
        ? acc + transactionAmount
        : acc - transactionAmount,
    0
  );

  return (
    <div className="expense-tracker">
      <div className="container">
        <h1>Expense Tracker</h1>
        <div className="balance">
          <h3>Your Balance</h3>
          <h2>${balance.toFixed(2)}</h2>
        </div>
        <div className="summary">
          <div className="income">
            <h4>Income</h4>
            <p>
              $
              {transactions
                .filter((t) => t.transactionType === "income")
                .reduce((acc, t) => acc + t.transactionAmount, 0)
                .toFixed(2)}
            </p>
          </div>
          <div className="expenses">
            <h4>Expenses</h4>
            <p>
              $
              {transactions
                .filter((t) => t.transactionType === "expense")
                .reduce((acc, t) => acc + t.transactionAmount, 0)
                .toFixed(2)}
            </p>
          </div>
        </div>
        <form className="add-transaction" onSubmit={onSubmit}>
          <input
            type="text"
            placeholder="Description"
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            type="number"
            placeholder="Amount"
            required
            value={transactionAmount}
            onChange={(e) => setTransactionAmount(Number(e.target.value))}
          />
          <div>
            <input
              type="radio"
              id="expense"
              value="expense"
              checked={transactionType === "expense"}
              onChange={(e) => setTransactionType(e.target.value)}
            />
            <label htmlFor="expense">Expense</label>
            <input
              type="radio"
              id="income"
              value="income"
              checked={transactionType === "income"}
              onChange={(e) => setTransactionType(e.target.value)}
            />
            <label htmlFor="income">Income</label>
          </div>
          <button type="submit">Add Transaction</button>
        </form>
      </div>

      <div className="transactions">
        <h3>Transactions</h3>
        <ul>
          {transactions.map((transaction, index) => (
            <li key={index}>
              <h4>{transaction.description}</h4>
              <p>
                ${transaction.transactionAmount.toFixed(2)} -{" "}
                <span>{transaction.transactionType}</span>
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};