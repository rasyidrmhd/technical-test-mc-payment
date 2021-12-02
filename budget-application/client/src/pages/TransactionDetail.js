import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { fetchTransactionById } from "../store/actions/transactionAction";
import rupiahFormatter from "../helpers/rupiahFormatter";

export default function TransactionDetail() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { idTransaction } = useParams();
  const { transactionById, isLoading: loadingTransaction } = useSelector((state) => state.transactionReducer);

  useEffect(() => {
    dispatch(fetchTransactionById(idTransaction));
  }, []);

  return (
    <>
      {loadingTransaction ? (
        "Loading"
      ) : (
        <>
          <p>
            {transactionById.name}
            <br />
            {rupiahFormatter(transactionById.amount)}
            <br />
            {transactionById.date}
          </p>
        </>
      )}
      <button
        onClick={(e) => {
          e.preventDefault();
          history.push("/");
        }}
      >
        back
      </button>
    </>
  );
}
