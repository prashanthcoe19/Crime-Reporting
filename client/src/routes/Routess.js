import React from "react";
import { Route, Switch } from "react-router-dom";
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";
import Dashboard from "../components/layout/Dashboard";
import ReportList from "../components/crime/ReportList";
import Private from "./Private";

const Routess = () => {
  return (
    <section className="container">
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Private exact path="/reportlist" component={ReportList} />
        <Private exact path="/dashboard" component={Dashboard} />
      </Switch>
    </section>
  );
};

export default Routess;
