import { Modal, Button, Alert, Table } from "react-bootstrap";
import { useContext, useEffect, useState } from "react";
import { CrimeContext } from "../../context/CrimeContext";
import Reports from "./Reports";
import CreateReport from "./CreateReport";
// import Pagination from "./Pagination";

const ReportList = () => {
  const crimeContext = useContext(CrimeContext);

  const { crimes } = crimeContext;
  //   console.log(crimes);
  const [showAlert, setShowAlert] = useState(false);

  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  // const [currentPage, setCurrentPage] = useState(1);
  // const [employeesPerPage] = useState(2)

  const handleShowAlert = () => {
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 2000);
  };

  useEffect(() => {
    handleClose();

    return () => {
      handleShowAlert();
    };
  }, [crimes]);

  return (
    <>
      <div className="table-title">
        <div className="row">
          <div className="col-sm-6">
            <h2>
              Manage <b>Reports</b>
            </h2>
          </div>
          <div className="col-sm-6">
            <Button
              onClick={handleShow}
              className="btn btn-success"
              data-toggle="modal"
            >
              <i class="fa fa-plus-circle" aria-hidden="true"></i>{" "}
              <span>Create a Report</span>
            </Button>
          </div>
        </div>
      </div>

      <Alert show={showAlert} variant="success">
        Report Successfully Submitted
      </Alert>

      <Table responsive="sm" className="table table-striped table-hover">
        <thead>
          <tr>
            <th>Date</th>
            <th>CrimeType</th>
            <th>Description</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {crimes.map((report) => (
            <tr key={report.id}>
              <Reports report={report} />
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal
        show={show}
        onHide={handleClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Create Report</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CreateReport />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close Button
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ReportList;
