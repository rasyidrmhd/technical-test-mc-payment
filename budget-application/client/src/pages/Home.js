import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { fetchTransactionById, fetchTransactions } from "../store/actions/transactionAction";
import { fetchUserdata } from "../store/actions/userAction";
import { faWallet, faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import Navbar from "../components/Navbar";
import TransactionRow from "../components/TransactionRow";
import BalanceCard from "../components/BalanceCard";
import rupiahFormatter from "../helpers/rupiahFormatter";

export default function Home() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { userdata, isLoading: loadingUser } = useSelector((state) => state.userReducer);
  const { transactions, isLoading: loadingTransactions } = useSelector((state) => state.transactionReducer);
  const { transactionById, isLoading: loadingTransaction } = useSelector((state) => state.transactionReducer);
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("DESC");

  useEffect(() => {
    dispatch(fetchTransactions());
    dispatch(fetchUserdata());
  }, []);

  return (
    <div style={{ paddingBottom: "10px" }}>
      <div className="container">
        <Navbar userdata={userdata} />

        <div className="row px-0 mb-2">
          <BalanceCard amount={userdata.balance} colMd="col-md-12" rupiahFormatter={rupiahFormatter} bg="bg-primary" title="Balance" icon={faWallet} />

          <BalanceCard amount={userdata.totalIncome} colMd="col-md-6" rupiahFormatter={rupiahFormatter} bg="bg-success" title="Total Income" icon={faArrowDown} />

          <BalanceCard amount={userdata.totalExpenses} colMd="col-md-6" rupiahFormatter={rupiahFormatter} bg="bg-danger" title="Total Expenses" icon={faArrowUp} />
        </div>

        <div className="d-flex align-items-center justify-content-center mb-4">
          <span className="h5 d-none d-md-inline font-weight-bolder mb-0">Transactions</span>
          <div className="ml-md-auto d-flex flex-sm-row flex-column align-items-center">
            <div className="mb-2 mb-sm-0">
              <div className="btn-group shadow">
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    setFilter("all");
                    dispatch(fetchTransactions());
                  }}
                  className={`btn btn-dark shadow-none border-0 button-group-left ${filter === "all" ? "active" : ""}`}
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
                  className={`btn btn-dark shadow-none border-0 ${filter === "income" ? "active" : ""}`}
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
                  className={`btn btn-dark shadow-none border-0 button-group-right ${filter === "expenses" ? "active" : ""}`}
                >
                  Expenses
                </button>
              </div>
            </div>

            <div className="ml-2">
              <div className="btn-group shadow">
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    setSort("DESC");
                    dispatch(fetchTransactions({ sort: "DESC" }));
                  }}
                  className={`btn btn-info shadow-none border-0 button-group-left ${sort === "DESC" ? "active" : ""}`}
                >
                  Newest
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    setSort("ASC");
                    dispatch(fetchTransactions({ sort: "ASC" }));
                  }}
                  className={`btn btn-info shadow-none border-0 button-group-right ${sort === "ASC" ? "active" : ""}`}
                >
                  Oldest
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-5">
          {transactions.map((transaction) => {
            return <TransactionRow transaction={transaction} key={transaction.id} rupiahFormatter={rupiahFormatter} fetch={fetchTransactionById} />;
          })}
        </div>
      </div>

      <div className="modal fade" id="transactionDetail" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content border-0 custom-border-20" style={{ backgroundColor: "#ede9f0" }}>
            <div className="modal-header border-0">
              <h5 className="modal-title font-weight-bolder">Transaction Detail</h5>
            </div>
            <div className="modal-body mx-3 bg-white font-weight-bolder custom-border-20">
              <div className="d-flex justify-content-between">
                {transactionById.name}
                <span className={`${transactionById.type === "Income" ? "text-success" : "text-danger"}`}>
                  {transactionById.type === "Income" ? "+" : "-"}
                  {rupiahFormatter(transactionById.amount)}
                </span>
              </div>
              <div>
                Note: <br />
                {transactionById.note ? transactionById.note : "-"}
              </div>
              <div>
                Added on:
                <br />
                {transactionById.date?.split("T")[0]}
              </div>
            </div>
            <div className="modal-footer border-0">
              <button type="button" className="btn btn-secondary rounded-pill" data-dismiss="modal">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed-bottom text-center mb-2">
        <button
          className="btn btn-primary rounded-pill"
          onClick={(e) => {
            e.preventDefault();
            history.push({ pathname: "/addTransaction", state: { userdata } });
          }}
        >
          New Transaction
        </button>
      </div>
    </div>
  );
}
