import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTransactions } from "../store/actions/transactionAction";
import { fetchUserdata } from "../store/actions/userAction";

export default function Home() {
  const dispatch = useDispatch();
  const { userdata, isLoading: loadingUser } = useSelector((state) => state.userReducer);
  const { transactions, isLoading: loadingTransactions } = useSelector((state) => state.transactionReducer);

  useEffect(() => {
    dispatch(fetchUserdata());
    dispatch(fetchTransactions());
  }, []);

  return (
    <>
      <span>{loadingUser ? "Loading" : userdata.dataUser?.name}</span>
      <span>{loadingUser ? "Loading" : userdata.balance}</span>
      <p>
        {loadingTransactions
          ? "Loading..."
          : transactions.map((transaction) => {
              return (
                <>
                  <span>
                    {transaction.name} {transaction.amount}
                  </span>
                  <br />
                </>
              );
            })}
      </p>
      {/* <button onClick={}>Add</button> */}
    </>
  );
}
