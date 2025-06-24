import { faInfoCircle, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Select from "react-select";
import { ErrorMessage, Formik } from "formik";
import MaterialTable from "material-table";
import React, { useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row, Card } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { tableIcons } from "../core/tableIcons";
import Services from "../Services";
import "../css/AdminProjects.scss";
import Loader from "../core/Loader";
import { toast } from "react-toastify";
import Api from "../Config/Api";
import "../css/defect-details.scss";
import moment from "moment";

function Lists() {
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [openScreenshot, setOpenScreenshot] = useState(false);
  const [data, setData] = useState();
  const location = useLocation();
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState();
  const [view, setView] = useState(false);
  const defectData = location?.state;
  const [status, setstatus] = useState({ value: "New", label: "New" });
  const [priorityModal, setPriorityModal] = useState(false);
  const [newPriority, setNewPriority] = useState([]);
  const priorityClose = () => setPriorityModal(false);
  const projectId = localStorage.getItem("projectId");
  const [assignView, setAssignView] = useState(false);
  const [assignData, setAssignData] = useState();
  const [users, setUsers] = useState();
  const projId = defectData?.projectId ? defectData?.projectId : defectData?.id;
  const handleClose = () => setShow(false);
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  function handleRemove() {
    setImage(null);
    // reset the file input field
    document.getElementById("myImage").value = "";
  }
  const submitForm = (values) => {
    let description = { description: values?.description };
    const userId = localStorage.getItem("userId");
    const reportedBy = {
      reportedBy: userId,
    };

    Services.createDefectlist(values, defectData, reportedBy, description).then((res) => {
      setIsLoading(true);
      const createDefectId = res?.defectsList?.id;
      if (createDefectId) {
        Services.uploadImage(values, createDefectId).then((res) => {
          getDefectList();
          setImage("");
          handleClose();
          setIsLoading(false);
          toast.success(`${res?.message}`);
        });
      }
    });
  };

  useEffect(() => {
    userList();
  }, [defectData]);

  useEffect(() => {
    getDefectList();
    getPriorities();
  }, [projId]);

  const getDefectList = (values) => {
    // setIsLoading(true);
    const id = defectData?.values?.projectId ? defectData?.values?.projectId : defectData?.id;
    const projectId = localStorage.getItem("projectId");
    Services.getDefectListData(id ? id : projectId)
      .then((res) => {
        const data = res.data;
        // setIsLoading(false);
        setData(data);
      })
      .catch((err) => {
        setIsLoading(false);
      });
  };

  const validation = Yup.object().shape({
    // ticketNo: Yup.string().required("Name is required"),
    typeodefect: Yup.object().required("Type of ticket is required"),
    sum: Yup.string().required("Summary is required"),
    defect: Yup.string().required("Ticket name is required"),
    actualresult: Yup.string().required("Actual result is required"),
    expectedResult: Yup.string().required("Expected result is required"),
    priority: Yup.object().required("Priority is required"),
    description: Yup.string().required("Description is required"),
    myImage: Yup.mixed().required("Attachment file is required"),
  });

  const priorityValidation = Yup.object().shape({
    createNewPriority: Yup.string().required("Priority is required"),
  });
  const imageClose = () => {
    setView(false);
  };

  const Capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const columns = [
    {
      title: "S.No",
      render: (rowData) => `${rowData?.tableData?.id + 1}`,
      width: "5%",
    },
    { title: "Ticket No", field: "ticketNo" },
    { title: "Defect Name", field: "defect" },
    {
      title: "Screenshot",
      field: "screenshot",
      render: (rowData) => (
        <text
          onClick={() => {
            setPreview(rowData);
            setView(!view);
          }}
          className="text-info cursor"
        >
          View Image
        </text>
      ),
    },
    {
      title: "Description",
      field: "summary",
      render: (rowData) => <text className="ellisis">{rowData.summary} </text>,
    },
    {
      title: "Status",
      field: "status",
      render: (rowData) => <text>{rowData?.status?.value ? rowData?.status?.value : rowData?.status}</text>,
    },
    {
      title: "Assigned To",
      render: (rowData) => (
        <text>
          {rowData?.assignee?.firstName} {rowData?.assignee?.lastName}
        </text>
      ),
      hidden: role !== "admin",
    },

    // { title: "Expected Result", field: "expectedResult" },
    // { title: "Actual Result", field: "actualResult" },
  ];

  const selectFile = async (event, { setFieldValue }) => {
    setImage(event);
    const file = event.target.files[0];
    const type = file?.type?.split("/")[0];
    const base64 = await convertBase64(file);
    // setImage(base64);
    // this.setState({ imagePreview: base64, imageType: type });
    setFieldValue("myImage", base64);
  };

  // Convert Image to Base64
  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader?.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const priorities = (values) => {
    const projectId = localStorage.getItem("projectId");
    const userId = localStorage.getItem("userId");
    const date = moment().format("lll");
    Api.post("/priority/", {
      priority: values.createNewPriority,
      projectId: projId ? projId : projectId,
      createdBy: userId,
      createdAt: date,
    }).then((res) => {
      getPriorities();
      setPriorityModal(false);
      toast.success(`New priority ${res?.data?.data?.createModel?.priority} created`);
    });
  };

  const getPriorities = () => {
    const id = defectData?.id;
    const projectId = localStorage.getItem("projectId");
    Api.get(`priority/project/get/${id ? id : projectId}`).then((res) => {
      setNewPriority(res?.data?.data);
    });
  };
  const customer = [
    {
      value: "Defect",
      label: "Defect",
    },
    {
      value: "Query",
      label: "Query",
    },
    {
      value: "Enhancement",
      label: "Enhancement",
    },
  ];
  const adminoption = [
    {
      value: "Defect",
      label: "Defect",
    },
    {
      value: "Query",
      label: "Query",
    },
    {
      value: "Task",
      label: "Task",
    },
    {
      value: "Enhancement",
      label: "Enhancement",
    },
  ];
  const statusoption = [
    { value: "Open", label: "Open" },
    { value: "In Progress", label: "In Progress" },
    { value: "On Review", label: "On Review" },
    { value: "Closed", label: "Closed" },
    { value: "Re-Open", label: "Re-Open" },
    { value: "New", label: "New" },
  ];

  const AssignToFunction = (values) => {
    const defectId = assignData?.id;
    const userId = localStorage.getItem("userId");
    const data = {
      assignedTo: values.assignedTo.value,
      NewStatus: values.status.value,
    };
    Services.updateAssignee(data, defectId, assignData, userId).then((res) => {
      getDefectList();
      handleclose();
      toast.success("Ticket Assigned Success");
    });
  };

  const handleclose = (values) => {
    setAssignView(!assignView);
  };

  const userList = () => {
    Services.AdminDashboardgetList().then((res) => {
      const data = res.data.data;
      setUsers(data);
    });
  };

  const validations = Yup.object().shape({
    assignedTo: Yup.object().required("Assign To is required"),
  });

  const localization = {
    body: {
      emptyDataSourceMessage: "Project Not Yet Assigned !!!",
      filterRow: {
        filterTooltip: "Filter",
      },
      editRow: {
        saveTooltip: "Save",
        cancelTooltip: "Cancel",
        deleteText: "Are you sure you want to delete this row?",
      },
    },
    header: {
      actions: "Actions",
    },
    pagination: {
      labelDisplayedRows: "{from}-{to} of {count}",
      labelRowsPerPage: "Rows per page",
      labelRowsSelect: "rows",
      firstTooltip: "First Page",
      previousTooltip: "Previous Page",
      nextTooltip: "Next Page",
      lastTooltip: "Last Page",
    },
    toolbar: {
      searchTooltip: "Search",
      searchPlaceholder: "Search",
      exportName: "Export as CSV",
      exportTitle: "Export",
      exportAriaLabel: "Export as CSV",
    },
  };

  return (
    <div className="m-5">
      {isLoading ? (
        <Loader />
      ) : data ? (
        <>
          <div className="d-flex justify-content-end mb-3 w-100">
            <Button
              variant="primary"
              onClick={() => {
                setShow(true);
              }}
              className="px-4"
            >
              Create Ticket
            </Button>
            {/* )} */}
          </div>
          <MaterialTable
            title="Tickets"
            icons={tableIcons}
            columns={columns}
            data={data}
            actions={[
              (rowData) => ({
                icon: () => (
                  <Row>
                    <Col
                      onClick={() => {
                        role === "admin"
                          ? navigate(`/defect/detail/${rowData?.id}`, {
                              state: { values: rowData },
                            })
                          : role === "employee"
                          ? navigate(`/details/${rowData?.id}`, {
                              state: { values: rowData },
                            })
                          : navigate(`/defect/details/${rowData?.id}`, {
                              state: { values: rowData },
                            });
                      }}
                    >
                      <FontAwesomeIcon className="nav-font-color" icon={faInfoCircle} title="Info" />
                    </Col>
                  </Row>
                ),
              }),
              (rowData) => ({
                icon: () => (
                  <Row>
                    <Col
                      className="d-flex nav-font-color"
                      onClick={() => {
                        setAssignView(!assignView);
                        setAssignData(rowData);
                      }}
                    >
                      <FontAwesomeIcon
                        className="nav-fonts-color nav-font-color"
                        icon={faPenToSquare}
                        size="1x"
                        title="Assign to"
                      />
                    </Col>
                  </Row>
                ),
                hidden: role !== "admin",
              }),
            ]}
            options={{
              cellStyle: { border: "1px solid #eee" },
              addRowPosition: "first",
              actionsColumnIndex: -1,
              pageSizeOptions: [5, 10, 20, 50],
              pageSize: 5,
              headerStyle: {
                backgroundColor: "#14539A",
                color: "whitesmoke",
                textAlign: "center",
                zIndex: 0,
              },
            }}
          />
          <Modal
            show={show}
            size="lg"
            onHide={handleClose}
            backdrop="static"
            centered
            className="create-user-card edit"
            scrollable={true}
            back
          >
            <Modal.Header closeButton className="bg-light text header-text-color renctangeled-5">
              <Modal.Title className="text-center px-3 pt-2 create-user-text modal-div">
                <h4>Create Ticket</h4>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body className="p-sm-3 p-md-3 p-lg-5">
              <Formik
                initialValues={{
                  // ticketNo: "",
                  sum: "",
                  defect: "",
                  actualresult: "",
                  expectedResult: "",
                  typeodefect: "",
                  myImage: "",
                  priority: "",
                  description: "",
                  status: status,
                }}
                validationSchema={validation}
                onSubmit={(values) => {
                  submitForm(values);
                }}
              >
                {(formik) => {
                  const { values, handleChange, handleSubmit, handleBlur, isValid, setFieldValue } = formik;
                  return (
                    <Form onSubmit={handleSubmit}>
                      {/* <Form.Group>
                    <Form.Label>Ticket No</Form.Label>
                    <Form.Control
                      type="text"
                      name="ticketNo"
                      value={values.ticketNo}
                      placeholder="Ticket created automatically"
                      // onChange={handleChange}
                      // onBlur={handleBlur}
                      id="ticketNo"
                      disabled
                    />
                    <ErrorMessage name="ticketNo" className="error text-danger" component="span" />
                  </Form.Group> */}
                      <Form.Group xs={12} lg={6} className="mt-2 create-user-firstname">
                        <Form.Label className="required">Ticket Name</Form.Label>
                        <Form.Control
                          type="text"
                          value={values.defect}
                          name="defect"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          id="defect"
                        />
                        <ErrorMessage name="defect" className="error text-danger" component="span" />
                      </Form.Group>
                      <Row>
                        <Col xs={12} lg={6}>
                          <Form.Group className="mt-2 create-user-firstname">
                            <Form.Label className="required">Type of Ticket</Form.Label>
                            <Select
                              type="select"
                              name="typeodefect"
                              // onBlur={handleBlur}
                              value={values.typeodefect}
                              onChange={(e) => {
                                setFieldValue("typeodefect", e);
                              }}
                              options={role === "admin" ? adminoption : customer}
                            />

                            <ErrorMessage name="typeodefect" className="error text-danger" component="span" />
                          </Form.Group>
                        </Col>
                        <Col xs={12} lg={6}>
                          <Form.Group className="mt-2 create-user-firstname">
                            <Form.Label className="required">Ticket Priority</Form.Label>
                            <Select
                              fluid
                              selection
                              type="select"
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
                                {
                                  value: "Create New Priority",
                                  label: (
                                    <p
                                      style={{
                                        fontWeight: "bold",
                                        marginBottom: 0,
                                      }}
                                    >
                                      Create New Priority
                                    </p>
                                  ),
                                },
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
                            <ErrorMessage name="priority" className="error text-danger" component="span" />
                          </Form.Group>
                        </Col>
                      </Row>
                      <Form.Group xs={12} lg={6} className="mt-2 create-user-firstname">
                        <Form.Label className="required">Summary</Form.Label>
                        <Form.Control
                          name="sum"
                          value={values.sum}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          id="sum"
                          rows={3}
                        />
                        <ErrorMessage name="sum" className="error text-danger" component="span" />
                      </Form.Group>
                      <Form.Group xs={12} lg={6} className="mt-2 create-user-firstname">
                        <Form.Label className="required">Description</Form.Label>
                        <Form.Control
                          as="textarea"
                          name="description"
                          value={values.description}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          id="description"
                          rows={2}
                        />
                        <ErrorMessage name="description" className="error text-danger" component="span" />
                      </Form.Group>
                      <Form.Group xs={12} lg={6} className="mt-2 create-user-firstname">
                        <Form.Label className="required">Expected Result</Form.Label>
                        <Form.Control
                          as="textarea"
                          type="text"
                          name="expectedResult"
                          value={values.expectedResult}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          id="expectedResult"
                        />
                        <ErrorMessage name="expectedResult" className="error text-danger" component="span" />
                      </Form.Group>
                      <Form.Group xs={12} lg={6} className="mt-2 create-user-firstname">
                        <Form.Label className="required">Actual Result</Form.Label>
                        <Form.Control
                          as="textarea"
                          type="text"
                          name="actualresult"
                          value={values.actualresult}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          id="actualresult"
                        />
                        <ErrorMessage name="actualresult" className="error text-danger" component="span" />
                      </Form.Group>
                      <Row>
                        <Col xs={12} lg={6}>
                          <Form.Group className="mt-2 create-user-firstname">
                            <Form.Label className="required">Status</Form.Label>
                            <Select
                              type="select"
                              name="status"
                              onBlur={handleBlur}
                              isDisabled
                              value={values.status}
                              onChange={(e) => {
                                setFieldValue("status", e);
                                setstatus(e);
                              }}
                              options={[
                                {
                                  value: "New",
                                  label: "New",
                                },
                              ]}
                            />
                          </Form.Group>
                        </Col>
                        <Col xs={12} lg={6}>
                          <Form.Group className="mt-2 create-user-firstname">
                            <Form.Label className="required">Attachment</Form.Label>
                            <Form.Control
                              type="file"
                              name="myImage"
                              id="myImage"
                              accept="image/*"
                              onChange={(e) => {
                                // setFieldValue("image", e);
                                // handleChange(e);
                                selectFile(e, { setFieldValue });
                              }}
                            />
                            <ErrorMessage name="myImage" className="text-danger" component="span" />
                          </Form.Group>
                        </Col>
                      </Row>
                      {image && (
                        <>
                          <img
                            alt="not fount"
                            className="defect-image w-100 mt-2"
                            src={URL.createObjectURL(image?.target?.files[0])}
                            width={"60%"}
                            height={400}
                          />
                          <br />

                          <Button
                            className="mt-3"
                            onClick={() => {
                              handleRemove();
                              setFieldValue("myImage", "");
                            }}
                          >
                            Remove
                          </Button>
                        </>
                      )}
                      <br />
                      <div className="mt-4 mb-2 d-flex justify-content-end">
                        <Button variant="outline-secondary" onClick={handleClose} className="me-2 px-4" type="reset">
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
          <Modal show={openScreenshot} backdrop="static">
            <Modal.Header className="header-text-color">Add Screenshot</Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group className="mt-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control />
                </Form.Group>
                <Form.Group className="mt-3">
                  <Form.Label>Screenshot</Form.Label>
                  <Form.Control type="file" />
                </Form.Group>
                <div className="mt-2 d-flex justify-content-end">
                  <Button
                    variant="outline-secondary"
                    className="mx-3"
                    onClick={() => {
                      setOpenScreenshot(false);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button variant="primary">Save</Button>
                </div>
              </Form>
            </Modal.Body>
          </Modal>
          <Modal
            show={view}
            centered
            // className="p-4"
            fullscreen={true}
            onHide={imageClose}
            scrollable={true}
            backdrop="static"
          >
            <Modal.Header className="header-text-color" closeButton>
              <h4>
                Ticket No :<text className="ticketTitle ms-3">{preview?.ticketNo}</text>{" "}
              </h4>
            </Modal.Header>
            <Modal.Body className="p-5">
              <div className="w-100 d-flex justify-content-center">
                {preview?.errorFile ? (
                  <img src={preview?.errorFile} className="img-fluid" />
                ) : (
                  <h4 className="text-center mt-3">No Image to show</h4>
                )}
              </div>
              <br />
              <div className="w-100 d-flex justify-content-end">
                <Button className="px-4 mt-3 " onClick={() => imageClose()}>
                  Close
                </Button>
              </div>
            </Modal.Body>
          </Modal>
          <Modal className="bg-light text header-text-color renctangeled-5" show={openScreenshot} backdrop="static">
            <Modal.Header className="header-text-color">Add Screenshot</Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group xs={12} lg={6} className="mt-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control />
                </Form.Group>
                <Form.Group xs={12} lg={6} className="mt-3">
                  <Form.Label>Screenshot</Form.Label>
                  <Form.Control type="file" />
                </Form.Group>
                <div className="mt-2 d-flex justify-content-end">
                  <Button
                    onClick={() => {
                      imageClose();
                    }}
                    className="px-4"
                  >
                    close
                  </Button>
                </div>
              </Form>
            </Modal.Body>
          </Modal>
          {/* <Modal show={view} centered className="p-4" onHide={imageClose}>
            <Modal.Header closeButton>
              <h4>{preview?.ticketNo}</h4>
            </Modal.Header>
            <Modal.Body className="p-5">
              <img src={preview?.errorFile} className="w-100" />

              <div className="w-100 d-flex justify-content-end pb-4 pt-3 ">
                <Button
                  onClick={() => {
                    imageClose();
                  }}
                  className="px-4"
                >
                  close
                </Button>
              </div>
            </Modal.Body>
          </Modal> */}
          {/* created a model for adding a New priority option in dropdown */}
          {/* <Modal
            className="create-priority-modal modal-background"
            show={priorityModal}
            onHide={priorityClose}
            backdrop="static"
            centered
          >
            <Modal.Header closeButton className="bg-light text header-text-color renctangeled-5">
              <Modal.Title className="modal-div">Create New Priority</Modal.Title> */}
          <Modal
            className="create-priority-modal modal-background"
            show={priorityModal}
            onHide={priorityClose}
            backdrop="static"
            centered
          >
            <Modal.Header closeButton className="bg-light text header-text-color renctangeled-5">
              <Modal.Title className="modal-div">Create New Priority</Modal.Title>
            </Modal.Header>
            <Modal.Body className="p-sm-3 p-md-4">
              <Formik
                initialValues={{ createNewPriority: "" }}
                validationSchema={priorityValidation}
                onSubmit={(values) => {
                  priorities(values);
                }}
              >
                {(formik) => {
                  const { values, handleChange, handleSubmit, handleBlur, isValid } = formik;
                  return (
                    <Form onSubmit={handleSubmit}>
                      <Form.Group xs={12} lg={6} className="mt-2 create-user-firstname">
                        <Form.Label className="required mb-2">Priority</Form.Label>
                        <Form.Control
                          placeholder="Enter Priority Name"
                          name="createNewPriority"
                          type="text"
                          autoFocus="autofocus"
                          autoComplete="nope"
                          value={Capitalize(values.createNewPriority)}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        <ErrorMessage name="createNewPriority" component="span" className="text-danger" />
                      </Form.Group>
                      <div className="d-flex justify-content-end mt-3 mb-2">
                        <Button className="mx-2" variant="outline-secondary" onClick={priorityClose}>
                          Cancel
                        </Button>
                        <Button variant="primary" type="submit" disabled={!isValid}>
                          Create Priority
                        </Button>
                      </div>
                    </Form>
                  );
                }}
              </Formik>
            </Modal.Body>
          </Modal>
          <Modal show={assignView} onHide={handleclose} centered backdrop="static">
            <Card>
              <Modal.Header
                style={{ borderBottom: 0 }}
                closeButton
                className="bg-light text header-text-color renctangeled-5"
              >
                <h3>Ticket Assign </h3>
              </Modal.Header>
              <Modal.Body style={{ borderBottom: 0 }} className="p-sm-3 p-md-4">
                <Formik
                  initialValues={{
                    assignedTo: assignData?.assignee
                      ? {
                          label: `${assignData?.assignee?.firstName} ${assignData?.assignee?.lastName}`,
                          value: assignData?.assignee?._id,
                        }
                      : "",
                    status: {
                      label: assignData?.status,
                      value: assignData?.status,
                    },
                  }}
                  onSubmit={(values) => AssignToFunction(values)}
                  validationSchema={validations}
                >
                  {(formik) => {
                    const { values, handleSubmit, handleBlur, setFieldValue } = formik;
                    return (
                      <Form onSubmit={handleSubmit}>
                        <Form.Group>
                          <Form.Label className="required">Developers</Form.Label>
                          <Select
                            name="assignedTo"
                            value={values.assignedTo}
                            placeholder="Assign To"
                            onChange={(e) => {
                              setFieldValue("assignedTo", e);
                            }}
                            onBlur={handleBlur}
                            options={[
                              {
                                options: users
                                  ?.filter((x) => x.role === "employee")
                                  ?.map((list) =>
                                    list?.role === "employee"
                                      ? {
                                          label: `${list?.firstName}`,
                                          value: list?.id,
                                        }
                                      : ""
                                  ),
                              },
                            ]}
                          />
                          <ErrorMessage name="assignedTo" className="text-danger" component="span" />
                        </Form.Group>
                        <Form.Group className="mt-3">
                          <Form.Label>Ticket Status</Form.Label>
                          <Select
                            options={statusoption}
                            value={values.status}
                            placeholder="Status"
                            name="status"
                            onChange={(e) => {
                              setFieldValue("status", e);
                            }}
                            onBlur={handleBlur}
                          />
                        </Form.Group>
                        <div className="d-flex justify-content-end mt-4">
                          <Button variant="outline-secondary" className="mx-2" onClick={handleclose}>
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
            </Card>
          </Modal>
        </>
      ) : (
        <div>
          <div className="d-flex justify-content-end">
            <Button disabled>Create Ticket</Button>
          </div>
          <div className="mt-2">
            <MaterialTable
              title="Tickets"
              icons={tableIcons}
              columns={columns}
              localization={localization}
              options={{
                cellStyle: { border: "1px solid #eee" },
                addRowPosition: "first",
                actionsColumnIndex: -1,
                headerStyle: {
                  backgroundColor: "#14539A",
                  color: "whitesmoke",
                  zIndex: 0,
                },
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Lists;
