import React, { useState, Fragment } from "react";
import { Button, Modal } from "react-bootstrap";
import api from "../../utils/api";
import AlertC from "./Alert";
const EditProfile = () => {
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    password: "",
    newPassword: "",
  });

  const [validated, setValidated] = useState(false);

  const [error, setError] = useState("");
  const handleClose = () => {
    setShow(false);
  };

  const handleShow = () => {
    setShow(true);
  };
  const { password, newPassword } = formData;
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
      const res = await api.put("/auth/changePassword", formData);
      setError("");
      console.log(res.data);
      handleClose();
    } catch (err) {
      console.log(err);
      setError(err.response.data.msg);
    }
  };
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Fragment>
      <Button variant="edit-button" onClick={handleShow}>
        Edit Profile <span />
        <i className="fas fa-edit"></i>
      </Button>{" "}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Change Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error ? <AlertC msg={error} /> : null}
          <form className="form" noValidate validated={validated}>
            <div className="form-group">
              {" "}
              <label className="form-control-label text-muted">
                Current Password
              </label>{" "}
              <input
                type="password"
                id="name1"
                name="password"
                placeholder="Current Password"
                className="form-control"
                value={password}
                onChange={onChange}
              />{" "}
            </div>
            <div className="form-group">
              {" "}
              <label className="form-control-label text-muted">
                New Password
              </label>{" "}
              <input
                type="password"
                id="name"
                name="newPassword"
                placeholder="New Password"
                className="form-control"
                value={newPassword}
                onChange={onChange}
              />{" "}
            </div>
            <div className="row justify-content-center my-3 px-3">
              <button className="btn-block btn-primary" onClick={onSubmit}>
                Submit
              </button>{" "}
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </Fragment>
  );
};
export default EditProfile;
