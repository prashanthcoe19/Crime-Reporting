import React, { Fragment, useState, useEffect } from "react";
import EditReport from "./EditReport";
import { Modal, Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import moment from "moment";

const Reports = ({ report }) => {
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  useEffect(() => {
    handleClose();
  }, [report]);

  return (
    <Fragment>
      <td>{moment(report.createdAt).format("YYYY-MM-DD")}</td>
      <td>{report.crimeType}</td>
      <td>{report.description}</td>
      <td>{report.status}</td>
      <td>
        <OverlayTrigger overlay={<Tooltip id={`tooltip-top`}>Edit</Tooltip>}>
          <button
            onClick={handleShow}
            className="btn text-warning btn-act"
            data-toggle="modal"
          >
            <i class="fas fa-edit"></i>
          </button>
        </OverlayTrigger>
      </td>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Report</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditReport report={report} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close Button
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
};

export default Reports;
