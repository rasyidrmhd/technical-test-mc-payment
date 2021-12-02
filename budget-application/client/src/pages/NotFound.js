import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSadTear } from "@fortawesome/free-solid-svg-icons";

export default function NotFound() {
  const history = useHistory();

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <div className="text-center">
        <FontAwesomeIcon icon={faSadTear} size="7x" />
        <h2>
          Sorry, the page you are looking for <br /> is not found
        </h2>
        <button
          className="btn btn-primary rounded-pill"
          onClick={(e) => {
            e.preventDefault();
            history.goBack();
          }}
        >
          Back
        </button>
      </div>
    </div>
  );
}
