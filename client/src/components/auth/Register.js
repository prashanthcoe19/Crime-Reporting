import React, { Fragment, useState, useContext } from "react";
import { Link, Redirect, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import api from "../../utils/api";
const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    phone: " ",
  });
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const { auth } = authContext;
  const { name, email, username, password, phone } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const res = await api.post("/user", formData);
      console.log(res.data);
      navigate("/welcome");
    } catch (err) {
      console.log(err.response.data);
    }
  };
  if (auth === true) {
    return <Redirect to="/dashboard" />;
  }
  return (
    <Fragment>
      <h1 className="medium text-secondary">Register</h1>
      <p className="lead">
        <i className="fas fa-user" /> Create Your Account
      </p>
      <form className="form" onSubmit={onSubmit}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={name}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Username"
            name="username"
            value={username}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <input
            type="phone"
            placeholder="phone"
            name="phone"
            value={phone}
            onChange={onChange}
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
    </Fragment>
  );
};

export default Register;
