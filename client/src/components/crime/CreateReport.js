import React, { useContext, useState } from "react";
import { Form, Button, FloatingLabel } from "react-bootstrap";
import api from "../../utils/api";
import { CrimeContext } from "../../context/CrimeContext";
import AlertC from "../layout/Alert";
const CreateReport = () => {
  let [crimeDetails, setCrimeDetails] = useState({
    crimeType: "Theft",
    description: "",
  });

  const [error, setError] = useState("");

  const [validated, setValidated] = useState(false);

  const [otherText, setOtherText] = useState("");

  let { crimeType, description } = crimeDetails;

  const { setCrimes } = useContext(CrimeContext);

  const handleChange = (e) => {
    setCrimeDetails({ ...crimeDetails, [e.target.name]: e.target.value });
  };

  const handleOtherText = (e) => {
    setOtherText(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (crimeDetails.crimeType === "Other") {
      crimeDetails.crimeType = otherText;
    }
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
      setValidated(true);
      return false;
    }
    try {
      const res = await api.post("/crime", crimeDetails);
      console.log(res.data);
      setCrimes((prevState) => [...prevState, res.data]);
      //   getCurrentUserReports();
    } catch (err) {
      console.log(err.response.data.errors[0].msg);
      setError(err.response.data.errors[0].msg);
    }
  };

  return (
    <Form onSubmit={handleSubmit} noValidate validated={validated}>
      <Form.Group controlId="validationCustom01">
        <Form.Label>Select Crime Type</Form.Label>
        <Form.Select name="crimeType" value={crimeType} onChange={handleChange}>
          <option value="Theft">Theft</option>
          <option value="Burglary">Burglary</option>
          <option value="Murder">Murder</option>
          <option value="Attempt to Murder">Attempt to Murder</option>
          <option value="Assault">Assault</option>
          <option value="Hit and Run">Hit and Run</option>
          <option value="Other">Other</option>
        </Form.Select>
        {crimeType === "Other" ? (
          <Form.Group controlId="validationCustom02">
            <Form.Control
              type="text"
              placeHolder="Other Cases"
              onChange={handleOtherText}
              value={otherText}
            />
          </Form.Group>
        ) : null}
      </Form.Group>
      {error ? <AlertC msg={error} /> : null}
      <Form.Group controlId="validationCustom01">
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
        <Form.Control.Feedback type="invalid">
          Description cannot be empty
        </Form.Control.Feedback>
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
