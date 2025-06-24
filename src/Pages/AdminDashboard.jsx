import React, { useEffect, useState } from "react";
import { Button, Dropdown, Row, Col, Modal, Form, FormControl, InputGroup, Card, Container } from "react-bootstrap";
import MaterialTable from "material-table";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV, faEye, faEyeSlash, faPen } from "@fortawesome/free-solid-svg-icons";
import { ErrorMessage, Formik } from "formik";
import Select from "react-select";
import { tableIcons } from "../core/tableIcons";
import Services from "../Services";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../css/defect-details.scss";
import Loader from "../core/Loader";
import "../css/AdminProjects.scss";
import moment from "moment";
function Dashboard() {
  // useEffect((e) => {
  //   // window.history.pushState(null, null, window.location.href);
  // }, []);
  const [openCreate, setOpenCreate] = useState(false);
  const [logoutShow, setLogutShow] = useState(false);
  const confirmLogout = () => {
    const id = localStorage.getItem("role");
    localStorage.clear(navigate("/"));
    toast.success("logged out Successfully!");
  };
  const [passwordShown, setPasswordShown] = useState(false);
  const [confirmPasswordShown, setConfirmPasswordShown] = useState(false);
  const [employeeData, setEmployeeData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [editEmployee, setEditEmployee] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [employeeDesignation, setEmployeeDesignation] = useState("");
  const [employeeCompanyId, setEmployeeCompanyId] = useState("");
  const [joiningDate, setJoiningDate] = useState(new Date());
  const [userId, setUserId] = useState("");
  const [projectName, setProjectName] = useState();
  const [role, setRole] = useState({ value: "employee", label: "Select role" });
  const [projectListData, setProjectListData] = useState([]);
  const [tableRole, setTableRole] = useState();
  let navigate = useNavigate();
  const Capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  const Lowercase = (str) => {
    return str.toLowerCase();
  };

  const columns = [
    {
      title: "S.No",
      field: "sNo",
      width: "5%",
      render: (rowData) => `${rowData?.tableData?.id + 1}`,
    },
    {
      title: "First Name",
      field: "firstName",
      render: (rowData) => (
        <text
          className="text-info cursor"
          onClick={() =>
            rowData.role === "employee"
              ? navigate("/employee/attendance/admin", {
                  state: { data: rowData },
                })
              : null
          }
        >
          {rowData.firstName}
        </text>
      ),
    },
    { title: "Last Name", field: "lastName" },
    { title: "Role", field: "role" },
    { title: "Email", field: "email" },
    { title: "Password", field: "password" },
    // { title: "Status", field: "status" },
  ];

  const customerData = [
    {
      title: "S.No",
      field: "sNo",
      render: (rowData) => `${rowData?.tableData?.id + 1}`,
    },
    {
      title: "First Name",
      field: "firstName",
      render: (rowData) => (
        <text
          className="text-info cursor"
          onClick={() => {
            navigate("/employee/attendance/admin", {
              state: { data: rowData },
            });
          }}
        >
          {rowData.firstName}
        </text>
      ),
    },
    { title: "Last Name", field: "lastName" },
    { title: "Role", field: "role" },
    { title: "Email", field: "email" },
    { title: "Password", field: "password" },
  ];

  const employeData = [
    {
      title: "S.No",
      field: "sNo",
      render: (rowData) => `${rowData?.tableData?.id + 1}`,
    },
    {
      title: "First Name",
      field: "firstName",
      render: (rowData) => (
        <text
          className="text-info cursor"
          onClick={() => {
            navigate("/employee/attendance/admin", {
              state: { data: rowData },
            });
          }}
        >
          {rowData.firstName}
        </text>
      ),
    },
    { title: "Last Name", field: "lastName" },
    { title: "Employee ID", field: "employeeCompanyId" },
    { title: "Email", field: "email" },
    { title: "Password", field: "password" },
    { title: "Status", field: "status" },
  ];

  //create user
  const submitForm = (values, { resetForm }) => {
    setIsLoading(true);
    Services.EmployeeCreate(values)
      .then((res) => {
        resetForm({ values: "" });
        setIsLoading(false);
        const email = res?.userData?.email;
        if (email) {
          userList();
          setRole("");
          toast.success(`${res?.userData?.firstName} user created`);
          setOpenCreate(false);
        }
      })
      .catch((err) => {
        if (err?.data?.userData) {
          userList();
          setRole("");
          toast.success(`${err?.data?.userData?.firstName} user created`);
        }
        if (err.status === 403) {
          toast.error("User Email Already Exist");
        }
        setIsLoading(false);
        setOpenCreate(false);
      });
  };
  //project details
  const getAllData = () => {
    setIsLoading(true);
    Services.getProjectAlldata().then((res) => {
      setProjectListData(res?.data?.data);
      setIsLoading(false);
    });
  };

  //Edit user
  const editForm = (values) => {
    const adminRole = { role: "admin" };

    setIsLoading(true);
    Services.EmployeeEdit(values, userId, adminRole).then((res) => {
      setOpenCreate(false);
      setIsLoading(false);
      userList();
      toast.success(`Updated ${res?.updatedData?.firstName} details`);
      // }
    });
  };

  //Active Statue
  const onStatus = (values, id) => {
    setIsLoading(true);
    Services.EmployeeStatus(values, id).then((res) => {
      const data = res?.editDetails?.email ? true : false;
      setIsLoading(false);
      if (data === true) {
        userList();
      }
    });
  };

  const userList = () => {
    Services.AdminDashboardgetList().then((res) => {
      const data = res.data.data;

      setEmployeeData(data);
    });
  };

  useEffect(() => {
    const role = localStorage.getItem("role");
    userList();
    getAllData();
     window.onpopstate = function (event) {
      navigate(null);
      event.preventDefault();
      setLogutShow(true);
    };
  }, []);
  const tooglePasswordVisibility = () => {
    setPasswordShown(!passwordShown);
  };
  const toogleConfirmPasswordVisibility = () => {
    setConfirmPasswordShown(!confirmPasswordShown);
  };

  const loginSchema = Yup.object().shape({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    email: Yup.string().email().required("Email is required"),
    phoneNumber: Yup.string()
      .matches(/^[0-9\s]+$/, "Enter Valid Phone Number")
      .min(10, "Enter valid number")
      .max(10, "Enter valid number"),
    role: Yup.object().required("Role is required"),

    password: Yup.string()
      .matches(
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&])",
        "Password Should contain Uppercase, Lowercase, Numbers and Special Characters"
      )
      .min(8, "Password Required Minimum 8 Characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .matches(
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&])",
        "Confirm Password Should contain Uppercase, Lowercase, Numbers and Special Characters"
      )
      .required("Confirm password is required"),

    // projectName:role.value === 'customer' ? Yup.object().required("Project Name is required"):Yup.object().nullable(),
    // employeeDesignation:
    //   role.value === "employee"
    //     ? Yup.string().required("Employee Designation is required")
    //     : Yup.string().nullable(),
    employeeId: role.value === "employee" ? Yup.string().required("Employee Id is required") : Yup.string().nullable(),
    joiningDate: role.value === "employee" ? Yup.string().required("Joining Date is required") : Yup.string(),
  });

  const handleClose = () => {
    setOpenCreate(false);
    setRole("");
    setLogutShow(false);
  };
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="m-5">
          {/* <Header /> */}
          {/* <Row>
        <Col>
          <Button onClick={() => navigate("/admin-email")}>Projects</Button>
        </Col>
      </Row> */}

          <div className="mt-3">
            <div className="d-flex justify-content-center md-between mx-0 mb-3 ">
              <Container fluid style={{ padding: 0 }}>
                <Row>
                  <Col style={{ padding: 5 }}>
                    <Select
                      placeholder="Users"
                      options={[
                        { value: "users", label: "Users" },
                        { value: "employe", label: "Employee" },
                        { value: "customer", label: "Customer" },
                      ]}
                      className="mx-2"
                      onChange={(e) => setTableRole(e.value)}
                    />
                  </Col>
                  <Col className="d-flex justify-content-end mt-2   me-0 h-100 align-items-center">
                    <Button
                      className="me-3 summary-ellisis  custom-btn-hover"
                      onClick={() => {
                        navigate("/employee/Leave");
                      }}
                    >
                      Leave Management
                    </Button>
                    <Button
                      onClick={() => {
                        setOpenCreate(true);
                        setEditEmployee(false);
                        setFirstName("");
                        setLastName("");
                        setEmail("");
                        setPassword("");
                        setConfirmPassword("");
                        setPhoneNumber("");
                        setEmployeeCompanyId("");
                        setEmployeeDesignation("");
                        setJoiningDate("");
                        setRole("");
                      }}
                      className="summary-ellisis  custom-btn-hover"
                    >
                      Add User
                    </Button>
                  </Col>
                </Row>
              </Container>
            </div>
            <div>
              <Modal
                show={openCreate}
                size="lg"
                className="create-user-card edit"
                backdrop="static"
                onHide={handleClose}
              >
                <Card>
                  <Modal.Header
                    closeButton
                    className="create-user-text p-4 bg-light text header-text-color renctangeled-5  "
                  >
                    <div className="modal-div">
                      {editEmployee ? <h3 className="">Edit User</h3> : <h3 className="">Create User</h3>}
                    </div>
                  </Modal.Header>
                  <Modal.Body className="create-user-padding">
                    <Formik
                      initialValues={{
                        firstName: firstName,
                        lastName: lastName,
                        email: email,
                        phoneNumber: phoneNumber,

                        password: password,
                        confirmPassword: confirmPassword,
                        joiningDate: joiningDate,
                        employeeId: employeeCompanyId,
                        role: role,
                      }}
                      validationSchema={loginSchema}
                      onSubmit={(values, { resetForm }) => {
                        editEmployee ? editForm(values, { resetForm }) : submitForm(values, { resetForm });
                      }}
                    >
                      {(formik) => {
                        const {
                          values,
                          handleChange,
                          handleSubmit,
                          handleBlur,
                          errors,
                          touched,
                          isValid,
                          dirty,
                          setFieldValue,
                        } = formik;
                        return (
                          <Form onSubmit={handleSubmit} className="m-sm-3 m-md-4 ">
                            <Row>
                              <Col xs={12} lg={6}>
                                <Form.Group className="create-user-firstname">
                                  <Form.Label className="required mb-0">First Name</Form.Label>{" "}
                                  <FormControl
                                    placeholder="Enter first name"
                                    name="firstName"
                                    type="text"
                                    value={Capitalize(values.firstName)}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    autoComplete="off"
                                  />
                                  <ErrorMessage className="error text-danger" component="span" name="firstName" />
                                </Form.Group>
                              </Col>
                              <Col xs={12} lg={6}>
                                <Form.Group className="create-user-firstname">
                                  <Form.Label className="required mb-0">Last Name</Form.Label>{" "}
                                  <FormControl
                                    placeholder="Enter last name"
                                    name="lastName"
                                    type="text"
                                    value={Capitalize(values.lastName)}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    autoComplete="off"
                                  />
                                  <ErrorMessage className="error text-danger" component="span" name="lastName" />
                                </Form.Group>
                              </Col>
                            </Row>
                            <Row>
                              <Col xs={12} lg={6}>
                                <Form.Group className="mt-2 create-user-firstname">
                                  <Form.Label className="required mb-0">Email</Form.Label>{" "}
                                  <FormControl
                                    placeholder="Enter email address"
                                    onPaste={(e) => {
                                      e.preventDefault();
                                      return false;
                                    }}
                                    onCopy={(e) => {
                                      e.preventDefault();
                                      return false;
                                    }}
                                    name="email"
                                    type="email"
                                    value={Lowercase(values.email)}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    autoComplete="off"
                                  />
                                  <ErrorMessage className="error text-danger" component="span" name="email" />
                                </Form.Group>
                              </Col>
                              <Col xs={12} lg={6}>
                                <Form.Group className="mt-2 create-user-firstname ">
                                  <Form.Label className="mb-0">Phone Number </Form.Label>
                                  <FormControl
                                    placeholder="Enter phone number"
                                    name="phoneNumber"
                                    type="text"
                                    maxlength={10}
                                    value={values.phoneNumber}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    autoComplete="off"
                                  />
                                  <ErrorMessage className="error text-danger" component="span" name="phoneNumber" />
                                </Form.Group>
                              </Col>
                            </Row>
                            <Row>
                              <Col xs={12} lg={6}>
                                <Form.Group className="mt-2 create-user-firstname">
                                  <Form.Label className="required mb-0">Password </Form.Label>{" "}
                                  <InputGroup>
                                    <FormControl
                                      placeholder="Enter password"
                                      onPaste={(e) => {
                                        e.preventDefault();
                                        return false;
                                      }}
                                      onCopy={(e) => {
                                        e.preventDefault();
                                        return false;
                                      }}
                                      value={values.password}
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      name="password"
                                      type={passwordShown ? "text" : "password"}
                                      autoComplete="new-password"
                                    />
                                    <InputGroup.Text>
                                      <FontAwesomeIcon
                                        icon={passwordShown ? faEye : faEyeSlash}
                                        onClick={tooglePasswordVisibility}
                                      />
                                    </InputGroup.Text>
                                  </InputGroup>
                                  <ErrorMessage name="password" component="span" className="error text-danger" />
                                </Form.Group>
                              </Col>
                              <Col xs={12} lg={6}>
                                <Form.Group className="mt-2 create-user-firstname">
                                  <Form.Label className="required mb-0">Confirm Password</Form.Label>{" "}
                                  <InputGroup>
                                    <FormControl
                                      placeholder="Enter confirm password"
                                      value={values.confirmPassword}
                                      onPaste={(e) => {
                                        e.preventDefault();
                                        return false;
                                      }}
                                      onCopy={(e) => {
                                        e.preventDefault();
                                        return false;
                                      }}
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      name="confirmPassword"
                                      type={confirmPasswordShown ? "text" : "password"}
                                    />
                                    <InputGroup.Text>
                                      <FontAwesomeIcon
                                        icon={confirmPasswordShown ? faEye : faEyeSlash}
                                        onClick={toogleConfirmPasswordVisibility}
                                        size="1x"
                                      />
                                    </InputGroup.Text>
                                  </InputGroup>
                                  <ErrorMessage name="confirmPassword" component="span" className="error text-danger" />
                                </Form.Group>
                              </Col>
                            </Row>
                            <Row>
                              <Col xs={12} lg={6}>
                                <Form.Group className="mt-2 create-user-firstname">
                                  <Form.Label className="required mb-0">Role </Form.Label>{" "}
                                  <Select
                                    name="role"
                                    type="select"
                                    onBlur={handleBlur}
                                    isDisabled={editEmployee ? true : false}
                                    value={values.role}
                                    onChange={(e) => {
                                      setFieldValue("role", e);
                                      setRole(e);
                                    }}
                                    options={[
                                      {
                                        value: "employee",
                                        label: "Employee",
                                      },
                                      {
                                        value: "customer",
                                        label: "Customer",
                                      },
                                    ]}
                                  />
                                  <ErrorMessage className="text-danger" component="span" name="role" />
                                </Form.Group>
                              </Col>

                              <Col xs={12} lg={6}>
                                {role?.value === "employee" ? (
                                  <Form.Group className="mt-2 create-user-firstname">
                                    <Form.Label className="required mb-0">Employee Id </Form.Label>
                                    <FormControl
                                      placeholder="Enter employee id"
                                      value={values.employeeId}
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      name="employeeId"
                                      type="text"
                                    />
                                    <ErrorMessage name="employeeId" component="span" className="error text-danger" />
                                  </Form.Group>
                                ) : (
                                  // <Form.Group className="mt-2 create-user-firstname">
                                  //   <Form.Label className="required">Employee Designation </Form.Label>
                                  //   <FormControl
                                  //     placeholder="Enter Employee Designation"
                                  //     value={values.employeeDesignation}
                                  //     onChange={handleChange}
                                  //     onBlur={handleBlur}
                                  //     name="employeeDesignation"
                                  //     type="text"
                                  //   />
                                  //   <ErrorMessage
                                  //     name="employeeDesignation"
                                  //     component="span"
                                  //     className="error text-danger"
                                  //   />
                                  // </Form.Group>
                                  ""
                                )}
                              </Col>
                            </Row>
                            <Row className="mb-2 ">
                              <Col xs={12} lg={6}>
                                {role?.value === "employee" ? (
                                  <Form.Group className="mt-2 create-user-firstname">
                                    <Form.Label className="required mb-0">Date of Joining </Form.Label>
                                    <FormControl
                                      name="joiningDate"
                                      type="date"
                                      value={values.joiningDate}
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                    />
                                    <ErrorMessage name="joiningDate" component="span" className="error text-danger" />
                                  </Form.Group>
                                ) : (
                                  ""
                                )}
                              </Col>

                              <div className="mt-3 d-flex justify-content-end ">
                                <Col className="mt-3 d-flex justify-content-end " xs={12} lg={6}>
                                  <Button
                                    className="ms-3 create-user-firstname mx-2 "
                                    variant="outline-secondary"
                                    onClick={() => {
                                      setOpenCreate(false);
                                    }}
                                  >
                                    Cancel
                                  </Button>
                                  {editEmployee ? (
                                    <Button
                                      className="ms-1 button-style-signup create-user-firstname"
                                      type="submit"
                                      variant="primary"
                                      disabled={!(dirty && isValid)}
                                    >
                                      Update
                                    </Button>
                                  ) : (
                                    <Button
                                      className="button-style-signup ms-1 create-user-firstname"
                                      variant="primary"
                                      type="submit"
                                    >
                                      Create
                                    </Button>
                                  )}
                                </Col>
                              </div>
                            </Row>
                          </Form>
                        );
                      }}
                    </Formik>
                  </Modal.Body>
                </Card>
              </Modal>
            </div>
            <MaterialTable
              title="Users"
              icons={tableIcons}
              columns={tableRole === "customer" ? customerData : tableRole === "employe" ? employeData : columns}
              data={
                tableRole === "customer"
                  ? employeeData.filter((x) => x.role == "customer")
                  : tableRole === "employe"
                  ? employeeData.filter((x) => x.role == "employee")
                  : employeeData
              }
              actions={[
                (rowData) => ({
                  icon: () => (
                    <Row>
                      <Col className="nav-font-color">
                        <FontAwesomeIcon
                          icon={faPen}
                          className="nav-fonts-color nav-font-color"
                          title="Edit Employee"
                        />
                      </Col>
                    </Row>
                  ),
                  onClick: () => {
                    setOpenCreate(true);
                    setEditEmployee(true);
                    setUserId(rowData?.id);
                    setFirstName(rowData?.firstName ? rowData?.firstName : "");
                    setLastName(rowData?.lastName ? rowData?.lastName : "");
                    setEmail(rowData?.email ? rowData?.email : "");
                    setPassword(rowData?.password ? rowData?.password : "");
                    // setProjectName(rowData.projectName ? { label: rowData.projectName, value: rowData.projectName } : "");
                    setRole(rowData.role ? { label: rowData.role, value: rowData.role } : "");
                    setConfirmPassword(rowData?.confirmPassword ? rowData?.confirmPassword : "");
                    setPhoneNumber(rowData?.phoneNumber ? rowData?.phoneNumber : "");
                    setEmployeeCompanyId(rowData?.employeeCompanyId ? rowData?.employeeCompanyId : "");
                    setEmployeeDesignation(rowData?.employeeDesignation ? rowData?.employeeDesignation : "");
                    setJoiningDate(rowData?.joiningDate ? rowData?.joiningDate : "");
                  },
                }),
                (rowData) => {
                  return {
                    icon: () =>
                      rowData.role === "customer" ? null : (
                        <Dropdown>
                          <Dropdown.Toggle className=" icon-size ">
                            <FontAwesomeIcon icon={faEllipsisV} />
                          </Dropdown.Toggle>
                          <Dropdown.Menu>
                            <Dropdown.Item className="navbar-dropdown  menu-text">
                              <div className="nav-font-color" onClick={() => onStatus("Active", rowData.id)}>
                                {" "}
                                Active
                              </div>
                            </Dropdown.Item>
                            <hr />

                            <Dropdown.Item className="navbar-dropdown  menu-text">
                              <div className="nav-font-color" onClick={() => onStatus("InActive", rowData.id)}>
                                Inactive
                              </div>
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      ),
                  };
                },
              ]}
              options={{
                cellStyle: { border: "1px solid #eee", textAlign: "center" },
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
                actionsCellStyle: {
                  display: "flex",
                  justifyContent: "center",
                  width: "unset",
                },
                // exportButton: { csv: true },
              }}
              localization={{
                toolbar: { function: "Placeholder" },
                body: {
                  addTooltip: "Add Employee",
                },
              }}
            />
          </div>
          <Modal
            show={logoutShow}
            centered
            onHide={handleClose}
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
              <Button className="w-25 mx-2" variant="outline-secondary" onClick={handleClose}>
                No
              </Button>
              <Button className="ms-2 mx-2 w-25" onClick={() => confirmLogout()} variant="primary">
                Yes
              </Button>
            </div>
          </Modal>
        </div>
      )}
    </>
  );
}

export default Dashboard;
