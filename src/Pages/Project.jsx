import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import { tableIcons } from "../core/tableIcons";
import {
  Button,
  Col,
  Dropdown,
  Form,
  Modal,
  Row,
  DropdownButton,
  Container,
  Card,
} from "react-bootstrap";
import * as Yup from "yup";
import { ErrorMessage, Formik, Field } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisV,
  faEllipsisVertical,
  faPen,
} from "@fortawesome/free-solid-svg-icons";
import Services from "../Services";
import Select from "react-select";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../core/Loader";
import moment from "moment";
import "../css/AdminProjects.scss";

import { Ellipsis } from "react-bootstrap/esm/PageItem";

// import { isDisabled } from "@testing-library/user-event/dist/utils";

function Project() {
  // project-Status
  const day = new Date();
  const date = moment(day).format("DD-MM-YYYY");
  const time = moment(day).format("h:mma");
  const currentDate = date + "  " + time;
  const location = useLocation();
  const projectData = location.state;
  const user = localStorage.getItem("userId");

  const [show, setShow] = useState(false);
  const [statusShow, SetStatusShow] = useState(false);
  const [data, setData] = useState();
  const [edittValues, setEditValues] = useState();
  const handleClose = () => setShow(false);
  const handleStatusClose = () => SetStatusShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate();
  const [selectedRow, setSelectedRow] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [projectUsers, setProjectUsers] = useState([]);
  const [statusData, setStatusData] = useState("");
  const role = localStorage.getItem("role");
  const [tableRole, setTableRole] = useState();
  const [assignTo, setAssignTo] = useState();
  const [users, setUsers] = useState([]);
  const [statuses, setStatuses] = useState();
  const [hover, setHover] = useState(null);
  const [viewChange, setViewChange] = useState('Grid')


  const Capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  const createProjectStatus = (values) => {
    Services.createProjectStatus(values, projectData).then((res) => {
      const statusData = res?.createStatus;
      toast.success("Project Status Updated Sucessfully !");
      handleStatusClose();
    });
  };
  const handleRowClick = (event, rowData) => {
    setSelectedRow(rowData);
  };

  const validation = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    code: Yup.string().required("Code is required"),
    defaultAssignee: edittValues
      ? Yup.object().required("Default assignee is required")
      : Yup.object().nullable(),
    // lastIncremented: Yup.string().required("Last Incremented Count is required"),
  });

  <div>
    <Container fluid style={{ padding: 0 }}>
      <Row>
        {/* <Col style={{padding:5}}>
<Select placeholder="Projects"/>
  </Col> */}

        <Col style={{ padding: 5 }}>
          <Select
            placeholder="Users"
            options={[
              { value: "users", label: "Users" },
              { value: "employe", label: "Employee" },
              { value: "customer", label: "Customer" },
            ]}
            className="mx-2"
            onChange={""}
          />
        </Col>
      </Row>
    </Container>
  </div>;

  const columns = [
    {
      title: "S.No",
      field: "sNo",
      render: (rowData) => `${rowData?.tableData?.id + 1}`,
    },
    { title: "Project Name", field: "name" },
    { title: "Project Code", field: "code" },
    { title: "Default Assignee", field: "defaultAssignee" },
    { title: "Last Incremented Count", field: "lastIncremented" },
  ];

  const projectsData = [
    {
      title: "S.NO",
      field: "sno",
      //render: (rowData) => `${rowData?.tableData?.id + 1}`,
    },
    {
      title: "Project Name",
      field: "Project Name",
    },
    { title: "project code", field: "Project Code" },
    { title: "Default Assignee", field: "Default Assignee" },
    { title: "Last Increment count", field: "Last Increment count" },
    { title: "Action", field: "Actions" },
  ];

  const status = [
    { value: "Open", label: "Open" },
    { value: "In Progress", label: "In Progress" },
    { value: "On Review", label: "On Review" },
    { value: "Closed", label: "Closed" },
    { value: "Re-Open", label: "Re-Open" },
    { value: "New", label: "New" },
  ];

  const demoSubmit = (values, { resetForm }) => {
    setIsLoading(true);
    Services.createProject(values)
      .then((res) => {
        resetForm({ values: "" });
        setData([...data, res?.createData]);
        handleClose();
        setIsLoading(false);
        toast.success(`${res?.message}`);
      })
      .catch((err) => {
        if (err.status === 400) {
          handleClose();
          setIsLoading(false);
          toast.error(`"Failed to create project."`);
        }
      });
  };

  const getprojectusersList = (id) => {
    Services.getProjectUsers(id).then((res) => {
      const data = res?.data;
      setProjectUsers(data);
    });
  };

  console.log(projectUsers)

  const getAllData = () => {
    setIsLoading(true);
    Services.getProjectAlldata().then((res) => {
      setData(res?.data);
      setIsLoading(false);
    });
  };

  const EditForm = (values) => {
    setIsLoading(true);
    Services.updateProject(values, edittValues?.id)
      .then((res) => {
        getAllData();
        handleClose();
        setIsLoading(false);
        toast.success(` ${res?.editedData?.name} ${res?.message}`);
      })
      .catch((err) => {
        if (err.status === 400) {
          handleClose();
          setIsLoading(false);
          toast.error("Failed to Update project.");
        }
      });
  };

  useEffect(() => {
    getAllData();
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (

        <div className="d-flex justify-content-between align-items-center border"style={{ width: '100%',marginTop: '10px', padding: '20px 0', position: 'relative', }}>
          <div className="" style={{ width: '95%' }}>
            <div className=" px-5 mt-3 d-flex justify-content-between align-items-center">
              <h3>Projects</h3>
              <select
                className="dropDownStyle"
                value={viewChange}
                onChange={(e) => setViewChange(e.target.value)}>
                <option value="Grid">Grid View</option>
                <option value="List">List View</option>
              </select>
            </div>
            {viewChange === "Grid" ?
              <Container className="mt-5 mb-4" fluid>
                <Row className="g-3 m-3">
                  {data?.map((val, index) => (
                    <Col
                      lg={3}
                      md={6}
                      sm={12}
                      key={index}
                      onMouseEnter={() => setHover(index)}
                      onMouseLeave={() => setHover(null)}
                    >
                      <Card className="shadow-sm rounded boxhover cardContainer">
                        <div className="p-3">
                          <div className="d-flex justify-content-between align-items-center mb-3">
                            <div
                              className="d-flex justify-content-center align-items-center"
                              style={{
                                background: 'gray',
                                width: 43,
                                height: 43,
                                borderRadius: '50%',
                              }}
                            >
                              <div
                                style={{
                                  background: 'white',
                                  width: 40,
                                  height: 40,
                                  borderRadius: '50%',
                                  display: 'flex',
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                  fontSize: 12,
                                }}
                              >
                                0%
                              </div>
                            </div>
                            {/* <div className="me-2" onClick={() => {
                          setEllipse(true)
                        }}>
                          <FontAwesomeIcon icon={faEllipsisVertical} />
                        </div> */}
                            <Dropdown align="end">
                              <Dropdown.Toggle variant="light" size="sm" className="border-0 p-0">
                                <FontAwesomeIcon style={hover === index ? { color: "rgb(0, 105, 210)" } : { color: "black" }} icon={faEllipsisVertical} />
                              </Dropdown.Toggle>

                              <Dropdown.Menu>
                                <Dropdown.Item onClick={() => {
                                  setEditValues(val);
                                  getprojectusersList(val.id);
                                  handleShow();
                                }}>Edit</Dropdown.Item>
                                <Dropdown.Item onClick={() => {
                                  setStatusData(val);
                                  SetStatusShow(true);
                                }}>Status</Dropdown.Item>
                                <Dropdown.Item onClick={() =>
                                  navigate(
                                    `/project/users/${val?.name}/${val?.id}`
                                  )}>Project Users</Dropdown.Item>
                                <Dropdown.Item
                                  onClick={() => {
                                    role === "employee"
                                      ? navigate("/defect", { state: val })
                                      : navigate("/project/defect", { state: val });
                                  }}
                                >Defect List</Dropdown.Item>
                              </Dropdown.Menu>
                            </Dropdown>
                          </div>

                          <h5 className="fw-semibold" style={hover === index ? { color: "rgb(0, 105, 210)" } : { color: "black" }}>{val?.name}</h5>
                          <p className="text-muted">Aviar</p>
                          <div
                            className="mt-3"
                            style={{
                              fontSize: 10,
                              border: '1px solid green',
                              borderRadius: 4,
                              padding: '2px 6px',
                              color: 'green',
                              width: 'fit-content',
                            }}
                          >
                            Open
                          </div>
                          <div className="d-flex mt-4 ms-2">
                            {[1, 2].map((_, i) => (
                              <div
                                key={i}
                                style={{
                                  border: '1px solid rgb(139, 139, 139)',
                                  borderRadius: '50%',
                                  background: 'rgb(231, 231, 231)',
                                  height: 35,
                                  width: 35,
                                  display: 'flex',
                                  marginLeft: -10,
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                  fontSize: 15,
                                }}
                              >
                                AA
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Slide-up content on hover */}
                        <div className={`bottomSlide ${hover === index ? 'show' : ''}`}>
                          <p className="mb-1">Created by: {val?.createdBy?.firstName}</p>
                          <p className="mb-0">Created at: {val?.createdAt}</p>
                        </div>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </Container>
              :
              <div className="m-5">
                <MaterialTable
                  title="Projects"
                  icons={tableIcons}
                  columns={columns} //original
                  data={data}

                  // columns={tableRole==="projects"?projectData:projectData}
                  // data={tableRole==="projects"?projectData.filter((x)=>x.role=="projectuser"):projectData}

                  actions={[
                    (rowData) => ({
                      icon: () =>
                        role === "admin" ? (
                          <Row>
                            <Col
                              onClick={() => {
                                setEditValues(rowData);
                                getprojectusersList(rowData.id);
                                handleShow();
                              }}
                            >
                              <FontAwesomeIcon
                                className="nav-fonts-color nav-font-color"
                                icon={faPen}
                                title="Edit Project"
                              />
                            </Col>
                          </Row>
                        ) : (
                          ""
                        ),
                    }),
                    (rowData) => ({
                      icon: () => (
                        <Row>
                          <Dropdown>
                            <Dropdown.Toggle className=" icon-size ">
                              <FontAwesomeIcon icon={faEllipsisVertical} />
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              {role === "employee" ? (
                                ""
                              ) : (
                                <>
                                  <Dropdown.Item
                                    className="navbar-dropdown  nav-font-color menu-text"
                                    onClick={() =>
                                      navigate(
                                        `/project/users/${rowData?.name}/${rowData?.id}`
                                      )
                                    }
                                  >
                                    Project Users
                                  </Dropdown.Item>
                                  <hr />
                                </>
                              )}
                              <Dropdown.Item
                                className="navbar-dropdown text-primary nav-font-color menu-text"
                                onClick={() => {
                                  role === "employee"
                                    ? navigate("/defect", { state: rowData })
                                    : navigate("/project/defect", { state: rowData });
                                }}
                              >
                                {/*
<Dropdown.Item onClick={() => {
                            this.setState({id: 1});
                        }}>1Defects list</Dropdown.Item> */}
                                Defects list
                              </Dropdown.Item>
                              <hr />
                              <Dropdown.Item
                                className="navbar-dropdown text-primary nav-font-color menu-text"
                                onClick={() => {
                                  setStatusData(rowData);
                                  SetStatusShow(true);
                                  //  navigate("/project/status",{state:rowData});
                                }}
                              >
                                Project Status
                              </Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </Row>
                      ),
                    }),
                  ]}
                  options={{
                    cellStyle: { border: "1px solid #eee", textAlign: "center" },
                    addRowPosition: "first",
                    pageSizeOptions: [5, 10, 20, 50],
                    pageSize: 5,
                    actionsColumnIndex: -1,
                    headerStyle: {
                      backgroundColor: "#14539A",
                      color: "whitesmoke",
                      textAlign: "center",
                      zIndex: 0,
                    },
                    actionsCellStyle: {
                      display: "flex",
                      justifyContent: "center",
                      width: "unset",
                    },
                  }}
                />

              </div>
            }
            <Modal
              size="lg"
              show={show}
              onHide={handleClose}
              centered
              backdrop="static"
              className="edit"
            >
              <Modal.Header
                closeButton
                className="p-4 bg-light text header-text-color renctangeled-5"
              >
                <div className="modal-div nav-font-color">
                  {edittValues ? <h4>Edit Project</h4> : <h4>Create Project</h4>}
                </div>
              </Modal.Header>

              <Modal.Body className="p-5">
                <Formik
                  initialValues={{
                    name: edittValues?.name,
                    code: edittValues?.code,
                    defaultAssignee: edittValues?.defaultAssignee
                      ? {
                        label: edittValues?.defaultAssignee,
                        value: edittValues?.defaultAssignee,
                      }
                      : "",
                    lastIncremented: edittValues?.lastIncremented,
                  }}
                  validationSchema={validation}
                  onSubmit={async (values, { resetForm }) => {
                    edittValues?.id
                      ? await EditForm(values)
                      : await demoSubmit(values, { resetForm });
                  }}
                >
                  {(formik) => {
                    const {
                      values,
                      handleChange,
                      handleSubmit,
                      handleBlur,
                      isValid,
                      setFieldValue,
                    } = formik;
                    return (
                      <Form onSubmit={handleSubmit}>
                        <Form.Group className="mt-0">
                          <Form.Label className="required mb-0">
                            Project Name
                          </Form.Label>
                          <Form.Control
                            type="text"
                            name="name"
                            id="name"
                            value={values.name ? Capitalize(values.name) : null}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="Enter Project Name"
                          />
                          <ErrorMessage
                            name="name"
                            className="error text-danger"
                            component="span"
                          />
                        </Form.Group>
                        <Form.Group className="mt-3">
                          <Form.Label className="required mt-1 mb-0">
                            Project Code
                          </Form.Label>
                          <Form.Control
                            type="text"
                            name="code"
                            id="code"
                            value={values.code}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="Enter Project Code"
                          />
                          <ErrorMessage
                            name="code"
                            className="error text-danger"
                            component="span"
                          />
                        </Form.Group>
                        {edittValues?.id ? (
                          <Form.Group className="mt-3">
                            <Form.Label className="required mt-1 mb-0">
                              Project Assignee
                            </Form.Label>
                            <Select
                              // options={[
                              //   {
                              //     options: projectUsers.map((list) => list?.role === "Lead" ? ({
                              //       label: `${list?.role === "Lead" ? list?.name : isDisabled} (${list?.role === "Lead" ? list?.role : isDisabled})`,
                              //       value: list?.id,
                              //     }) : isDisabled),
                              //   },
                              // ]}

                              options={[
                                {
                                  options: projectUsers
                                    ?.filter((x) => x.role === "Lead")
                                    ?.map((list) =>
                                      list?.role === "Lead"
                                        ? {
                                          label: `${list?.name} (${list?.role})`,
                                          value: list?.id,
                                        }
                                        : ""
                                    ),
                                },
                              ]}
                              name="defaultAssignee"
                              onChange={(e) =>
                                setFieldValue("defaultAssignee", e)
                              }
                              onBlur={handleBlur}
                              value={values.defaultAssignee}
                            />
                            <ErrorMessage
                              name="defaultAssignee"
                              className="error text-danger"
                              component="span"
                            />
                          </Form.Group>
                        ) : (
                          ""
                        )}
                        <div className="mt-3 d-flex justify-content-end">
                          <Button
                            variant="outline-secondary"
                            onClick={handleClose}
                            className="me-3 px-4 mt-1"
                          >
                            Cancel
                          </Button>
                          <Button
                            variant="primary"
                            type="submit"
                            className="px-4 mt-1"
                          >
                            {edittValues?.id ? "Save Changes" : " Create Project"}
                          </Button>
                        </div>
                      </Form>
                    );
                  }}
                </Formik>
              </Modal.Body>
              {/* project status Modal */}
            </Modal>
            <Modal
              show={statusShow}
              onHide={handleStatusClose}
              centered
              backdrop="static"
              className="edit"
            >
              <Modal.Header
                closeButton
                className="p-4 bg-light text header-text-color renctangeled-5"
              >
                <Modal.Title className="card-title">Project Status</Modal.Title>
              </Modal.Header>
              <Modal.Body className="card-title">
                <Formik
                  initialValues={{
                    projectStatus: "",
                    createdBy: user,
                    createdAt: currentDate,
                    projectId: statusData.id ? statusData.id : "",
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
                        title="Project-Status"
                        onSelect={(eventKey) => {
                          values.projectStatus = eventKey;
                          handleSubmit();
                        }}
                      >
                        <Dropdown.Item eventKey="New">New</Dropdown.Item>
                        <Dropdown.Item eventKey="Open">Open</Dropdown.Item>
                        <Dropdown.Item eventKey="In Progress">
                          In Progress
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="On Review">
                          On Review
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Closed">Closed</Dropdown.Item>
                        <Dropdown.Item eventKey="Re-Open">Re-Open</Dropdown.Item>
                      </DropdownButton>
                      <Field type="hidden" name="projectStatus" />
                    </Form>
                  )}
                </Formik>
              </Modal.Body>
            </Modal>
          </div>
          <div className=" rightBar">
            {role === "admin" ? (
              <button
                onClick={() => {
                  setShow(true);
                  setEditValues("");
                }}
                className="roundButton1"
                title="Create Project"
            
              >
                +
              </button>
            ) : (
              ""
            )}
          </div>
        </div>
      )
      }
    </>
  );
}

export default Project;








