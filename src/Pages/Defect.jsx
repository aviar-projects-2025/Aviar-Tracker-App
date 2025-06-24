import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ErrorMessage, Formik } from "formik";
import MaterialTable from "material-table";
import * as Yup from "yup";
import React, { useEffect, useState } from "react";
import { Button, Col, Form, Modal, Nav, Row } from "react-bootstrap";
import { tableIcons } from "../core/tableIcons";
import { useLocation, useNavigate } from "react-router-dom";
import Services from "../Services";
import { toast } from "react-toastify";
import Loader from "../core/Loader";
function Defect(props) {
  const [show, setShow] = useState(false);
  const [defectData, setDefectData] = useState();
  const handleClose = () => setShow(false);
  let navigate = useNavigate();
  const location = useLocation();
  const data = location?.state?.value;
  const proejctId = data?.id;
  const getDefectData = (id) => {
    Services.getDefects(id).then((res) => {
      setDefectData(res.defectData);
    });
  };
  const submitForm = (values) => {
    Services.createDefects(values, data?.id)
      .then((res) => {
        setDefectData([...defectData, res?.defects]);
        handleClose();
        toast.success("Defect created sucessfully !");
      })
      .catch((err) => {
        if (err.status === 400) {
          handleClose();
          toast.error("Defect Already Exist.");
        }
      });
  };
  useEffect(() => {
    getDefectData(proejctId);
  }, [proejctId]);
  const validation = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    code: Yup.string().required("Code is required"),
    // defect: Yup.string().required("Defects is required"),
  });
  const columns = [
    {
      title: "S.No",
      render: (rowData) => `${rowData?.tableData?.id + 1}`,
    },
    { title: "Name", field: "name" },
    { title: "Code", field: "code" },
    // { title: "Defects", field: "defects" },
  ];
  return (
    <div className="m-5">
      <div className="d-flex justify-content-between mb-3">
        <div></div>
        <Button
          variant="primary"
          onClick={() => {
            setShow(true);
          }}
        >
          Create Defect
        </Button>
      </div>
      <MaterialTable
        title="Projects Defects"
        icons={tableIcons}
        columns={columns}
        data={defectData}
        actions={[
          (rowData) => ({
            icon: () => (
              <Row>
                <Col
                  className="nav-font-color"
                  onClick={() => navigate("/project/defects", { state: { values: rowData } })}
                >
                  <FontAwesomeIcon icon={faPlus} title="List" />
                </Col>
              </Row>
            ),
          }),
        ]}
        options={{
          cellStyle: { border: "1px solid #eee", textAlign: "center", textAlign: "center" },
          addRowPosition: "first",
          actionsColumnIndex: -1,
          headerStyle: {
            backgroundColor: "#14539A",
            color: "whitesmoke",
            textAlign: "center",
            zIndex: 0,
          },
        }}
      />
      <Modal show={show} onHide={handleClose} centered backdrop="static">
        <Modal.Header closeButton className="p-4 bg-light text header-text-color renctangeled-5">
          <Modal.Title className="text-center modal-div">
            <h4>Create Defect</h4>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-5">
          <Formik
            initialValues={{ name: "", code: "", defect: "" }}
            validationSchema={validation}
            onSubmit={(values) => {
              submitForm(values);
            }}
          >
            {(formik) => {
              const { values, handleChange, handleSubmit, handleBlur, isValid } = formik;
              return (
                <Form onSubmit={handleSubmit}>
                  <Form.Group>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      id="name"
                      value={values.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <ErrorMessage name="name" className="error text-danger" component="span" />
                  </Form.Group>
                  <Form.Group className="mt-3">
                    <Form.Label>Code</Form.Label>
                    <Form.Control
                      type="text"
                      id="code"
                      value={values.code}
                      name="code"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <ErrorMessage name="code" className="error text-danger" component="span" />
                  </Form.Group>
                  {/* <Form.Group className="mt-3">
                    <Form.Label>Defects</Form.Label>
                    <Form.Control
                      type="text"
                      name="defect"
                      id="defect"
                      value={values.defect}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <ErrorMessage name="defect" className="error text-danger" component="span" />
                  </Form.Group> */}
                  <div className="mt-4 d-flex justify-content-end">
                    <Button variant="outline-secondary" onClick={handleClose} className="mx-2">
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
export default Defect;
