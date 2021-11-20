import React, { useState, useContext } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Button, Col, Container, Form, Row, InputGroup } from "react-bootstrap";
import api from "../../utils/api";
import AlertC from "../layout/Alert";
const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    phone: " ",
  });
  const [error, setError] = useState("");
  const [validated, setValidated] = useState(false);
  const history = useHistory();
  const authContext = useContext(AuthContext);
  const { auth } = authContext;
  const { name, email, username, password, phone } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const form = e.currentTarget;
      if (form.checkValidity() === false) {
        e.preventDefault();
        e.stopPropagation();
        setValidated(true);
        return false;
      }
      const res = await api.post("/users", formData);
      console.log(res.data);
      history.push("/login");
    } catch (err) {
      console.log(err.response.data.errors[0].msg);
      setError(err.response.data.errors[0].msg);
      // setError(err.response.data.msg);
    }
  };
  if (auth === true) {
    return <Redirect to="/dashboard" />;
  }
  return (
    <Container>
      <h1 className="text-primary mt-2 p-3 text-center rounded">Register</h1>
      <Row className="mt-1">
        <Col lg={5} md={6} sm={12} className="p-5 m-auto shadow-sm rounded-lg">
          {error ? <AlertC msg={error} /> : null}
          <Form noValidate validated={validated} onSubmit={onSubmit}>
            <Form.Group controlId="validationCustom01">
              <Form.Label>Name</Form.Label>
              <InputGroup hasValidation>
                <Form.Control
                  name="name"
                  type="text"
                  placeholder="Enter name"
                  value={name}
                  onChange={onChange}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Enter you name
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
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
                  placeholder="Password"
                  value={password}
                  onChange={onChange}
                  minlength={6}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please enter a password.
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
            <Form.Group controlId="validationCustom03">
              <Form.Label>Username</Form.Label>
              <InputGroup hasValidation>
                <Form.Control
                  name="username"
                  type="text"
                  placeholder="Enter username"
                  value={username}
                  onChange={onChange}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please enter username.
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
            <Form.Group controlId="validationCustom03">
              <Form.Label>Phone</Form.Label>
              <InputGroup hasValidation>
                <Form.Control
                  name="phone"
                  type="number"
                  placeholder="Enter phone"
                  value={phone}
                  onChange={onChange}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please enter phone number
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
            <div className="d-grid gap-2 mt-2">
              <Button variant="primary btn-block" type="submit">
                Register
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
