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

  const [searchTerm, setSearchTerm] = useState("");

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

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
          <div className="col-sm-4">
            <h2>
              Manage <b>Reports</b>
            </h2>
          </div>
          <div className="col-sm-4">
            <form className="form-inline my-2 my-lg-0">
              <input
                className="form-control mr-sm-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                }}
              />
            </form>
          </div>
          <div className="col-sm-4">
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
          {crimes
            .filter((report) => {
              if (searchTerm === "") {
                return report;
              } else if (
                report.crimeType
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase()) ||
                report.description
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase()) ||
                report.status
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase()) ||
                report.createdAt.includes(searchTerm)
              ) {
                return report;
              }
            })
            .map((report) => (
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
