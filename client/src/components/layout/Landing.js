import React, { useContext } from "react";
import { Link, Redirect } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
const Landing = () => {
  const { auth, user, loading } = useContext(AuthContext);
  console.log(auth);
  if (auth & !loading) return <Redirect to="/dashboard" />;
  return (
    <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large">Crime Reporting</h1>
          <p className="lead">Report any crime you see in your neighborhood</p>
          <div className="buttons">
            <Link
              to="/register"
              className="btn btn-primary"
              style={{ marginRight: "5px" }}
            >
              Sign Up
            </Link>
            <Link to="/login" className="btn btn-primary">
              Login
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Landing;
