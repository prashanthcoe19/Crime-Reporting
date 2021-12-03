import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Button, Col, Form, Row, InputGroup } from "react-bootstrap";
// import setAuthToken from "../../utils/setAuthToken";
import AlertC from "../layout/Alert";
import { AuthContext } from "../../context/AuthContext";
const NewPassword = () => {
  const [formData, setFormData] = useState({
    token: "",
    password: "",
  });
  const { token, password } = formData;
  const history = useHistory();
  const [error, setError] = useState("");

  const [validated, setValidated] = useState(false);

  const authContext = useContext(AuthContext);

  //   const { user, getUser, auth, loading } = authContext;

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
      history.push("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Row className="mt-1">
      <Col lg={5} md={6} sm={12} className="p-5 m-auto shadow-sm rounded-lg">
        {error ? <AlertC msg={error} /> : null}
        <Form noValidate validated={validated} onSubmit={onSubmit}>
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
                  name="password"
                  type="password"
                  placeholder="Password"
                  value={password}
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
  );
};

export default NewPassword;
