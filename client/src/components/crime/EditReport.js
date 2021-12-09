import React, { useState, useContext } from "react";
import api from "../../utils/api";
import { CrimeContext } from "../../context/CrimeContext";
import { Form, Button, FloatingLabel } from "react-bootstrap";
import AlertC from "../layout/Alert";
const EditReport = ({ report }) => {
  //   console.log(report.id);
  const id = report.id;
  const [crimeType, setCrimeType] = useState(report.crimeType);
  const [description, setDescription] = useState(report.description);
  const { setCrimes } = useContext(CrimeContext);
  const formData = { crimeType, description };
  const [error, setError] = useState("");

  const [validated, setValidated] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(formData);
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
      setValidated(true);
      return false;
    }
    try {
      const res = await api.put(`/crime/${id}`, formData);
      console.log(res.data);
      setCrimes((prevState) =>
        prevState.map((crime) => (crime.id === id ? res.data : crime))
      );
    } catch (err) {
      console.log(err.response.data.errors[0].msg);
      setError(err.response.data.errors[0].msg);
    }
  };
  return (
    <Form onSubmit={handleSubmit} noValidate validated={validated}>
      <Form.Group controlId="validationCustom01">
        <Form.Label>Select Crime Type</Form.Label>
        <Form.Select
          name="crimeType"
          value={crimeType}
          onChange={(e) => setCrimeType(e.target.value)}
        >
          <option defaultValue="Theft">Theft</option>
          <option value="Burglary">Burglary</option>
          <option value="Murder">Murder</option>
          <option value="Attempt to Murder">Attempt to Murder</option>
          <option value="Assault">Assault</option>
          <option value="Hit and Run">Assault</option>
          <option>Other</option>
        </Form.Select>
      </Form.Group>
      <Form.Group controlId="validationCustom01">
        {error ? <AlertC msg={error} /> : null}
        <Form.Label>Description</Form.Label>
        <FloatingLabel controlId="floatingTextarea2" label="Description">
          <Form.Control
            as="textarea"
            placeholder="Enter estimated time, scenario, place of crime, name or looks of perpetrator..."
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{ height: "100px" }}
          />
        </FloatingLabel>
      </Form.Group>
      <Button variant="success" type="submit" block>
        Submit Report
      </Button>
    </Form>
  );
};

export default EditReport;
