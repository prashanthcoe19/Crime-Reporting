import React, { useContext, Fragment } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import Logout from "./Logout";
const Navbar = () => {
  const authContext = useContext(AuthContext);
  const { user, auth, loading } = authContext;
  console.log(auth, user);
  const authLinks = (
    <Fragment>
      <ul style={{ alignItems: "center" }}>
        <li style={{ margin: "0 5px 0 0" }}>@{user?.username}</li>
        <li>
          <Logout />
        </li>
      </ul>
    </Fragment>
  );
  const guestLinks = (
    <ul>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </ul>
  );
  return (
    <nav className="navbar navbar-expand-lg">
      <h1>
        <i className="fas fa-search">Crime-Reporting</i>
      </h1>
      <Fragment>{user ? authLinks : guestLinks}</Fragment>
    </nav>
  );
};

export default Navbar;
