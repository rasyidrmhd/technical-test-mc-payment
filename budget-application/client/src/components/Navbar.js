import { Link, useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import profilePic from "../assets/profile/default.png";

export default function Navbar(props) {
  const { userdata } = props;
  const history = useHistory();

  return (
    <>
      <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow mt-4" style={{ borderRadius: "20px" }}>
        <Link className="text-decoration-none" to="/">
          <h5 className="mb-0 font-weight-bolder">Budget Application</h5>
        </Link>

        <ul className="navbar-nav ml-auto">
          <li className="nav-item dropdown no-arrow">
            <a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <span className="mr-2 d-none d-lg-inline text-dark">{userdata.dataUser?.name}</span>
              <img className="img-profile rounded-circle" src={profilePic} />
            </a>
            <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="userDropdown">
              <a className="dropdown-item" href="#" data-toggle="modal" data-target="#logoutModal">
                <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
                Logout
              </a>
            </div>
          </li>
        </ul>
      </nav>

      <div className="modal fade" id="logoutModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content border-0" style={{ borderRadius: "20px", backgroundColor: "#ede9f0" }}>
            <div className="modal-body mx-3 mt-3 bg-white" style={{ borderRadius: "20px" }}>
              Are you sure you want to logout?
            </div>
            <div className="modal-footer border-0">
              <button type="button" className="btn btn-secondary rounded-pill" data-dismiss="modal">
                Close
              </button>
              <button
                type="button"
                className="btn btn-danger rounded-pill"
                onClick={(e) => {
                  e.preventDefault();
                  localStorage.removeItem("access_token");
                  history.push("/login");
                }}
                data-dismiss="modal"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
