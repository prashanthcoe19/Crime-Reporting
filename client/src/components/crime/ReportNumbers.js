import React, { useContext, useEffect } from "react";
import { Container, Row, Card, Col } from "react-bootstrap";
import { CrimeContext } from "../../context/CrimeContext";
// import Spinnner from "../layout/Spinner";
const ReportNumbers = () => {
  const crimeContext = useContext(CrimeContext);
  const {
    loading,
    pending,
    inProgress,
    completed,
    rejected,
    getPendingReports,
    getCompletedReports,
    getRejectedReports,
    getInProgressReports,
  } = crimeContext;
  useEffect(() => {
    getPendingReports();
    getCompletedReports();
    getRejectedReports();
    getInProgressReports();
  }, []);

  // if (loading) return <Spinnner />;
  return (
    <Container>
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Solved</Card.Title>
              <Card.Text>{!loading ? completed?.length : 0}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Pending</Card.Title>
              <Card.Text>{!loading ? pending?.length : 0}</Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col>
          <Card>
            <Card.Body>
              <Card.Title>In Progress</Card.Title>
              <Card.Text>{!loading ? inProgress?.length : 0}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Rejected</Card.Title>
              <Card.Text>{!loading ? rejected?.length : 0}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ReportNumbers;
