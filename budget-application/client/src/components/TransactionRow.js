export default function TransactionRow(props) {
  const { transaction, rupiahFormatter } = props;

  return (
    <div
      className="d-flex p-3 my-2 bg-white shadow align-items-center font-weight-bolder"
      style={{ borderRadius: "20px", cursor: "pointer" }}
      onClick={(e) => {
        e.preventDefault();
      }}
    >
      <div>{transaction.name}</div>
      <div className="ml-auto d-flex flex-column align-items-end">
        <span className={`${transaction.type === "Income" ? "text-success" : "text-danger"}`}>
          {transaction.type === "Income" ? "+" : "-"}
          {rupiahFormatter(transaction.amount)}
        </span>
        <div>{transaction.date.split("T")[0]}</div>
      </div>
    </div>
  );
}
