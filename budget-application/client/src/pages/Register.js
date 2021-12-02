import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
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
    <div className="row justify-content-center align-items-center" style={{ minHeight: "100vh", width: "100vw" }}>
      <div className="col-md-5 col-10">
        <div className="card o-hidden border-0 shadow-lg custom-border-20">
          <div className="card-body p-0">
            <div className="p-5">
              <div className="text-center">
                <h1 className="h2 text-primary font-weight-bolder">Budget Application</h1>
                {errors.length > 0
                  ? errors.map((err) => {
                      return (
                        <>
                          <span className="badge badge-danger mr-1">{err}</span>
                        </>
                      );
                    })
                  : ""}
              </div>
              <form className="mt-4 mb-2 user" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <input
                    type="text"
                    className="form-control rounded-pill shadow-none"
                    autoComplete="off"
                    placeholder="Enter your unique username"
                    name="username"
                    id="username"
                    defaultValue={inputRegister.username}
                    onChange={handleInputRegister}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input type="text" className="form-control rounded-pill shadow-none" autoComplete="off" placeholder="Enter your name" name="name" id="name" defaultValue={inputRegister.name} onChange={handleInputRegister} />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input type="text" className="form-control rounded-pill shadow-none" autoComplete="off" placeholder="Enter your valid email" name="email" id="email" defaultValue={inputRegister.email} onChange={handleInputRegister} />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    className="form-control rounded-pill shadow-none"
                    autoComplete="off"
                    placeholder="Enter you strong password"
                    name="password"
                    id="password"
                    defaultValue={inputRegister.password}
                    onChange={handleInputRegister}
                  />
                </div>
                <button type="submit" className="btn btn-primary btn-block rounded-pill">
                  Register
                </button>
              </form>
              <div className="text-center">
                Already have an account? Click&nbsp;
                <Link className="text-decoration-none text-primary" to="/login">
                  here
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    // <>
    //   <form onSubmit={handleSubmit}>
    //     <label>Username</label> <br />
    //     <input type="text" placeholder="Username here" autoComplete="off" name="username" defaultValue={inputRegister.username} onChange={handleInputRegister} /> <br />
    //     <label>Email</label> <br />
    //     <input type="text" placeholder="Email here" autoComplete="off" name="email" defaultValue={inputRegister.email} onChange={handleInputRegister} /> <br />
    //     <label>Name</label> <br />
    //     <input type="text" placeholder="Name here" autoComplete="off" name="name" defaultValue={inputRegister.name} onChange={handleInputRegister} /> <br />
    //     <label>Password</label> <br />
    //     <input type="password" placeholder="Passowrd here" autoComplete="off" name="password" defaultValue={inputRegister.password} onChange={handleInputRegister} /> <br />
    //     <button type="submit">Register</button>
    //   </form>
    //   <br />
    //   {errors.length > 0
    //     ? errors.map((err) => {
    //         return (
    //           <>
    //             <span>{err}</span> <br />
    //           </>
    //         );
    //       })
    //     : ""}
    //   <button
    //     onClick={(e) => {
    //       e.preventDefault();
    //       history.push("/login");
    //     }}
    //   >
    //     Login
    //   </button>
    // </>
  );
}
