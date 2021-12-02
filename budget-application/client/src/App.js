import "./assets/css/fontfamily.css";
import "./assets/css/index.min.css";
import { Switch, Route } from "react-router";
import PrivateLogin from "./navigation-guard/PrivateLogin";
import PrivatePage from "./navigation-guard/PrivatePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import TransactionForm from "./pages/TransactionForm";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <>
      <Switch>
        <PrivateLogin path="/login">
          <Login />
        </PrivateLogin>
        <PrivateLogin path="/register">
          <Register />
        </PrivateLogin>
        <PrivatePage path="/addTransaction">
          <TransactionForm />
        </PrivatePage>
        <PrivatePage exact path="/">
          <Home />
        </PrivatePage>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </>
  );
}

export default App;
