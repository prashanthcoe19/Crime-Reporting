import React, { useContext, Fragment } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import Logout from "./Logout";
import EditProfile from "./EditProfile";
const Navbar = () => {
  const authContext = useContext(AuthContext);
  const { user, auth } = authContext;
  console.log(auth, user);
  const authLinks = (
    <Fragment>
      <ul style={{ alignItems: "center" }}>
        <li style={{ marginRight: "5px" }}>
          <EditProfile />
        </li>
        <li style={{ marginRight: "5px" }}>
          <i class="fas fa-user-circle fa-2x"></i>
        </li>
        <li style={{ margin: "0 5px 0 0" }}>@{auth ? user?.username : null}</li>
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
      <Fragment>{auth && user ? authLinks : guestLinks}</Fragment>
    </nav>
  );
};

export default Navbar;
