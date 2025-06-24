import { faArrowUpRightFromSquare, faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ErrorMessage, Form, Formik } from "formik";
import MaterialTable from "material-table";
import React, { useState } from "react";
import { Button, Col, Modal, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { tableIcons } from "../core/tableIcons";

function Product() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const navigate = useNavigate();

  const columns = [
    {
      title: "S.No",
      field: "sNo",
      render: (rowData) => `${rowData?.tableData?.id + 1}`,
    },
    { title: "Product Name", field: "productName" },
    { title: "Code", field: "code" },
    { title: "Last Incremented Count", field: "lastIncremented" },
  ];
  return (
    <div className="m-5">
      <Button
        onClick={() => {
          setShow(true);
        }}
      >
        Create
      </Button>
      <MaterialTable
        icons={tableIcons}
        columns={columns}
        title="Products"
        actions={[
          (rowData) => ({
            icon: () => (
              <Row>
                <Col
                  className="d-flex"
                  // onClick={() => {
                  //   setEditValues(rowData);
                  //   handleShow();
                  // }}
                >
                  <FontAwesomeIcon icon={faPen} title="Edit Project" />
                </Col>
              </Row>
            ),
          }),
          (rowData) => ({
            icon: () => (
              <Row>
                <Col onClick={() => navigate("/defect", { state: { value: rowData } })}>
                  <FontAwesomeIcon icon={faArrowUpRightFromSquare} title="open defects" />
                </Col>
              </Row>
            ),
            // onClick: () => {
            //   navigate("/Defect");
            // },
          }),
        ]}
        options={{
          cellStyle: { border: "1px solid #eee" },
          addRowPosition: "first",
          actionsColumnIndex: -1,
          headerStyle: {
            backgroundColor: "#14539a",
            color: "whitesmoke",
            textAlign: "center",
            zIndex: 0,
          },
        }}
      />
      <Modal size="lg" show={show} onHide={handleClose} centered>
        <Modal.Header closeButton className="p-4 header-text-color">
          <Modal.Title className="text-center">
            {/* {edittValues ? <h4>Edit Project</h4> : */}
            <h4>Create Product</h4>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-5">
          <Formik
            initialValues={{
              name: "",
              code: "",
              lastIncremented: "",
            }}
            // validationSchema={validation}
            // onSubmit={(values) => {
            //   // editProject ? EditForm(values): submitForm(values);
            //   edittValues?.id ? EditForm(values) : demoSubmit(values);
            // }}
          >
            {(formik) => {
              const { values, handleChange, handleSubmit, handleBlur, isValid } = formik;
              return (
                <Form onSubmit={handleSubmit}>
                  <Form.Group>
                    <Form.Label>Product Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      id="name"
                      value={values.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="name"
                    />
                    <ErrorMessage name="name" className="error text-danger" component="span" />
                  </Form.Group>
                  <Form.Group className="mt-3">
                    <Form.Label>Code</Form.Label>
                    <Form.Control
                      type="text"
                      name="code"
                      id="code"
                      value={values.code}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="code"
                    />
                    <ErrorMessage name="code" className="error text-danger" component="span" />
                  </Form.Group>
                  <Form.Group className="mt-3">
                    <Form.Label>Last Incremented Count</Form.Label>
                    <Form.Control
                      type="text"
                      disabled
                      name="lastIncremented"
                      id="lastIncremented"
                      value={values.lastIncremented}
                      onChange={handleChange}
                      placeholder="lastIncremented"
                      onBlur={handleBlur}
                    />
                    <ErrorMessage name="lastIncremented" className="error text-danger" component="span" />
                  </Form.Group>
                  <div className="mt-3 d-flex justify-content-end">
                    <Button variant="outline-secondary" onClick={handleClose} className="me-3 px-4">
                      Close
                    </Button>
                    <Button variant="primary" type="submit">
                      Save Changes
                    </Button>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Product;
