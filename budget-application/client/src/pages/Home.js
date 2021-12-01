import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { fetchTransactions } from "../store/actions/transactionAction";
import { fetchUserdata } from "../store/actions/userAction";

export default function Home() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { userdata, isLoading: loadingUser } = useSelector((state) => state.userReducer);
  const { transactions, isLoading: loadingTransactions } = useSelector((state) => state.transactionReducer);

  useEffect(() => {
    dispatch(fetchUserdata());
    dispatch(fetchTransactions());
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
      <span>{loadingUser ? "Loading" : userdata.balance}</span>
      <p>
        {loadingTransactions
          ? "Loading..."
          : transactions.map((transaction) => {
              return (
                <>
                  <span>
                    {transaction.name} {transaction.amount}
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
