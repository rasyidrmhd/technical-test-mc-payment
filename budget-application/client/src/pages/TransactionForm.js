import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";

export default function TransactionForm() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [inputTransaction, setInputTransaction] = useState({
    amount: 0,
    name: "",
    note: "",
    date: new Date(),
  });

  const handleInputTransaction = (e) => {
    const { name, value } = e.target;

    setInputTransaction({
      ...inputTransaction,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputTransaction);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>Amount</label>
        <br />
        <input type="number" placeholder="Enter transaction amount" /> <br />
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
