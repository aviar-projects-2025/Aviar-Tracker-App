import React from "react";
import { Formik, Form, Field } from "formik";
import { DropdownButton, Dropdown , Card} from "react-bootstrap";
import moment from "moment";
import { useLocation } from "react-router-dom";
import Services from "../Services";
const ProjectStatus = () => {
  const day = new Date();
  const date = moment(day).format("DD-MM-YYYY");
  const time = moment(day).format("h:mma");
  const currentDate = date + "  " + time;
  const location = useLocation();
  const projectData = location.state
  const user = localStorage.getItem("userId");
  const createProjectStatus = (values) => {
   Services.createProjectStatus(values,projectData).then((res)=>{
   })
  };
  return (
    <Card className="project-status-card">
    <Card.Header>
      <Card.Title className="card-title">Project Status</Card.Title>
    </Card.Header>
    <Card.Body className="card-title">
    <Formik
      initialValues={{
        projectStatus: "",
        createdBy: user,
        createdAt: currentDate,
      }}
      onSubmit={(values, { setSubmitting }) => {
        createProjectStatus(values);
        setSubmitting(true);
      }}
    >
      {({ handleSubmit, values }) => (
        <Form onSubmit={handleSubmit}>
          <DropdownButton
            id="dropdown-button"
            title="Project Status"
            onSelect={(eventKey) => {
              values.projectStatus = eventKey;
              handleSubmit();
            }}
          >
            <Dropdown.Item eventKey="New">New</Dropdown.Item>
            <Dropdown.Item eventKey="Open">Open</Dropdown.Item>
            <Dropdown.Item eventKey="In Progress">In Progress</Dropdown.Item>
            <Dropdown.Item eventKey="On Review">On Review</Dropdown.Item>
            <Dropdown.Item eventKey="Closed">Closed</Dropdown.Item>
            <Dropdown.Item eventKey="Re-Open">Re-Open</Dropdown.Item>
          </DropdownButton>
          <Field type="hidden" name="projectStatus" />
        </Form>
      )}
    </Formik>
    </Card.Body>
    </Card>
  );
};
export default ProjectStatus;