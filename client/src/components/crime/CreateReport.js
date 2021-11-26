import React, { useContext, useState } from "react";
import { Form, Button, FloatingLabel } from "react-bootstrap";
import api from "../../utils/api";
import { CrimeContext } from "../../context/CrimeContext";
const CreateReport = () => {
  const [crimeDetails, setCrimeDetails] = useState({
    crimeType: "",
    description: "",
  });

  const { crimeType, description } = crimeDetails;

  const { setCrimes, getCurrentUserReports } = useContext(CrimeContext);

  const handleChange = (e) => {
    setCrimeDetails({ ...crimeDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/crime", crimeDetails);
      console.log(res.data);
      setCrimes((prevState) => [...prevState, res.data]);
      //   getCurrentUserReports();
    } catch (err) {
      console.log(err.response);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Select Crime Type</Form.Label>
        <Form.Select name="crimeType" value={crimeType} onChange={handleChange}>
          <option value="Theft">Theft</option>
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
            onChange={handleChange}
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

export default CreateReport;
