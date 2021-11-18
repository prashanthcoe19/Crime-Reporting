import React from "react";
import { Route, Switch } from "react-router-dom";
import Login from "../components/auth/Login";
import Dashboard from "../components/layout/Dashboard";
import Private from "./Private";

const Routess = () => {
  return (
    <section className="container">
      <Switch>
        <Route exact path="/login" component={Login} />
        <Private exact path="/dashboard" component={Dashboard} />
      </Switch>
    </section>
  );
};

export default Routess;
