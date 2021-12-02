import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { postTransaction } from "../store/actions/transactionAction";
import Navbar from "../components/Navbar";

export default function TransactionForm() {
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const [type, setType] = useState("Income");
  const [inputTransaction, setInputTransaction] = useState({
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
    inputTransaction.type = type;
    dispatch(postTransaction(inputTransaction))
      .then((response) => {
        history.push("/");
      })
      .catch((err) => {
        setErrors(err);
      });
  };

  const currentDate = () => {
    var someDate = new Date();
    var date = someDate.toISOString().substr(0, 10);
    return date;
  };

  return (
    <div className="container">
      <Navbar userdata={location.state.userdata} />

      <div className="d-flex flex-column align-items-center">
        <div className="col-lg-5 col-sm-12 mb-4">
          <div className="card o-hidden border-0 shadow custom-border-20">
            <div className="card-body row py-2">
              <div
                className={`col mr-1 text-center ${type === "Income" ? "bg-success text-white" : ""}`}
                style={{ borderRadius: "20px", cursor: "pointer" }}
                onClick={(e) => {
                  e.preventDefault();
                  setType("Income");
                }}
              >
                <h5 className="mb-0 py-2 font-weight-bolder">Income</h5>
              </div>
              <div
                className={`col ml-1 text-center ${type === "Expenses" ? "bg-danger text-white" : ""}`}
                style={{ borderRadius: "20px", cursor: "pointer" }}
                onClick={(e) => {
                  e.preventDefault();
                  setType("Expenses");
                }}
              >
                <h5 className="mb-0 py-2 font-weight-bolder">Expenses</h5>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-8 col-sm-12 mb-4">
          <div className="card o-hidden border-0 shadow-lg custom-border-20">
            <div className="card-body">
              <form className="user" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="amount">Amount</label>
                  <input
                    type="number"
                    className="form-control rounded-pill shadow-none"
                    autoComplete="off"
                    placeholder="Enter transaction amount"
                    name="amount"
                    id="amount"
                    defaultValue={inputTransaction.amount}
                    onChange={handleInputTransaction}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input type="text" className="form-control rounded-pill shadow-none" autoComplete="off" placeholder="Enter transaction name" name="name" id="name" defaultValue={inputTransaction.name} onChange={handleInputTransaction} />
                </div>
                <div className="form-group">
                  <label htmlFor="note">Note</label>
                  <textarea
                    rows="5"
                    className="form-control shadow-none"
                    name="note"
                    id="note"
                    placeholder="Enter transaction note (optional)"
                    defaultValue={inputTransaction.note}
                    onChange={handleInputTransaction}
                    style={{ resize: "none", borderRadius: "20px" }}
                  ></textarea>
                </div>
                <div className="form-group">
                  <label htmlFor="date">Date</label>
                  <input type="date" className="form-control rounded-pill shadow-none" name="date" defaultValue={currentDate()} onChange={handleInputTransaction} max={new Date().toISOString().split("T")[0]} />
                </div>
                <div className="text-center mb-2">
                  {errors.length > 0
                    ? errors.map((err) => {
                        return (
                          <>
                            <span className="badge badge-danger mr-1">{err}</span>
                          </>
                        );
                      })
                    : ""}
                </div>
                <div className="row">
                  <div className="col">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        history.push("/");
                      }}
                      className="btn btn-secondary btn-block rounded-pill"
                    >
                      Cancel
                    </button>
                  </div>
                  <div className="col">
                    <button type="submit" className="btn btn-primary btn-block rounded-pill">
                      Add
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
