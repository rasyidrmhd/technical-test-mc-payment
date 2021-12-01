import { useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router";

export default function Login() {
  const location = useLocation();
  console.log(location);
  const history = useHistory();
  const { userdata } = useSelector((state) => state.userReducer);

  return (
    <>
      <h1>Hello from Login</h1>
      {location.state ? <span>{location.state.message}</span> : ""}
      <form>
        <label>Username / Email</label>
        <br />
      </form>
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
