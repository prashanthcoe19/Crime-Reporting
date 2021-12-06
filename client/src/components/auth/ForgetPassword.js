import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, Col, Container, Form, Row, InputGroup } from "react-bootstrap";
import AlertC from "../layout/Alert";
import api from "../../utils/api";
const ForgetPassword = () => {
  const [email, setEmail] = useState("");

  const [error, setError] = useState("");

  const [validated, setValidated] = useState(false);

  const history = useHistory();
  const onChange = (e) => {
    setEmail(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(email);
    try {
      const form = e.currentTarget;
      if (form.checkValidity() === false) {
        e.preventDefault();
        e.stopPropagation();
        setValidated(true);
        return false;
      }
      const res = await api.post("/auth/resetPassword", { email: email });
      console.log(res.data);
      setError("");
      history.push("/newPassword");
    } catch (err) {
      console.log(err.response.data);
      setError(err.response.data.msg);
    }
  };

  return (
    <Container style={{ marginTop: "5rem" }}>
      <Row className="mt-1">
        <Col lg={5} md={6} sm={12} className="p-5 m-auto shadow-sm rounded-lg">
          {error ? <AlertC msg={error} /> : null}
          {alert ? <AlertC msg={alert} /> : null}
          <Form noValidate validated={validated} onSubmit={onSubmit}>
            <Form.Group controlId="validationCustomEmail">
              <Form.Label>Enter Email to Reset Password</Form.Label>
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
                  Enter your email
                </Form.Control.Feedback>
              </InputGroup>
              <div className="d-grid gap-2 mt-2">
                <Button
                  variant="primary btn-block"
                  type="submit"
                  style={{ width: "100%" }}
                >
                  Send
                </Button>
              </div>
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default ForgetPassword;
