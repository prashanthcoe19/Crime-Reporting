import React, { useState, useContext } from "react";
import api from "../../utils/api";
import { Button, Col, Container, Form, Row, InputGroup } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import setAuthToken from "../../utils/setAuthToken";

const Login = () => {
  const [formData, setFormData] = useState({
    email: " ",
    password: " ",
  });

  const [validated, setValidated] = useState(false);

  const { email, password } = formData;

  const history = useHistory();

  const authContext = useContext(AuthContext);

  const { getUser } = authContext;

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
      history.push("/dashboard");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container>
      <h1 className="text-primary mt-2 p-3 text-center rounded">Login</h1>
      <Row className="mt-1">
        <Col lg={5} md={6} sm={12} className="p-5 m-auto shadow-sm rounded-lg">
          <Form noValidate validated={validated} onSubmit={onSubmit}>
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
                  Please enter you email.
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
