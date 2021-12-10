import React, { useState, useContext } from "react";
import api from "../../utils/api";
import { Button, Col, Container, Form, Row, InputGroup } from "react-bootstrap";
import { useHistory, Redirect, Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import setAuthToken from "../../utils/setAuthToken";
import AlertC from "../layout/Alert";

const Login = () => {
  const [formData, setFormData] = useState({
    email: " ",
    password: "",
  });

  const [error, setError] = useState("");

  const [validated, setValidated] = useState(false);

  const { email, password } = formData;
  console.log(formData);

  const history = useHistory();

  const authContext = useContext(AuthContext);

  const { getUser, auth, loading } = authContext;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const form = e.currentTarget;
      if (form.checkValidity() === false) {
        e.preventDefault();
        e.stopPropagation();
        setValidated(true);
        return false;
      }
      const res = await api.post("/auth", formData);
      console.log(res.data);
      setAuthToken(res.data.token);
      getUser();
      setError("");
      history.push("/dashboard");
    } catch (err) {
      console.log(err.response.data.msg);
      setError(err.response.data.msg);
    }
  };
  if (!loading && auth) {
    return <Redirect to="/dashboard" />;
  }
  return (
    <Container>
      <Row className="mt-1">
        <Col
          lg={5}
          md={6}
          sm={12}
          className="p-5 m-auto shadow-sm rounded-lg"
          style={{ background: "#addae6" }}
        >
          {error ? <AlertC msg={error} /> : null}
          <Form noValidate validated={validated} onSubmit={onSubmit}>
            <h1 className="text-dark p-1 text-center rounded bold">Login</h1>
            <Form.Group controlId="validationCustomEmail">
              <Form.Label>Email address</Form.Label>
              <InputGroup hasValidation>
                <Form.Control
                  name="email"
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={onChange}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Enter you email
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <InputGroup hasValidation>
                <Form.Control
                  name="password"
                  type="password"
                  placeholder="Enter Password"
                  value={password}
                  onChange={onChange}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please enter a password.
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
            <Link to="/forgetPassword">
              <button type="button" class="btn btn-link">
                Forgot Password?
              </button>
            </Link>
            <div className="d-grid gap-2 mt-2">
              <Button variant="primary btn-block" type="submit">
                Login
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
