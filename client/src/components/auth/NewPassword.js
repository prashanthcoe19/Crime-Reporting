import React, { useState } from "react";
import { Button, Col, Form, Row, InputGroup, Container } from "react-bootstrap";
import AlertC from "../layout/Alert";
import api from "../../utils/api";
const NewPassword = () => {
  const [formData, setFormData] = useState({
    token: "",
    newPassword: "",
  });
  const { token, newPassword } = formData;
  const [error, setError] = useState("");
  const [alert, setAlert] = useState("");
  const [validated, setValidated] = useState(false);

  //   const { user, getUser, auth, loading } = authContext;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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
      const res = await api.post("/auth/newPassword", formData);
      console.log(res.data);
      setTimeout(() => {
        setAlert("Password successfully changed, Go to Login Page");
      }, 1000);
      setFormData(" ");
      setAlert(" ");
      setError(" ");
    } catch (err) {
      console.log(err.response);
      setError(err.response.data.error);
    }
  };

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
            <h5 className="text-dark text-center rounded">Reset Password</h5>
            <Form.Group controlId="validationCustomEmail">
              <Form.Label>Token</Form.Label>
              <InputGroup hasValidation>
                <Form.Control
                  name="token"
                  type="text"
                  placeholder="Enter token"
                  value={token}
                  onChange={onChange}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Enter you email
                </Form.Control.Feedback>
              </InputGroup>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <InputGroup hasValidation>
                  <Form.Control
                    name="newPassword"
                    type="password"
                    placeholder="Password"
                    value={newPassword}
                    onChange={onChange}
                    minlength={6}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Enter a new password.
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
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

export default NewPassword;
