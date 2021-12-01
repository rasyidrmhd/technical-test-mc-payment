import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router";
import { register } from "../store/actions/userAction";

export default function Register() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [inputRegister, setInputRegister] = useState({
    username: "",
    email: "",
    name: "",
    password: "",
  });
  const [errors, setErrors] = useState([]);

  const handleInputRegister = (e) => {
    const { name, value } = e.target;

    setInputRegister({
      ...inputRegister,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register(inputRegister))
      .then((response) => {
        history.push({
          pathname: "/login",
          state: { message: "Your account successfully registered. You can login now!" },
        });
      })
      .catch((err) => {
        setErrors(err);
      });
  };

  return (
    <>
      <h1>Hello from Register</h1>
      <form onSubmit={handleSubmit}>
        <label>Username</label> <br />
        <input type="text" placeholder="Username here" autoComplete="off" name="username" defaultValue={inputRegister.username} onChange={handleInputRegister} /> <br />
        <label>Email</label> <br />
        <input type="text" placeholder="Email here" autoComplete="off" name="email" defaultValue={inputRegister.email} onChange={handleInputRegister} /> <br />
        <label>Name</label> <br />
        <input type="text" placeholder="Name here" autoComplete="off" name="name" defaultValue={inputRegister.name} onChange={handleInputRegister} /> <br />
        <label>Password</label> <br />
        <input type="password" placeholder="Passowrd here" autoComplete="off" name="password" defaultValue={inputRegister.password} onChange={handleInputRegister} /> <br />
        <button type="submit">Register</button>
      </form>
      <br />
      {errors.length > 0
        ? errors.map((err) => {
            return (
              <>
                <span>{err}</span> <br />
              </>
            );
          })
        : ""}
      <button
        onClick={(e) => {
          e.preventDefault();
          history.push("/login");
        }}
      >
        Login
      </button>
    </>
  );
}
