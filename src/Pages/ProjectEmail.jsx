import React from "react";
import { Button, Card, Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../css/AdminProjects.scss";

function ProjectEmail() {
  let navigate = useNavigate();

  const submit = () => {
    navigate("/admin/projects");
  };
  return (
    <Container className="admin-project">
      <Card className="p-5" style={{ backgroundColor: "lightblue" }}>
        <Form onSubmit={submit} className="p-5">
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>
              Enter your email Id to writes your defects<b className="text-danger">* </b>:
            </Form.Label>
            <div className="d-flex ">
              <Form.Control type="email" placeholder="example@gmail.com" required />
              <Button variant="primary" type="submit" className="ms-3">
                Submit
              </Button>
            </div>
          </Form.Group>
        </Form>
      </Card>
    </Container>
  );
}

export default ProjectEmail;
