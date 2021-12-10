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
    <ul
      style={{ alignItems: "center", marginLeft: "auto" }}
      className="navbar-nav ml-auto"
    >
      <li className="nav-item">
        <i className="fas fa-user-circle fa-2x"></i>
      </li>
      <li className="nav-item">@{auth ? user?.username : null}</li>
      <li className="nav-item">
        <EditProfile />
      </li>
      <li className="nav-item nav-link">
        <Logout />
      </li>
    </ul>
  );
  const guestLinks = (
    <ul className="navbar-nav text-center" style={{ marginLeft: "auto" }}>
      <li className="nav-item">
        <Link to="/register" className="nav-link">
          Register
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/login" className="nav-link">
          Login
        </Link>
      </li>
    </ul>
  );
  return (
    <nav className="navbar navbar-expand-sm py-3 navbar-primary bg-primary">
      <div className="container">
        <h1>
          <i className="fas fa-search">Crime-Reporting</i>
        </h1>
        <button
          className="navbar-toggler"
          data-toggle="collapse"
          data-target="#menu"
        >
          <i className="fas fa-bars"></i>
        </button>
        <div className="collapse navbar-collapse" id="menu">
          <Fragment>{auth && user ? authLinks : guestLinks}</Fragment>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
