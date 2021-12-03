import React from "react";
import { Spinner } from "react-bootstrap";
const Spinnner = () => {
  return (
    <Spinner
      animation="border"
      role="status"
      style={{ marginTop: "8rem", display: "block" }}
    >
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  );
};

export default Spinnner;
