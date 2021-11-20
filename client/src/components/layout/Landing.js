import React, { useContext } from "react";
import { Link, Redirect } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
const Landing = () => {
  const { auth } = useContext(AuthContext);
  if (auth) return <Redirect to="/dashboard" />;
  return (
    <div>
      <h1>Report Your Crime! Log into your account</h1>
      <ul>
        <li>
          <Link to="/login">Login</Link>
        </li>
      </ul>
    </div>
  );
};

export default Landing;
