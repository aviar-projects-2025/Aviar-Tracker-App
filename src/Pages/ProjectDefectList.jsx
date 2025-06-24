import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import "../css/AdminProjects.scss";

function ProjectDefectList() {
  const [image, setImage] = useState(null);
  return (
    <Container>
      <section className="admin-project">
        <Form>
          <h3 className="text-center mb-4">Kharphi Defect list create</h3>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Defect Module Name :</Form.Label>
            <Form.Control type="String" placeholder="defect no.10" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Actual Result</Form.Label>
            <Form.Control type="String" placeholder="actual result" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Expected Result</Form.Label>
            <Form.Control type="String" placeholder="expected result" />
          </Form.Group>

          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Defect image file upload</Form.Label>
            <Form.Control
              type="file"
              name="myImage"
              onChange={(event) => {
                setImage(event.target.files[0]);
              }}
            />
          </Form.Group>
          {image && (
            <>
              <img alt="not fount" className="defect-image" src={URL.createObjectURL(image)} />
              <br />
              <Button variant="outline-secondary" className="mt-3" onClick={() => setImage(null)}>
                Remove
              </Button>
            </>
          )}
          <br />
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Description :</Form.Label>
            <Form.Control as="textarea" rows={3} />
          </Form.Group>
          <Button variant="primary">Submit Defect</Button>
        </Form>
      </section>
    </Container>
  );
}

export default ProjectDefectList;
