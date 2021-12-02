import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { postTransaction } from "../store/actions/transactionAction";

export default function TransactionForm() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [inputTransaction, setInputTransaction] = useState({
    type: "Income",
    amount: 0,
    name: "",
    note: "",
    date: new Date(),
  });
  const [errors, setErrors] = useState([]);

  const handleInputTransaction = (e) => {
    const { name, value } = e.target;

    setInputTransaction({
      ...inputTransaction,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(postTransaction(inputTransaction))
      .then((response) => {
        history.push("/");
      })
      .catch((err) => {
        console.log(err);
        setErrors(err);
      });
  };

  const currentDate = () => {
    var someDate = new Date();
    var date = someDate.toISOString().substr(0, 10);
    return date;
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <select name="type" onChange={handleInputTransaction}>
          <option value="Income" key="Income" selected={inputTransaction.type === "Income"}>
            Income
          </option>
          <option value="Expenses" key="Expenses" selected={inputTransaction.type === "Expenses"}>
            Expenses
          </option>
        </select>
        <br />
        <label>Amount</label>
        <br />
        <input type="number" name="amount" placeholder="Enter transaction amount" defaultValue={inputTransaction.amount} onChange={handleInputTransaction} /> <br />
        <label>Name</label>
        <br />
        <input type="text" name="name" placeholder="Enter transaction name" defaultValue={inputTransaction.name} onChange={handleInputTransaction} />
        <br />
        <label>Note</label> <br />
        <textarea cols="30" rows="10" name="note" defaultValue={inputTransaction.note} onChange={handleInputTransaction}></textarea>
        <br />
        <input type="date" name="date" defaultValue={currentDate()} onChange={handleInputTransaction} max={new Date().toISOString().split("T")[0]} />
        <br />
        {errors.length > 0
          ? errors.map((err) => {
              return (
                <>
                  <span>{err}</span>
                  <br />
                </>
              );
            })
          : ""}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            history.push("/");
          }}
        >
          Cancel
        </button>{" "}
        &nbsp;
        <button type="submit">Add</button>
      </form>
    </>
  );
}
