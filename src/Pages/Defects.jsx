import {
  faArrowUpRightFromSquare,
  faInfoCircle,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ErrorMessage, Formik } from "formik";
import MaterialTable from "material-table";
import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Modal,
  Row,
} from "react-bootstrap";
import Select from "react-select";
import { tableIcons } from "../core/tableIcons";
import Services from "../Services";
import * as Yup from "yup";
import Loader from "../core/Loader";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import DefectServices from "../Services/deefectList";
import "../css/AdminProjects.scss";
import { PoolTwoTone } from "@material-ui/icons";

function Defects() {
  const [data, setData] = useState();
  const [show, setShow] = useState(false);
  const [users, setUsers] = useState([]);
  const [projectDetails,setProjectDetails] = useState([]);
  const [defectData, setDefectData] = useState();
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const [defectId, setDefectId] = useState();
  const [assignTo, setAssignTo] = useState();
  const [statuses, setStatuses] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [filteredStatus, setFilteredStatus] = useState(data);
  const role = localStorage.getItem("role");
  const [projectData, setSelectedProjectData] = useState(data);
  const [selectedProject, setSelectedProject] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const validation = Yup.object().shape({
    assignedTo: Yup.object().required("Assign To is required"),
  });

  const userList = () => {
    Services.AdminDashboardgetList().then((res) => {
      const data = res.data.data;
      setUsers(data);
    });
  };

  const status = [
    { value: "Open", label: "Open" },
    { value: "In Progress", label: "In Progress" },
    { value: "On Review", label: "On Review" },
    { value: "Closed", label: "Closed" },
    { value: "Re-Open", label: "Re-Open" },
    { value: "New", label: "New" },
  ];

  const updateAssignedToStatus = (values) => {
    const userId = localStorage.getItem("userId");
    const data = {
      assignedTo: values.assignedTo.value,
      NewStatus: values.status.value,
    };
    Services.updateAssignee(data, defectId, defectData, userId).then((res) => {
      DefectList();
      handleClose();
      toast.success("Ticket Assigned Success");
    });
  };

  // const handleSelectProject = (selectedOption) => {
  //   setSelectedProject(selectedOption);
  //   const projectData = data.filter(
  //     (item) => item.projects === selectedOption.value
  //   );
  //   console.log("projectData", projectData);
  //   setSelectedProjectData(projectData);
  // };

  const handleSelectProject = (selectedOption, type) => {
    console.log("select options......",selectedOption)
    handleFilters(selectedOption, type);
    setSelectedProject(true);
  };
  
  const handleSelectEmployee = (selectedOption, type) => {
    setSelectedPerson(selectedOption);
    handleFilters(selectedOption, type);
  };
  
  const handleSelectStatus = (selectedOption, type) => {
    setSelectedStatus(selectedOption);
    handleFilters(selectedOption, type);
  };

  const handleFilters = (selectValues, type) => {
    let filteredData = data;
    // Filter based on the selected project
    if (selectValues && type == 0) {
      filteredData = filteredData.filter(
        (item) => item.projectId._id === selectValues.value
      );
    }
  
    // Filter based on the selected employee
    if (selectValues && type == 1) {
      filteredData = filteredData.filter(
        (item) => item.assignee && item.assignee._id === selectValues.value
      );
    }
  
    // Filter based on the selected status
    if (selectValues && type == 2) {
      filteredData = filteredData.filter(
        (item) => item.status === selectValues.value
      );
    }
  
    setFilteredData(filteredData);
  };
  

  // const handleSelectStatus = (selectedOption) => {
  //   setSelectedStatus(selectedOption);
  //   // const filteredData = data.filter(
  //   //   (item) => item.assignee?._id === selectedOption.value
  //   // );

  //   const filteredStatus = data.filter(
  //     (item) => item.status === selectedOption.value
  //   );
  //   setFilteredData(filteredStatus);

  //   setFilteredStatus(filteredStatus);
  // };

  const userData = [
    {
      title: "S.No",
      render: (rowData) => `${rowData?.tableData?.id + 1}`,
    },

    { title: "Ticket Number", field: "ticketNo" },
    {
      title: "Project Title",
      render: (rowData) => <text className="">{rowData.summary} </text>,
    },
    {
      title: "Status",
      field: "status",
      render: (rowData) => (
        <text>
          {rowData?.status?.value ? rowData?.status?.value : rowData?.status}
        </text>
      ),
      // render: (rowData) => <text>{rowData?.status?.value}</text>,
    },
    { title: "Priority", field: "priority.value" },
    {
      title: "Reported By",
      render: (rowData) => (
        <text>
          {rowData?.reportedBy?.firstName + " " + rowData?.reportedBy?.lastName}{" "}
        </text>
      ),
    },
  ];

  const columns = [
    {
      title: "S.No",
      render: (rowData) => `${rowData?.tableData?.id + 1}`,
    },

    { title: "Ticket Number", field: "ticketNo" },
    {
      title: "Project Title",
      render: (rowData) => <text className="">{rowData.summary} </text>,
    },
    {
      title: "Status",
      field: "status",
      render: (rowData) => (
        <text>
          {rowData?.status?.value ? rowData?.status?.value : rowData?.status}
        </text>
      ),
      // render: (rowData) => <text>{rowData?.status?.value}</text>,
    },
    { title: "Priority", field: "priority.value" },
    {
      title: "Reported By",
      render: (rowData) => (
        <text>
          {rowData?.reportedBy?.firstName + " " + rowData?.reportedBy?.lastName}{" "}
        </text>
      ),
    },
    {
      title: "Assigned To",
      render: (rowData) => (
        <text>
          {rowData?.assignee?.firstName} {rowData?.assignee?.lastName}
        </text>
      ),
    },
  ];

  const DefectList = () => {
    // setIsLoading(true);
    Services.DefectListGet().then((res) => {
      setData(res?.defectLists);
      setFilteredData(res?.defectLists);
      // setIsLoading(false);
    });
  };

  const projectList = () =>{
    Services.getProjectAlldata().then((res) =>{
      setProjectDetails(res.data)
    })
  }

  useEffect(() => {
    DefectList();
    userList();
    projectList();
  }, []);
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <Container className="mt-5 mt-width mb-2" fluid>
          <Row>
            <Col style={{ padding: 15 }}>
              <Select
                placeholder="Projects"
                onChange={(selectedOption) => handleSelectProject(selectedOption, 0)}
                //value={values.name ? Capitalize(values.name) : null}

                // options={[{ value: "users", label: "Users" }]}
                className="mx-2"
                options={[
                  {
                    options: projectDetails?.map((list) => ({
                      label: `${list?.code}`,
                      value: list?.id,
                    })),
                  },
                ]}
                
              />
            </Col>
            <Col style={{ padding: 15 }}>
              <Select
                name="assignedTo"
                type="string"
                value={selectedPerson}
                placeholder="Assign To"
                onChange={(selectedOption) => handleSelectEmployee(selectedOption, 1)}
                //onBlur={handleBlur}
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
            </Col>

            <Col style={{ padding: 15 }}>
              <Select
                name="Status Select"
                type="string"
                value={selectedStatus}
                placeholder="Status"
                onChange={(selectedOption) => handleSelectStatus(selectedOption, 2)}
                options={status}
              />
            </Col>
          </Row>
          <MaterialTable
            title="Tickets"
            icons={tableIcons}
            columns={columns}
            data={filteredData}
            //data={projectData}
            //data={filteredData}
            //data={filteredStatus}
            actions={[
              (rowData) => ({
                icon: () => (
                  <Row>
                    <Col
                      className="d-flex nav-font-color"
                      onClick={() => {
                        setDefectId(rowData.id);
                        setDefectData(rowData);
                        setStatuses(rowData?.status?.value);
                        setAssignTo(
                          rowData?.assignee?.firstName
                            ? {
                                label: rowData?.assignee?.firstName,
                                value: rowData?.assignee?._id,
                              }
                            : ""
                        );
                        handleShow();
                      }}
                    >
                      <FontAwesomeIcon
                        className="nav-fonts-color nav-font-color"
                        icon={faArrowUpRightFromSquare}
                        title="Assign to"
                      />
                    </Col>
                  </Row>
                ),
              }),
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
                      <FontAwesomeIcon
                        className="nav-font-color"
                        icon={faInfoCircle}
                        title="Info"
                      />
                    </Col>
                  </Row>
                ),
              }),
              // (rowData) => ({
              //   icon: () => (
              //     <Row>
              //       <Dropdown>
              //         <Dropdown.Toggle>
              //           <FontAwesomeIcon setShowicon={faEllipsisV} />
              //         </Dropdown.Toggle>
              //         <Dropdown.Menu>
              //           <Dropdown.Item onClick={() => navigate("/project/users", { state: rowData.id })}>
              //             Project Users
              //           </Dropdown.Item>
              //           <Dropdown.Item onClick={() => navigate("/project/defects", { state: rowData })}>
              //             Defects list
              //           </Dropdown.Item>
              //         </Dropdown.Menu>
              //       </Dropdown>
              //     </Row>
              //   ),
              // }),
            ]}
            options={{
              cellStyle: { border: "1px solid #eee", textAlign: "center" },
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
          <Modal show={show} onHide={handleClose} centered backdrop="static">
            <Card>
              <Modal.Header
                style={{ borderBottom: 0 }}
                closeButton
                className="bg-light text header-text-color renctangeled-5"
              >
                <h3 className="nav-font-color">Assigned To</h3>
              </Modal.Header>
              <Modal.Body style={{ borderBottom: 0 }} className="p-sm-3 p-md-4">
                <Formik
                  initialValues={{ assignedTo: assignTo, status: statuses }}
                  validationSchema={validation}
                  onSubmit={(values) => updateAssignedToStatus(values)}
                >
                  {(formik) => {
                    const { values, handleSubmit, handleBlur, setFieldValue } =
                      formik;
                    return (
                      <Form onSubmit={handleSubmit}>
                        <Form.Label className="required mb-0">
                          Developers
                        </Form.Label>
                        <Select
                          name="assignedTo"
                          type="string"
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
                        <ErrorMessage
                          name="assignedTo"
                          className="text-danger"
                          component="span"
                        />{" "}
                        <div className="mt-3">
                          <Form.Label className="mt-1 mb-0">
                            Ticket Status
                          </Form.Label>
                          <Select
                            options={status}
                            value={values.status}
                            placeholder="Status"
                            name="status"
                            onChange={(e) => {
                              setFieldValue("status", e);
                            }}
                            onBlur={handleBlur}
                          />
                          <ErrorMessage
                            name="status"
                            className="text-danger"
                            component="span"
                          />{" "}
                        </div>
                        <div className="mt-3 d-flex justify-content-end">
                          <Button
                            variant="outline-secondary"
                            className="me-3 px-4 mt-1"
                            onClick={handleClose}
                          >
                            Close
                          </Button>
                          <Button
                            variant="primary"
                            className="px-4 mt-1"
                            type="submit"
                          >
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
        </Container>
      )}
    </>
  );
}

export default Defects;
