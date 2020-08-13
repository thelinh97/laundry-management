import React from "react";
import "./App.css";
import Nav from "./components/Nav";
import AddOrder from "./components/AddOrder";
import SeeOrder from "./components/SeeOrder";
import Footerr from "./components/Footerr";
import { Switch, Route } from "react-router-dom";
import LogIn from "./components/LogIn";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <div>
      <Nav />

      <Switch>
        <PrivateRoute exact path="/" component={AddOrder} />
        <PrivateRoute path="/seeOrder" component={SeeOrder} />
        <Route path="/login" component={LogIn} />
      </Switch>

      <Footerr />
    </div>
  );
}

export default App;
