import { ErrorMessage, Formik } from "formik";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import { Accordion, Button, Card, Col, Form, Modal, Row } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import "../css/defect-details.scss";
import * as Yup from "yup";
import Services from "../Services";
import { toast } from "react-toastify";
import Loader from "../core/Loader";
import Api from "../Config/Api";
import moment from "moment";
import { capitalize } from "@material-ui/core";

function Defectportal() {
  const location = useLocation();
  const defectData = location.state.values;
  const navigate = useNavigate();
  const [data, setData] = useState();
  const [show, setShow] = useState(false);
  const [statusModal, setStatusModal] = useState(false);
  const [newStatus, setNewStatus] = useState([]);
  const [priorityModal, setPriorityModal] = useState(false);
  const [newPriority, setNewPriority] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const role = localStorage.getItem("role");
  const statusClose = () => setStatusModal(false);
  const [projectId, setProjectId] = useState();
  const Capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const getDefectDetail = () => {
    const defectId = defectData?.id;
    Api.get(`/defects/detail/get/${defectId}`).then((res) => {
      const data = res?.data?.data?.getOne;
      setData(data);
      setProjectId(data?.projectId);
    });
  };
  const priorities = (values) => {
    const projectId = localStorage.getItem("projectId");
    const userId = localStorage.getItem("userId");
    const date = moment().format("lll");
    Api.post("/priority/", {
      priority: values.createNewPriority,
      projectId: projectId,
      createdBy: userId,
      createdAt: date,
    }).then((res) => {
      getPriorities();
      setPriorityModal(false);
      toast.success(`New priority ${res?.data?.data?.createModel?.priority} created`);
    });
  };
  const getPriorities = () => {
    const id = defectData?.values?.projectId;
    const projectId = localStorage.getItem("projectId");
    Api.get(`priority/project/get/${id ? id : projectId}`).then((res) => {
      setNewPriority(res?.data?.data);
    });
  };

  const statuses = (values) => {
    const projectId = localStorage.getItem("projectId");
    const userId = localStorage.getItem("userId");
    const date = moment().format("lll");
    Api.post("/status/", {
      setStatus: values.createNewStatus,
      projectId: projectId,
      createdBy: userId,
      createdAt: date,
    }).then((res) => {
      getStatuses();
      setStatusModal(false);
      toast.success(`New Status ${res?.data?.data?.createModel?.setStatus} created`);
    });
  };
  const getStatuses = () => {
    const id = defectData?.values?.projectId;
    const projectId = localStorage.getItem("projectId");
    Api.get(`/status/project/get/${id ? id : projectId}`).then((res) => {
      setNewStatus(res?.data?.data);
    });
  };

  useEffect(() => {
    getDefectDetail();
    getStatuses();
    getPriorities();
  }, []);
  const validation = Yup.object().shape({
    typeOfDefect: Yup.object().required("Type of defect is required"),
    summary: Yup.string().required("Summary is required"),
    description: Yup.string().required("Description is required"),
    defect: Yup.string().required("Ticket name is required"),
    actualResult: Yup.string().required("Actual result is required"),
    expectedResult: Yup.string().required("Expected result is required"),
    priority: Yup.object().required("Priority is required"),
    status: Yup.object().required("Status is required"),
  });
  const statusValidation = Yup.object().shape({
    createNewStatus: Yup.string().required("Status is required"),
  });

  const priority = [
    { value: "Low", label: "Low" },
    { value: "Medium", label: "Medium" },
    { value: "High", label: "High" },
    { value: "Critical", label: "Critical" },
  ];

  // const status = [
  //   { value: "Open", label: "Open" },
  //   { value: "Closed", label: "Closed" },
  //   { value: "Re-Open", label: "Re-Open" },
  //   { value: "Create New Status", label: "Create New Status" },
  // ];
  const priorityValidation = Yup.object().shape({
    createNewPriority: Yup.string().required("Priority is required"),
  });

  // const status = [
  //   { value: "Open", label: "Open" },
  //   { value: "Closed", label: "Closed" },
  //   { value: "Re-Open", label: "Re-Open" },
  // ];

  const updateDefectsList = (values) => {
    setIsLoading(true);
    const reportedBy = localStorage.getItem("userId");
    const id = defectData?.id;
    Services.updateDefectDetails(id, values, defectData, reportedBy).then((res) => {
      setIsLoading(false);
      toast.success(`Updated ${res?.updateStatus?.defect} details`);
      getDefectDetail();
      // navigate(`/project/defects/list/`, {
      //   state: { values: defectData },
      // });
    });
  };
  const deleteDefect = () => {
    const defectId = defectData?.id;
    Services.deleteDefects(defectId).then((res) => {
      getDefectDetail();
      navigate("/project/defect", { state: defectData });
      toast.success(`Defect Deleted Successfully`);
    });
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div class="mr-auto p-4">
          <Card bg="light">
            <Formik
              enableReinitialize={true}
              initialValues={{
                defect: data?.defect,
                description: data?.description,
                summary: data?.summary,
                expectedResult: data?.expectedResult,
                actualResult: data?.actualResult,
                status: data?.status
                  ? {
                      label: data?.status,
                      value: data?.status,
                    }
                  : "",

                typeOfDefect: data?.typeOfDefect
                  ? {
                      label: data?.typeOfDefect,
                      value: data?.typeOfDefect,
                    }
                  : "",
                priority: data?.priority,
              }}
              validationSchema={validation}
              onSubmit={(values) => updateDefectsList(values)}
            >
              {(formik) => {
                const { values, handleChange, handleSubmit, handleBlur, isValid, setFieldValue } = formik;
                return (
                  <Form onSubmit={handleSubmit}>
                    <h5 className="m-4 text-center fw-bold header-text-color">Ticket Details</h5>
                    <div className="defect-portal-form m-4  ">
                      <Row>
                        <Col>
                          <Form.Group>
                            <Form.Label className="m-0 mb-0">Ticket Name:</Form.Label>
                            <text className="text-danger">*</text>
                            <Form.Control
                              type="string"
                              name="defect"
                              placeholder="Defect Name"
                              value={values.defect ? Capitalize(values.defect) : null}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                            <ErrorMessage name="defect" className="error text-danger" component="span" />
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row className="mt-3">
                        <Col>
                          <Form.Group>
                            <Form.Label className="m-0 mb-0" notify="true">
                              Summary:<text className="text-danger">*</text>
                            </Form.Label>
                            <Form.Control
                              type="text"
                              className="w-100"
                              placeholder="Defect Name"
                              name="summary"
                              value={values.summary}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                            <ErrorMessage name="summary" className="error text-danger" component="span" />
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row className="mt-3">
                        <Col>
                          <Form.Group>
                            <Form.Label className="m-0 mb-0">Description</Form.Label>
                            <text className="text-danger">*</text>
                            <Form.Control
                              as="textarea"
                              name="description"
                              placeholder="Description"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.description}
                            />
                            <ErrorMessage name="description" className="error text-danger" component="span" />
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row className="mt-3">
                        <Form.Group>
                          <Form.Label className="m-0 mb-0" notify="true">
                            Expected Result<text className="text-danger">*</text>
                          </Form.Label>
                          <Form.Control
                            type="text"
                            as="textarea"
                            name="expectedResult"
                            placeholder="Expected Result"
                            value={values.expectedResult}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          <ErrorMessage name="expectedResult" className="error text-danger" component="span" />
                        </Form.Group>
                      </Row>
                      <Row className="mt-3">
                        <Col>
                          <Form.Group>
                            <Form.Label notify="true" className="m-0 mb-0">
                              Actual Result<text className="text-danger">*</text>
                            </Form.Label>
                            <Form.Control
                              type="text"
                              as="textarea"
                              name="actualResult"
                              placeholder="Actual Result"
                              value={values.actualResult}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                            <ErrorMessage name="actualResult" className="error text-danger" component="span" />
                          </Form.Group>
                        </Col>
                      </Row>

                      <div className="mt-3 row">
                        <div className="col-md-6 col-lg-6">
                          <Form.Group>
                            <Form.Label notify="true" className="m-0 mb-0">
                              Type of Ticket<text className="text-danger">*</text>
                            </Form.Label>
                            <Select
                              type="select"
                              name="typeOfDefect"
                              placeholder="Type of Defect"
                              value={values.typeOfDefect}
                              onChange={(e) => {
                                setFieldValue("typeOfDefect", e);
                              }}
                              options={[
                                {
                                  value: "Bug",
                                  label: "Bug",
                                },
                                {
                                  value: "Query",
                                  label: "Query",
                                },
                                {
                                  value: "Task",
                                  label: "Task",
                                },
                              ]}
                            />
                            <ErrorMessage name="typeOfDefect" className="error text-danger" component="span" />
                          </Form.Group>
                        </div>
                        <div className="col-md-6 col-lg-6">
                          {" "}
                          <Form.Group>
                            <Form.Label notify={true} className="m-0 mb-0">
                              Priority<text className="text-danger">*</text>
                            </Form.Label>
                            <Select
                              className=""
                              type="select"
                              placeholder="Priority"
                              value={values.priority}
                              name="priority"
                              onChange={(e) => {
                                if (e.value === "Create New Priority") {
                                  setPriorityModal(true);
                                } else {
                                  setFieldValue("priority", e);
                                }
                              }}
                              options={[
                                { value: "Low", label: "Low" },
                                { value: "Medium", label: "Medium" },
                                { value: "High", label: "High" },
                                { value: "Critical", label: "Critical" },

                                {
                                  options: newPriority?.map((list) => ({
                                    value: list?.priority,
                                    label: list?.priority,
                                  })),
                                },
                              ]}
                            />
                          </Form.Group>
                        </div>
                      </div>

                      <div className="mb-3 row">
                        <div className="col-md-6 col-lg-6">
                          <Form.Group>
                            <Form.Label notify={true} className="m-0 mb-0 mt-3">
                              Status<text className="text-danger">*</text>
                            </Form.Label>
                            <Select
                              type="String"
                              placeholder="Status"
                              value={values.status}
                              name="status"
                              onChange={(e) => {
                                if (e.value === "Create New Status") {
                                  setStatusModal(true);
                                } else {
                                  setFieldValue("status", e);
                                }
                              }}
                              options={[
                                { value: "Open", label: "Open" },
                                { value: "Closed", label: "Closed" },
                                { value: "Re-Open", label: "Re-Open" },
                              ]}
                            />
                            <ErrorMessage name="status" className="error text-danger" component="span" />
                          </Form.Group>
                        </div>
                        <Col></Col>
                      </div>
                      <div className="d-flex justify-content-between  mb-2 mt-4">
                        <div>{role === "admin" ? <Button onClick={() => deleteDefect()}>Delete</Button> : ""}</div>
                        <div className="row">
                          <Button
                            className="col-md-4 col-lg-5 mt-2 portal"
                            variant="outline-secondary"
                            onClick={() => navigate("/project/defects/list", {})}
                          >
                            Cancel
                          </Button>
                          <Button className="mx-3 portal space col-md-4 col-lg-5 mt-2" variant="primary" type="submit">
                            Save Changes
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Form>
                );
              }}
            </Formik>
          </Card>
        </div>
      )}
    </>
  );
}
export default Defectportal;
