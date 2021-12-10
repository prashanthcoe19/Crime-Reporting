import React from "react";
import { Route, Switch } from "react-router-dom";
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";
// import Dashboard from "../components/layout/Dashboard";
import Private from "./Private";
import Index from "../components/layout/Index";
import CrimeDashboard from "../components/crime/CrimeDashboard";
import ForgetPassword from "../components/auth/ForgetPassword";
import NewPassword from "../components/auth/NewPassword";
import NotFound from "../components/layout/NotFound";

const Routess = (props) => {
  return (
    <section className="section-container">
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/forgetPassword" component={ForgetPassword} />
        <Route exact path="/newPassword" component={NewPassword} />
        <Private exact path="/dashboard" component={CrimeDashboard} />
        <Private exact path="/index" component={Index} />
        <Route path="*" component={NotFound} />
      </Switch>
    </section>
  );
};

export default Routess;
