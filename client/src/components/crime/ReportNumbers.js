import React from "react";
import { Container, Row, Card, Col } from "react-bootstrap";
const ReportNumbers = () => {
  return (
    <Container>
      <Row>
        <Col>
          <Card
            style={{
              width: "12rem",
              background:
                "linear-gradient(to bottom, #0099ff 0%, #ccffcc 100%)",
            }}
          >
            <Card.Body>
              <Card.Title>Total Reported</Card.Title>
              <Card.Text>5</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card
            style={{
              width: "12rem",
              background:
                "linear-gradient(to bottom, #ff9933 0%, #ff33cc 100%)",
            }}
          >
            <Card.Body>
              <Card.Title>Pending</Card.Title>
              <Card.Text>5</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card
            style={{
              width: "12rem",
              background:
                "linear-gradient(to bottom, #00ff00 0%, #999966 100%)",
            }}
          >
            <Card.Body>
              <Card.Title>In Progress</Card.Title>
              <Card.Text>5</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card
            style={{
              width: "12rem",
              background:
                "linear-gradient(to bottom, #ff0000 0%, #996633 100%)",
            }}
          >
            <Card.Body>
              <Card.Title>Rejected</Card.Title>
              <Card.Text>5</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ReportNumbers;
