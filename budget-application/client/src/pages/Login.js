import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory, useLocation } from "react-router-dom";
import { login } from "../store/actions/userAction";

export default function Login() {
  const location = useLocation();
  const dispatch = useDispatch();
  const history = useHistory();
  const [inputLogin, setInputLogin] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState();

  const handleInputLogin = (e) => {
    const { name, value } = e.target;

    setInputLogin({
      ...inputLogin,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(inputLogin))
      .then((response) => {
        localStorage.setItem("access_token", response.access_token);
        history.push("/");
      })
      .catch((err) => {
        setErrors(err);
      });
  };

  return (
    <div className="row justify-content-center align-items-center" style={{ minHeight: "100vh", width: "100vw" }}>
      <div className="col-lg-5 col-sm-10">
        <div className="card o-hidden border-0 shadow-lg" style={{ borderRadius: "20px" }}>
          <div className="card-body p-0">
            <div className="p-5">
              <div className="text-center">
                <h1 className="h2 text-primary font-weight-bolder">Budget Application</h1>
                {errors ? (
                  <>
                    <span className="badge badge-danger">{errors}</span>
                  </>
                ) : (
                  ""
                )}
              </div>
              <form className="mt-4 mb-2 user" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="email">Username / Email</label>
                  <input type="text" className="form-control shadow-none rounded-pill" autoComplete="off" placeholder="Enter your unique username or email" name="email" id="email" value={inputLogin.email} onChange={handleInputLogin} />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input type="password" className="form-control shadow-none rounded-pill" autoComplete="off" placeholder="Enter you strong password" name="password" id="password" value={inputLogin.password} onChange={handleInputLogin} />
                </div>
                <button type="submit" className="btn btn-primary btn-block rounded-pill">
                  Login
                </button>
              </form>
              <div className="text-center">
                Dont't have account yet? Click{" "}
                <Link className="text-decoration-none text-primary" to="/register">
                  here
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
