import React, { useContext, Fragment } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
const Navbar = () => {
  const authContext = useContext(AuthContext);
  const { user, auth, loading } = authContext;
  console.log(user);
  const authLinks = (
    <Fragment>
      <ul>
        <li>
          {auth && loading ? <h1>Loading...</h1> : <h5>@{user?.username}</h5>}
        </li>
      </ul>
      <ul>
        <li>Logout</li>
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
    <nav className="navbar navbar-expand-lg bg-dark">
      <h1>
        <i className="fas fa-address-card">Crime-Reporting</i>
      </h1>
      <Fragment>{auth && !loading ? authLinks : guestLinks}</Fragment>
    </nav>
  );
};

export default Navbar;
