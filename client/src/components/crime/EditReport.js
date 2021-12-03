import React, { useState, Fragment, useContext } from "react";
import api from "../../utils/api";
import { CrimeContext } from "../../context/CrimeContext";
import { Form, Button, FloatingLabel } from "react-bootstrap";

const EditReport = ({ report }) => {
  //   console.log(report.id);
  const id = report.id;
  const [crimeType, setCrimeType] = useState(report.crimeType);
  const [description, setDescription] = useState(report.description);
  const { setCrimes } = useContext(CrimeContext);
  const formData = { crimeType, description };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const res = await api.put(`/crime/${id}`, formData);
      console.log(res.data);
      setCrimes((prevState) =>
        prevState.map((crime) => (crime.id === id ? res.data : crime))
      );
    } catch (err) {
      console.log(err.response);
    }
  };
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
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
      <Form.Group>
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
        {/* <Form.Control
          type="text"
          placeholder="Enter estimated time, scenario, place of crime, name or looks of perpetrator..."
          name="description"
          value={description}
          onChange={handleChange}
          required
        /> */}
      </Form.Group>
      <Button variant="success" type="submit" block>
        Submit Report
      </Button>
    </Form>
  );
};

export default EditReport;
