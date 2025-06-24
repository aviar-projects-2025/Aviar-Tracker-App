import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ErrorMessage, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Button, Col, Form, FormControl, InputGroup } from "react-bootstrap";
import * as Yup from "yup";
import { NavLink } from "react-router-dom";
// import Header from "../Header";
// import Api from "../../Api";
// import Loader from "../Loader";

function AdminToEmployeEdit(props) {
  //   const userId = props.location.state.values.id;
  const [passwordShown, setPasswordShown] = useState(false);
  const [confirmPasswordShown, setConfirmPasswordShown] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [employeeDesignation, setEmployeeDesignation] = useState("");
  const [employeeCompanyId, setEmployeeCompanyId] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  //   const history = useHistory();

  const tooglePasswordVisibility = () => {
    setPasswordShown(!passwordShown);
  };
  const toogleConfirmPasswordVisibility = () => {
    setConfirmPasswordShown(!confirmPasswordShown);
  };
  const loginSchema = Yup.object().shape({
    firstName: Yup.string(),
    lastName: Yup.string().required(),
    email: Yup.string().email().required(),
    phoneNumber: Yup.string().required(),
    password: Yup.string()
      .matches(
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&])",
        "Password Should contain Uppercase, Lowercase, Numbers and Special Characters"
      )
      .min(8, "Password Required Minimum 8 Characters")
      .required("Password Is Required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .matches(
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&])",
        "Confirm Password Should contain Uppercase, Lowercase, Numbers and Special Characters"
      )
      .required("Confirm Password Is Required"),
    employeeDesignation: Yup.string().required(),
    employeeCompanyId: Yup.string().required(),
  });

  // const getUserDetails = () => {
  //   Api.get(`api/v1/employe/${userId}`).then((response) => {
  //     const userData = response.data.data.getOne;
  //     setFirstName(userData.firstName);
  //     setLastName(userData.lastName);
  //     setPhoneNumber(userData.phoneNumber);
  //     setEmail(userData.email);
  //     setPassword(userData.password);
  //     setConfirmPassword(userData.confirmPassword);
  //     setEmployeeDesignation(userData.employeeDesignation);
  //     setEmployeeCompanyId(userData.employeeCompanyId);
  //     setIsLoading(false);
  //   });
  // };

  //   const submitForm = (values) => {
  //     Api.patch(`api/v1/employe/update/${userId}`, {
  //       firstName: values.firstName,
  //       lastName: values.lastName,
  //       phoneNumber: values.phoneNumber,
  //       email: values.email,
  //       password: values.password,
  //       confirmPassword: values.confirmPassword,
  //       employeeDesignation: values.employeeDesignation,
  //       employeeCompanyId: values.employeeCompanyId,
  //     }).then((response) => {
  //       history.goBack("/admin/dashboard");
  //     });
  //   };

  //   useEffect(() => {
  //     getUserDetails();
  //   }, []);

  return (
    <div>
      {/* {isLoading ? <Loader/> :  */}
      <div>
        <Formik
          enableReinitialize={true}
          initialValues={{
            firstName: firstName,
            lastName: lastName,
            email: email,
            phoneNumber: phoneNumber,
            password: password,
            confirmPassword: confirmPassword,
            employeeDesignation: employeeDesignation,
            employeeCompanyId: employeeCompanyId,
          }}
          validationSchema={loginSchema}
          // onSubmit={(values) => submitForm(values)}
        >
          {(formik) => {
            const { values, handleChange, handleSubmit, handleBlur, isValid } = formik;
            return (
              <div className="mt-4 mb-5" style={{ marginTop: "10% !important" }}>
                {/* <Header /> */}
                <Form onSubmit={handleSubmit} className="profile-div-update ">
                  <div className="card-div">
                    <div className="main-card-div">
                      <h1 className="title">Update Details</h1>
                      <div className="mt-1">
                        <Col className="col-one-signup ">
                          <Form.Group className="text-inp-signup">
                            <Form.Label>First Name: </Form.Label>
                            <FormControl
                              placeholder="Enter First Name"
                              name="firstName"
                              type="text"
                              value={values.firstName}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                            <ErrorMessage className="error text-danger" component="span" name="firstName" />
                          </Form.Group>
                          <Form.Group className="text-inp-signup">
                            <Form.Label>Last Name: </Form.Label>
                            <FormControl
                              placeholder="Enter Last Name"
                              name="lastName"
                              type="text"
                              value={values.lastName}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                            <ErrorMessage className="error text-danger" component="span" name="lastName" />
                          </Form.Group>
                        </Col>
                        <Col className="col-one-signup">
                          <Form.Group className="text-inp-signup">
                            <Form.Label>Email: </Form.Label>
                            <FormControl
                              placeholder="Enter email address"
                              name="email"
                              type="email"
                              value={values.email}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                            <ErrorMessage className="error text-danger" component="span" name="email" />
                          </Form.Group>
                          <Form.Group className="text-inp-signup">
                            <Form.Label>Phone Number: </Form.Label>
                            <FormControl
                              placeholder="Enter Phone Number"
                              name="phoneNumber"
                              type="text"
                              value={values.phoneNumber}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                            <ErrorMessage className="error text-danger" component="span" name="phoneNumber" />
                          </Form.Group>
                        </Col>
                        <Col className="col-one-signup">
                          <Form.Group className="text-inp-signup">
                            <Form.Label>Password: </Form.Label>
                            <InputGroup>
                              <FormControl
                                placeholder="Enter password"
                                value={values.password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                name="password"
                                type={passwordShown ? "text" : "password"}
                              />
                              <InputGroup.Text>
                                <FontAwesomeIcon
                                  icon={passwordShown ? faEye : faEyeSlash}
                                  onClick={tooglePasswordVisibility}
                                  size="1x"
                                />
                              </InputGroup.Text>
                            </InputGroup>
                            <ErrorMessage name="password" component="span" className="error text-danger" />
                          </Form.Group>
                          <Form.Group className="text-inp-signup">
                            <Form.Label>Confirm Password: </Form.Label>
                            <InputGroup className="text-inp-signup">
                              <FormControl
                                placeholder="Enter Confirm password"
                                value={values.confirmPassword}
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
                        <Col className="col-one-signup">
                          <Form.Group className="text-inp-signup">
                            <Form.Label>Employee Designation: </Form.Label>
                            <FormControl
                              placeholder="Enter Employee Designation"
                              value={values.employeeDesignation}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              name="employeeDesignation"
                              type="text"
                            />
                            <ErrorMessage name="employeeDesignation" component="span" className="error text-danger" />
                          </Form.Group>
                          <Form.Group className="text-inp-signup">
                            <Form.Label>Employee Id: </Form.Label>
                            <FormControl
                              placeholder="Enter Employee ID"
                              value={values.employeeCompanyId}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              name="employeeId"
                              type="text"
                            />
                            <ErrorMessage name="employeeId" component="span" className="error text-danger" />
                          </Form.Group>
                        </Col>
                        <Col className="button-col mt-3">
                          <Button variant="primary" className="button-style-signup" type="submit">
                            Update
                          </Button>
                        </Col>
                      </div>
                    </div>
                  </div>
                </Form>
              </div>
            );
          }}
        </Formik>
      </div>
    </div>
  );
}

export default AdminToEmployeEdit;
