import "./App.css";
import { Switch, Route } from "react-router";
import PrivateLogin from "./navigation-guard/PrivateLogin";
import PrivatePage from "./navigation-guard/PrivatePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import TransactionDetail from "./pages/TransactionDetail";
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
        <PrivatePage path="/transaction/:idTransaction">
          <TransactionDetail />
        </PrivatePage>
        <PrivatePage exact path="/">
          <Home />
        </PrivatePage>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </>
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
    //       Learn ReactJS &nbsp; {message}
    //     </a>
    //   </header>
    // </div>
  );
}

export default App;
