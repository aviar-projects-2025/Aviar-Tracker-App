import MaterialTable from "material-table";
import React, { useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row, ModalBody } from "react-bootstrap";
import { tableIcons } from "../../core/tableIcons";
import Select from "react-select";
import EmpServices from "../../Services/employe";
import * as Yup from "yup";
import { ErrorMessage, Formik } from "formik";
import "../../css/defect-details.scss";
import Api from "../../Config/Api";
import Loader from "../../core/Loader";
import { toast } from "react-toastify";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import Services from "../../Services";
import moment from "moment";
import { KeyboardTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DayjsUtils from "@date-io/dayjs";
import "react-clock/dist/Clock.css";
import axios from "axios";
import { QRCodeCanvas } from "qrcode.react";

function EmployeeDashbord() {
  const [userIpAddress, setUserIpAddress] = useState();
  const [loginShow, setLoginShow] = useState(false);
  const [logoutModal, setLogutModal] = useState(false);
  const confirmLogout = () => {
    const id = localStorage.getItem("role");
    localStorage.clear(navigate("/"));
    toast.success("logged out Successfully!");
  };
  const handleLogoutClose = () => {
    setLogutModal(false);
  };
  const [logoutShow, setLogoutShow] = useState(false);
  const [leaveShow, setLeaveShow] = useState(false);
  const handleLeaveClose = () => setLeaveShow(false);
  const handleloginClose = () => setLoginShow(false);
  const [lastlogin, setLastLogin] = useState();
  const [data, setData] = useState();
  const [show, setShow] = useState(false);
  const [preview, setPreview] = useState();
  const [view, setView] = useState(false);
  const [defecData, setDefectData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const navigate = useNavigate();
  const disablePastDate = () => {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    const yyyy = today.getFullYear();
    return yyyy + "-" + mm + "-" + dd;
  };
  const imageClose = () => {
    setView(false);
  };

  const [logoutTime, setLogoutTime] = useState();
  const handleClose = () => setShow(!show);
  const handleShow = () => setShow(true);
  // const updateAssignedToStatus = (values) => {
  //   const userId = localStorage.getItem("employeeId");
  //   const data = { assignedTo: values.assignedTo.value, NewStatus: values.status.value };
  //   Services.updateAssignee(data, defectId, defectData, userId).then((res) => {
  //     DefectList();
  //     handleClose();
  //   });
  // };
  const postStatus = (values) => {
    setDefectData(values);
    handleShow();
  };
  const columns = [
    { title: "S.No", render: (rowData) => `${rowData?.tableData?.id + 1}` },
    // { title: "Project Name", field: "projectId.name" },
    { title: "Ticket Number", field: "ticketNo" },
    { title: "Summary", field: "summary" },
    { title: "Ticket Name", field: "defect" },
    { title: "Type Of Ticket", field: "typeOfDefect" },
    {
      title: "Status",
      field: "status",
      render: (rowData) => <text>{rowData?.status}</text>,
    },
    {
      title: "Change Status",

      render: (rowData) => (
        <Button onClick={() => postStatus(rowData)} className="w-100">
          Change Status
        </Button>
      ),
      cellStyle: (rowData) => ({ width: "15%" }),
    },
    {
      title: "Image",
      field: "image",
      render: (rowData) => (
        <text
          onClick={() => {
            setPreview(rowData);
            setView(!view);
          }}
          className="text-info cursor "
          style={{ minWidth: "400px" }}
        >
          Image
        </text>
      ),
    },
  ];
  const validation = Yup.object().shape({
    status: Yup.object().required("Status is required"),
  });
  const logoutSchema = Yup.object().shape({
    logoutTime: Yup.object().required("Logout Time is required"),
  });
  const leaveSchema = Yup.object().shape({
    leaveDate: Yup.string().required("Leave Date is required"),

    reason: Yup.string().required("Reason is required"),
  });

  const status = [
    { value: "Open", label: "Open" },
    { value: "In Progress", label: "In Progress" },
    { value: "On Review", label: "On Review" },
    { value: "Closed", label: "Closed" },
    { value: "Re-Open", label: "Re-Open" },
  ];

  const defectData = () => {
    setIsLoading(true);
    const employeId = localStorage.getItem("employeId");
    EmpServices.getDevDefectList(employeId).then((res) => {
      setData(res?.defectlist);
      setIsLoading(false);
    });
  };

  const getEmployeeStatus = () => {
    const userId = localStorage.getItem("userId");
    Services.getEmployeeLoginStatus(userId).then((res) => {
      const data = res?.details;
      const loginDate = localStorage.getItem("loginDate");
      setLastLogin(loginDate);
      if (loginDate != "" && loginDate != "undefined") {
        const day = new Date();
        const date = moment(day).format("DD-MM-YYYY");
        Api.get(`/loginStatus/logout/${loginDate}`, {
          params: {
            userId: userId,
          },
        }).then((res) => {});
        if (data[0]?.date != date) {
          setLogoutShow(true);
        } else if (data[0].date === date) {
          return;
        } else {
          setLogoutShow(true);
        }
      } else if (data.status === "inactive" || data.length === 0) {
        setLoginShow(true);
      }
    });
  };
  const userId = localStorage.getItem("userId");
  console.log('localStorage.getItem("userId")', localStorage.getItem("userId"));
  console.log('localStorage.getItem("employeId")', localStorage.getItem("employeId"));
  const empId = localStorage.getItem("employeId");

  const editStatus = (values, e) => {
    setIsLoading(true);
    const userId = localStorage.getItem("userId");
    Api.patch(`/defects/defect/status/${defecData?.id}`, {
      NewStatus: values.status.value,
      ticketNo: defecData?.ticketNo,
      userId: userId,
      status: defecData?.status,
    })
      .then((res) => {
        setIsLoading(false);
        if (res.status === 200) {
          toast.success("Status Updated Successfully !");
          defectData();
          handleClose();
        }
      })
      .catch((err) => {
        setIsLoading(false);
        if (err?.response?.status === 400) {
          toast.error(err?.response?.data?.message);
        }
        defectData();
      });
  };
  const getData = async () => {
    const res = await axios.get("https://api.ipify.org/?format=json");
    // setIP(res.data.ip);
    setUserIpAddress(res.data.ip);
  };

  const crateLogStatus = () => {
    const day = new Date();
    const date = moment(day).format("DD-MM-YYYY");
    const loginTime = moment(day).format("h:mma");
    const status = "active";
    const userId = localStorage.getItem("userId");
    const datas = { date, loginTime, status, userId, userIpAddress };
    Services.craeteLoginStatus(datas).then((res) => {
      setLoginShow(false);
      toast.success("Login Time Updated!");
    });
  };
  const updateLogStatus = () => {
    const date = lastlogin;
    const logoutTime = moment(selectedDate?.$d).format("LT");
    const status = "inActive";
    const userId = localStorage.getItem("userId");
    const datas = { date, logoutTime, status, userId };

    Services.updateLoginStatus(datas).then((res) => {
      setLogoutShow(false);
      toast.success("Logged out Time Updated!");
      setLoginShow(true);
    });
  };

  const d = new Date();

  useEffect(() => {
    defectData();
    getEmployeeStatus();
    getData();
    window.onpopstate = function (event) {
      event.preventDefault();
      setLogutModal(true);
      navigate(null);
      setLogutModal(true);
    };
    console.log("localS userId", localStorage.getItem("userId"));
    console.log("employId", localStorage.getItem("employeId"));
  }, []);
  const createEmpLeave = (values) => {
    const employeeId = localStorage.getItem("employeId");
    Api.post(`/employee/leave`, {
      employeeId: employeeId,
      date: values.leaveDate,
      remarks: values.reason,
      status: "Pending",
      reason: "null",
    }).then((res) => {
      if (res.request.statusText === "Created") {
        toast.success("leave applied successfully!");
        setLeaveShow(false);
      } else if (res.request.statusText === "Already Reported") {
        toast.error("Already leave Applied for this date");
      } else {
        return;
      }
    });
  };
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Row className="mt-4">
            <Col className="ms-5">
              <QRCodeCanvas
                className="shadow-lg p-3 m"
                value={`http://aviar-tracker.s3-website.ap-south-1.amazonaws.com/EmployeeId/${empId}`}
                //   value={`http://localhost:3000/EmployeeId/${empId}`}
              />
            </Col>
            <Col className="d-flex justify-content-end me-5 h-100 align-items-center">
              <Button
                className=" summary-ellisis  custom-btn-hover"
                onClick={() => {
                  setLeaveShow(true);
                }}
              >
                Apply Leave
              </Button>
            </Col>
          </Row>
          <div className="mt-5 mx-4 w-auto">
            <div className="mt-5 mx-4 w-auto">
              <h4 className="mt-4 p-0 w-auto">Employee Dashboard</h4>
              <div className="">
                <MaterialTable
                  title="Tickets"
                  icons={tableIcons}
                  columns={columns}
                  data={data}
                  options={{
                    cellStyle: {
                      border: "1px solid #eee",
                      textAlign: "center",
                    },
                    pageSizeOptions: [5, 10, 20, 50],
                    pageSize: 10,
                    addRowPosition: "first",
                    actionsColumnIndex: -1,
                    headerStyle: {
                      backgroundColor: "#14539A",
                      color: "whitesmoke",
                      textAlign: "center",
                      zIndex: 0,
                    },
                    // exportButton: { csv: true },
                  }}
                  actions={[
                    (rowData) => ({
                      icon: () => (
                        <Row>
                          <Col
                            className="d-flex nav-font-color"
                            onClick={() =>
                              navigate(`/details/${rowData?.id}`, {
                                state: { values: rowData },
                              })
                            }
                          >
                            <FontAwesomeIcon className="nav-font-color" icon={faInfoCircle} title="Info" />
                          </Col>
                        </Row>
                      ),
                    }),
                  ]}
                />
              </div>
              <Modal
                show={show}
                size="lg"
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                centered
                className="border-bottom edit"
              >
                <Modal.Header closeButton className="border-bottom  text header-text-color pb-0">
                  <h5 className="modal-header modal-div bg-light text header-text-color">Change Status</h5>
                </Modal.Header>
                <Modal.Body className="border-bottom">
                  <Formik
                    initialValues={{ status: "" }}
                    validationSchema={validation}
                    onSubmit={(values) => {
                      editStatus(values);
                    }}
                  >
                    {(formik) => {
                      const { values, handleSubmit, handleBlur, setFieldValue } = formik;
                      return (
                        <Form className="mx-5" onSubmit={handleSubmit}>
                          <Form.Group>
                            <Form.Label className="required mb-0">Status</Form.Label>
                            <Select
                              type="string"
                              name="status"
                              placeholder="Change Status"
                              options={status}
                              onChange={(e) => {
                                setFieldValue("status", e);
                              }}
                              onBlur={handleBlur}
                              value={values.status}
                            />
                          </Form.Group>
                          <ErrorMessage component="span" name="status" className="text-danger" />
                          <div className=" w-100 d-flex justify-content-end mt-4 mb-2  employeealignCenter">
                            <Button variant="primary" type="submit">
                              Update Status
                            </Button>
                          </div>
                        </Form>
                      );
                    }}
                  </Formik>
                </Modal.Body>
              </Modal>
              <Modal show={view} centered fullscreen={true} onHide={imageClose} scrollable={true}>
                <Modal.Header className="header-text-color" closeButton>
                  <h4>
                    Ticket No :<text className="ticketTitle ms-3">{preview?.ticketNo}</text>{" "}
                  </h4>
                </Modal.Header>
                <Modal.Body className="p-5">
                  <div className="w-100 d-flex justify-content-center">
                    {preview?.errorFile ? (
                      <img src={preview?.errorFile} className="img-fluid" width={"60%"} height={400} />
                    ) : (
                      <h5>No Image to Show</h5>
                    )}
                  </div>

                  <div className=" mt-3 w-100 d-flex justify-content-end">
                    <Button className="px-4" onClick={() => imageClose()}>
                      Close
                    </Button>
                  </div>
                </Modal.Body>
              </Modal>
              <Modal
                show={loginShow}
                onHide={handleloginClose}
                centered
                backdrop="static"
                keyboard={false}
                className="modal-background"
              >
                <Modal.Header closeButton className="bg-light text header-text-color renctangeled-5">
                  <Modal.Title className="modal-div">
                    {/* {firstName} {lastName} */}
                    Add Attendance
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body classnNmae="">
                  <h5>Are You Sure?</h5>
                  <p>You Want To Working a Day?</p>
                </Modal.Body>
                <div className="m-4 d-flex justify-content-end">
                  <Button className="w-25 mx-2" variant="outline-secondary" onClick={handleloginClose}>
                    No
                  </Button>
                  <Button className="ms-2 mx-2 w-25" onClick={() => crateLogStatus()} variant="primary">
                    Yes
                  </Button>
                </div>
              </Modal>
              <Modal
                show={logoutShow}
                onHide={handleloginClose}
                centered
                backdrop="static"
                keyboard={false}
                className="modal-background edit"
              >
                <Modal.Header className="bg-light text header-text-color renctangeled-5">
                  <Modal.Title className="modal-div">
                    {/* {firstName} {lastName} */}
                    Update Logout
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body classnNmae="">
                  <p className="text-danger mt-2">
                    <b>Note : </b>You missed to update Logout time on {lastlogin}, update the Logout time before login
                    today
                  </p>
                  <Formik
                    initialValues={{
                      logoutTime: logoutTime,
                    }}
                    //validationSchema={logoutSchema}
                    onSubmit={(values) => {
                      updateLogStatus(values);
                    }}
                  >
                    {(formik) => {
                      const { values, handleSubmit, handleBlur, setFieldValue } = formik;
                      return (
                        <Form className="mx-5" onSubmit={handleSubmit}>
                          <Row>
                            <Form.Group className="create-user-firstname">
                              <MuiPickersUtilsProvider utils={DayjsUtils}>
                                <KeyboardTimePicker
                                  // label="Enter Logout Time"
                                  placeholder="Enter Logout Time"
                                  mask="__:__ _M"
                                  format="hh:mm a"
                                  value={selectedDate}
                                  onBlur={handleBlur}
                                  onChange={(date) => setSelectedDate(date)}
                                />
                              </MuiPickersUtilsProvider>
                            </Form.Group>
                          </Row>
                          <div className="m-4 d-flex justify-content-end">
                            <Button variant="primary" type="submit" disabled={selectedDate ? false : true}>
                              Submit
                            </Button>
                          </div>
                        </Form>
                      );
                    }}
                  </Formik>
                </Modal.Body>
              </Modal>
              <Modal show={leaveShow} onHide={handleLeaveClose} centered backdrop="static" className="edit">
                <Modal.Header closeButton className="bg-light text header-text-color renctangeled-5">
                  <Modal.Title className="modal-div"> Apply Leave</Modal.Title>
                </Modal.Header>
                <ModalBody>
                  <Formik
                    initialValues={{
                      leaveDate: "",
                      reason: "",
                    }}
                    validationSchema={leaveSchema}
                    onSubmit={(values) => {
                      createEmpLeave(values);
                    }}
                  >
                    {(formik) => {
                      const { values, handleSubmit, handleBlur, handleChange } = formik;
                      return (
                        <Form className="" onSubmit={handleSubmit}>
                          <Row>
                            <Form.Group className="">
                              <Form.Label className="required mb-0">Leave Date</Form.Label>
                              <Form.Control
                                name="leaveDate"
                                type="date"
                                min={disablePastDate()}
                                value={values.leaveDate}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                            </Form.Group>
                            <ErrorMessage component="span" name="leaveDate" className="text-danger" />
                            <Form.Group className="mt-2 ">
                              <Form.Label className="required mb-0">Reason</Form.Label>
                              <Form.Control
                                as="textarea"
                                name="reason"
                                type="text"
                                value={values.reason}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                rows={3}
                              />
                            </Form.Group>
                            <ErrorMessage component="span" name="reason" className="text-danger" />
                            <p className="text-danger mt-2">
                              <b>Note : </b> Update the valid Reason
                            </p>
                          </Row>
                          <div className="mt-2 d-flex justify-content-end ">
                            <Col className=" d-flex justify-content-end " xs={12} lg={6}>
                              <Button
                                className="ms-2 create-user-firstname mx-0 "
                                variant="outline-secondary"
                                onClick={handleLeaveClose}
                              >
                                Cancel
                              </Button>
                              <Button variant="primary" className="ms-2 create-user-firstname mx-2 " type="submit">
                                Submit
                              </Button>
                            </Col>
                          </div>
                        </Form>
                      );
                    }}
                  </Formik>
                </ModalBody>
              </Modal>
              <Modal
                show={logoutModal}
                centered
                onHide={handleLogoutClose}
                backdrop="static"
                keyboard={false}
                className="modal-background"
              >
                <Modal.Header closeButton className="bg-light text header-text-color renctangeled-5">
                  <Modal.Title className="modal-div">
                    {/* {firstName} {Capitalize(lastName)} */}
                    Logout
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body classnNmae="">
                  <h4>Are you sure?</h4>
                  <p>You want to logout ? </p>
                </Modal.Body>
                <div className="m-4 d-flex justify-content-end">
                  <Button className="w-25 mx-2" variant="outline-secondary" onClick={handleLogoutClose}>
                    No
                  </Button>
                  <Button className="ms-2 mx-2 w-25" onClick={() => confirmLogout()} variant="primary">
                    Yes
                  </Button>
                </div>
              </Modal>
            </div>
          </div>
        </>
      )}
    </>
  );
}
export default EmployeeDashbord;
