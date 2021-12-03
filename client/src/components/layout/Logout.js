import React, { Fragment, useState, useContext } from "react";
import { Button, Modal } from "react-bootstrap";
import { AuthContext } from "../../context/AuthContext";
import { CrimeContext } from "../../context/CrimeContext";
const Logout = ({ history }) => {
  const [show, setShow] = useState(false);
  const { logout } = useContext(AuthContext);
  const { clearCrimeState } = useContext(CrimeContext);
  const handleLogout = () => {
    logout();
    clearCrimeState();
    setShow(false);
    // setPersonnal(null);
  };
  const handleClose = () => {
    setShow(false);
  };

  const handleShow = () => {
    setShow(true);
  };
  return (
    <Fragment>
      <Button variant="edit-button shadow-lg " onClick={handleShow}>
        Logout <span />
        <i className="fas fa-sign-out-alt"></i>
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Logout</Modal.Title>
        </Modal.Header>
        <Modal.Body>Do you want to log out of your account?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleLogout}>
            Yes
          </Button>
          <Button variant="primary" onClick={handleClose}>
            No
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
};
export default Logout;
