import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { fetchTransactions } from "../store/actions/transactionAction";
import { fetchUserdata } from "../store/actions/userAction";
import rupiahFormatter from "../helpers/rupiahFormatter";

export default function Home() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { userdata, isLoading: loadingUser } = useSelector((state) => state.userReducer);
  const { transactions, isLoading: loadingTransactions } = useSelector((state) => state.transactionReducer);

  useEffect(() => {
    dispatch(fetchTransactions());
    dispatch(fetchUserdata());
  }, []);

  return (
    <>
      <span>{loadingUser ? "Loading" : userdata.dataUser?.name}</span>{" "}
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          localStorage.removeItem("access_token");
          history.push("/login");
        }}
      >
        Logout
      </button>
      <br />
      <span>
        {loadingUser ? (
          "Loading"
        ) : (
          <>
            <span>{rupiahFormatter(userdata.balance)}</span>
          </>
        )}
      </span>
      <br />
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          dispatch(fetchTransactions());
        }}
      >
        All
      </button>
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          dispatch(fetchTransactions({ type: "Income" }));
        }}
      >
        Income
      </button>
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          dispatch(fetchTransactions({ type: "Expenses" }));
        }}
      >
        Expenses
      </button>
      <p>
        {loadingTransactions
          ? "Loading..."
          : transactions.map((transaction) => {
              return (
                <>
                  <span>
                    {transaction.name} {rupiahFormatter(transaction.amount)}
                  </span>{" "}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      history.push(`/transaction/${transaction.id}`);
                    }}
                  >
                    detail
                  </button>
                  <br />
                </>
              );
            })}
      </p>
      <button
        onClick={(e) => {
          e.preventDefault();
          history.push("/addTransaction");
        }}
      >
        Add
      </button>
    </>
  );
}
