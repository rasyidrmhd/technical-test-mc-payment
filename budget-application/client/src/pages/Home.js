import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import TransactionRow from "../components/TransactionRow";
import BalanceCard from "../components/BalanceCard";
import { fetchTransactions } from "../store/actions/transactionAction";
import { fetchUserdata } from "../store/actions/userAction";
import rupiahFormatter from "../helpers/rupiahFormatter";
import profilePic from "../assets/profile/default.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt, faWallet, faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export default function Home() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { userdata, isLoading: loadingUser } = useSelector((state) => state.userReducer);
  const { transactions, isLoading: loadingTransactions } = useSelector((state) => state.transactionReducer);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    dispatch(fetchTransactions());
    dispatch(fetchUserdata());
  }, []);

  return (
    <div style={{ paddingBottom: "10px" }}>
      <div className="container">
        <nav class="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow mt-4" style={{ borderRadius: "20px" }}>
          <Link className="text-decoration-none" to="/">
            <h5 className="mb-0 font-weight-bolder">Budget Application</h5>
          </Link>

          <ul class="navbar-nav ml-auto">
            <li class="nav-item dropdown no-arrow">
              <a class="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <span class="mr-2 text-dark">{userdata.dataUser?.name}</span>
                <img class="img-profile rounded-circle" src={profilePic} />
              </a>
              <div class="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="userDropdown">
                <a
                  class="dropdown-item"
                  href="#"
                  data-toggle="modal"
                  data-target="#logoutModal"
                  onClick={(e) => {
                    e.preventDefault();
                    localStorage.removeItem("access_token");
                    history.push("/login");
                  }}
                >
                  <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
                  Logout
                </a>
              </div>
            </li>
          </ul>
        </nav>

        <div className="row px-0 mb-2">
          <BalanceCard amount={userdata.balance} colMd="col-md-12" rupiahFormatter={rupiahFormatter} bg="bg-primary" title="Balance" />

          <BalanceCard amount={userdata.totalIncome} colMd="col-md-6" rupiahFormatter={rupiahFormatter} bg="bg-success" title="Total Income" />

          <BalanceCard amount={userdata.totalExpenses} colMd="col-md-6" rupiahFormatter={rupiahFormatter} bg="bg-danger" title="Total Expenses" />
        </div>

        <div className="d-flex align-items-center mb-4">
          <span className="h5 font-weight-bolder mb-0">Transactions</span>
          <div className="ml-auto">
            <div class="btn-group shadow">
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  setFilter("all");
                  dispatch(fetchTransactions());
                }}
                className={`btn btn-dark shadow-none ${filter === "all" ? "active" : ""}`}
              >
                All
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  setFilter("income");
                  dispatch(fetchTransactions({ type: "Income" }));
                }}
                className={`btn btn-dark shadow-none ${filter === "income" ? "active" : ""}`}
              >
                Income
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  setFilter("expenses");
                  dispatch(fetchTransactions({ type: "Expenses" }));
                }}
                className={`btn btn-dark shadow-none ${filter === "expenses" ? "active" : ""}`}
              >
                Expenses
              </button>
            </div>
          </div>
        </div>

        <div className="mb-5">
          {transactions.map((transaction) => {
            return <TransactionRow transaction={transaction} key={transaction.id} rupiahFormatter={rupiahFormatter} />;
          })}
        </div>
      </div>

      <div className="fixed-bottom text-center mb-2">
        <button
          className="btn btn-primary rounded-pill"
          onClick={(e) => {
            e.preventDefault();
            history.push("/addTransaction");
          }}
        >
          New Transaction
        </button>
      </div>
    </div>
  );
}
