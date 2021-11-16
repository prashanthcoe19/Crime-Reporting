import React, { useState, useContext } from "react";
import api from "../../utils/api";
// import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
const Login = () => {
  const [formData, setFormData] = useState({
    email: " ",
    password: " ",
  });
  const { email, password } = formData;
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const { getUser } = authContext;
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth", formData);
      console.log(res.data);
      getUser();
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div id="login">
      <h3 className="text-center text-white pt-5">Login form</h3>
      <div className="container">
        <div
          id="login-row"
          className="row justify-content-center align-items-center"
        >
          <div id="login-column" className="col-md-6">
            <div id="login-box" className="col-md-12">
              <form id="login-form" className="form" onSubmit={onSubmit}>
                <h3 className="text-center text-info">Login</h3>
                <div className="form-group">
                  <label for="email" className="text-info">
                    Email:
                  </label>
                  <br />
                  <input
                    type="text"
                    name="email"
                    id="email"
                    className="form-control"
                    value={email}
                    onChange={onChange}
                  />
                </div>
                <div className="form-group">
                  <label for="password" className="text-info">
                    Password:
                  </label>
                  <br />
                  <input
                    type="text"
                    name="password"
                    id="password"
                    className="form-control"
                    value={password}
                    onChange={onChange}
                  />
                </div>
                <input
                  type="submit"
                  name="submit"
                  className="btn btn-info btn-md"
                  value="submit"
                />
              </form>
              <p className="my-1">Don't have an account? Sign Up</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
