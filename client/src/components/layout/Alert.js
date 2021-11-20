import React, { Fragment } from "react";
import { Alert } from "react-bootstrap";

const AlertC = (props) => {
  return (
    <Fragment>
      <Alert variant="danger">
        <Alert.Heading style={{ fontSize: "20px" }}>{props.msg}</Alert.Heading>
      </Alert>
    </Fragment>
  );
};

export default AlertC;
