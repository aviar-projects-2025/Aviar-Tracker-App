import React, { useState } from "react";
import { Button, InputGroup, Col, Form, FormControl, Row, Container } from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";
// import "./change-Password.scss";
import Services from "../../Services";
import Loader from "../../core/Loader";
import "../../css/defect-details.scss";

function ChangePassword() {
  const navigate = useNavigate();
  const [passwordShown, setPasswordShown] = useState(false);
  const [confirmPasswordShown, setConfirmPasswordShown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const location = useLocation();
  const updatePassword = (values) => {
    setIsLoading(true);
    const data = { values, email: location.state };
    Services.changePassword(data)
      .then((res) => {
        if (res?.message === "New Password created successfully") {
          setIsLoading(false);
          navigate("/");
          toast.success("Password updated!");
        }
      })
      .catch((error) => {
        if (error?.status >= 400) {
          setIsLoading(false);
          toast.error("Password not updated!!");
        }
      });
  };
  const tooglePasswordVisibility = () => {
    setPasswordShown(!passwordShown);
  };
  const toogleConfirmPasswordVisibility = () => {
    setConfirmPasswordShown(!confirmPasswordShown);
  };
  const passwordSchema = Yup.object().shape({
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
  });
  return isLoading ? (
    <Loader />
  ) : (
    <Container className="login-container-size">
      <Row className="login-container-width">
        <Col sm={10} md={5} lg={5} className="mx-auto shadow rounded margin-height" style={{ marginTop: "8%" }}>
          <Formik
            initialValues={{
              password: "",
              confirmPassword: "",
            }}
            validationSchema={passwordSchema}
            onSubmit={(values) => {
              updatePassword(values);
            }}
          >
            {(formik) => {
              const { values, handleChange, handleSubmit, handleBlur } = formik;
              return (
                <Form onSubmit={handleSubmit} className="p-sm-4 p-lg-5 mb-2 login-text-space">
                  <h1 md={4} className="text-center mt-2">
                    Change Password
                  </h1>
                  <div>
                    <Form.Group md={6} className="mt-3">
                      <Form.Label className="required mb-0">New Password</Form.Label>
                      <InputGroup>
                        <FormControl
                          className="hide"
                          autoComplete="off"
                          placeholder="Enter New password"
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
                    <Form.Group md={6} className="mt-3">
                      <Form.Label className=" login-text-style required mb-0">Confirm Password</Form.Label>
                      <InputGroup>
                        <FormControl
                          className="hide"
                          onPaste={(e) => {
                            e.preventDefault();
                            return false;
                          }}
                          onCopy={(e) => {
                            e.preventDefault();
                            return false;
                          }}
                          placeholder="Enter Confirm password"
                          autoComplete="off"
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
                    <Col md={6} className="d-flex justify-content-end mt-3">
                      <Button
                        variant="primary"
                        className="px-1 login-buttom-space mb-2"
                        type="submit"
                        // onClick={updatePassword}
                      >
                        Change Password
                      </Button>
                    </Col>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </Col>
      </Row>
    </Container>
  );
}

export default ChangePassword;
