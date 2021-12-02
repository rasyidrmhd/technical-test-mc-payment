import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function BalanceCard(props) {
  const { amount, colMd, rupiahFormatter, icon, bg, title } = props;

  return (
    <div className={`col-xl-4 ${colMd} mb-2`}>
      <div className={`card ${bg} shadow h-100 py-1 custom-border-20`}>
        <div className="card-body text-white">
          <div className="row no-gutters align-items-center">
            <div className="col mr-2">
              <div className="text-xs font-weight-bold text-uppercase mb-1">{title}</div>
              <div className="h5 mb-0 font-weight-bold">{rupiahFormatter(amount)}</div>
            </div>
            <div className="col-auto">
              <FontAwesomeIcon icon={icon} size="2x" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
