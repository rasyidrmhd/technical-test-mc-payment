import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router";
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
        localStorage.setItem("access_token", response);
        history.push("/");
      })
      .catch((err) => {
        setErrors(err);
      });
  };

  return (
    <>
      <h1>Hello from Login</h1>
      {location.state ? <span>{location.state.message}</span> : ""}
      <form onSubmit={handleSubmit}>
        <label>Username / Email</label>
        <br />
        <input type="text" placeholder="Enter you username or email" autoComplete="off" name="email" defaultValue={inputLogin.email} onChange={handleInputLogin} /> <br />
        <label>Password</label>
        <br />
        <input type="password" placeholder="Enter your strong password" autoComplete="off" name="password" defaultValue={inputLogin.password} onChange={handleInputLogin} />
        <br />
        <button type="submit">Login</button>
      </form>
      {errors ? (
        <>
          <span>{errors}</span>
          <br />
        </>
      ) : (
        ""
      )}
      <button
        onClick={(e) => {
          e.preventDefault();
          history.push("/register");
        }}
      >
        Register
      </button>
    </>
  );
}
