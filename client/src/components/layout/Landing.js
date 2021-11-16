import React from "react";
import { Link } from "react-router-dom";
const Landing = () => {
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
