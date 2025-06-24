import React, { useState } from "react";
import {
  Button,
  Col,
  Form,
  FormControl,
  Row,
  Container,
  Modal,
} from "react-bootstrap";
import { Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./change-Password.scss";
import Services from "../../Services";
import "../../css/AdminProjects.scss";
import Loader from "../../core/Loader";


function ForgetPassword() {
  const [show, setShow] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [isEmail, setIsEmail] = useState("");
  const handleClose = () => setShow(false);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const Lowercase = (str) => {
    return str.toLowerCase();
  };
  const forgetPasswordCode = (values) => {
    setIsLoading(true);
    setIsEmail(values.email);
    Services.requestCode(values)
      .then((res) => {
        // setSecurityCode(res?.data?.temporaryCode);
        if (res.message === "Verification Code Send To User Mail") {
          setIsLoading(false);
          setShow(true);
        }
      })
      .catch((err) => {
        setIsLoading(false);

        toast.error("mail not found!");
      });
  };
  const verifyCode = (value) => {
    let string = "";
    const values = string.concat(
      value?.otp1 +
        value?.otp2 +
        value?.otp3 +
        value?.otp4 +
        value?.otp5 +
        value?.otp6
    );
    const data = { values, email: isEmail };
    setIsLoading(true);
    Services.checkCode(data)
    
      .then((res) => {
        if (res.message === "Code Verified Successfully") {
          setIsLoading(false);
          navigate("/change/password", { state: isEmail });
        }
        //  else if (res.message === "OTP Verification Failed") {
        //   toast.error("Code Wrong.!");
        // }
      })
      .catch((error) => {
        if (error?.status >= 400) {
          setIsLoading(false);
          toast.error("Verification code failed!");
          // navigate("/login");
        }
      });
  };

  const loginSchema = Yup.object().shape({
    email: Yup.string().email().required("Email is Required"),
  });
  const OTPSchema = Yup.object().shape({
    otp1: Yup.string().required("Verification is required"),
    otp2: Yup.string().required("Verification is required"),
    otp3: Yup.string().required("Verification is required"),
    otp4: Yup.string().required("Verification is required"),
    otp5: Yup.string().required("Verification is required"),
    otp6: Yup.string().required("Verification is required"),
  });

  const inputfocus = (elmnt, values) => {
    const otpData = values;

    if (elmnt.key === "Delete" || elmnt.key === "Backspace") {
      const next = elmnt.target.tabIndex - 2;
      if (next > -1) {
        elmnt.target.form.elements[next].focus();
      }
    } else {
      const next = elmnt.target.tabIndex;
      if (next < 6) {
        elmnt.target.form.elements[next].focus();
        if (
          otpData.otp1 &&
          otpData.otp2 &&
          otpData.otp3 &&
          otpData.otp4 &&
          otpData.otp5 &&
          otpData.otp6
        ) {
          verifyCode(values);
        }
      }
    }
  };

  return (
    isLoading?<Loader />:
    <Container className="login-container-size">
      <Row className="login-container-width">
        <Col
          sm={10}
          md={5}
          lg={5}
          className="mx-auto shadow rounded margin-height"
          style={{ marginTop: "8%" }}
        >
          <Formik
            initialValues={{
              email: "",
            }}
            validationSchema={loginSchema}
            onSubmit={(values) => {
              forgetPasswordCode(values);
            }}
          >
            {(formik) => {
              const { values, handleChange, handleSubmit, handleBlur } = formik;
              return (
                <Form
                  onSubmit={handleSubmit}
                  className="p-sm-4 p-lg-5 mb-2 login-text-space"
                >
                  <h3 className="text-center mt-2">Forgot Password</h3>
                  <div>
                    <Form.Group className="login-text-style">
                      <Form.Label className="required mb-0">Email</Form.Label>
                      <FormControl
                        placeholder="Enter email address"
                        autoComplete="off"
                        name="email"
                        type="email"
                        className="hide"
                        value={Lowercase(values.email)}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        onPaste={(e) => {
                          e.preventDefault();
                          return false;
                        }}
                        onCopy={(e) => {
                          e.preventDefault();
                          return false;
                        }}
                      />
                      <ErrorMessage
                        className="error text-danger"
                        component="span"
                        name="email"
                      />
                    </Form.Group>
                    <Col className="d-flex justify-content-end">
                      <Button
                        variant="primary"
                        className="px-5 login-buttom-space mt-3"
                        type="submit"
                      >
                        Next
                      </Button>
                    </Col>

                    <p className="text-danger mt-2">
                      <b>Note : </b>Please Enter valid Email to get verification
                      code to change a New Password
                    </p>
                  </div>
                  <Modal
                    className="create-priority-modal modal-background"
                    show={show}
                    onHide={handleClose}
                    backdrop="static"
                    centered
                    size="lg"
                    // fullscreen="lg-down"
                  >
                    <Modal.Header
                      closeButton
                      className="bg-light text header-text-color renctangeled-5"
                    >
                      <Modal.Title className="form-header">
                        Verification Code
                      </Modal.Title>
                    </Modal.Header>
                    {/* <Otp /> */}
                    <Modal.Body>
                      <p className="text-danger">
                        <b>Note : </b>Check your email, Please Enter
                        verification code
                      </p>
                      <Formik
                        initialValues={{
                          otp1: "",
                          otp2: "",
                          otp3: "",
                          otp4: "",
                          otp5: "",
                          otp6: "",
                        }}
                        validationSchema={OTPSchema}
                        onSubmit={(values) => {
                          verifyCode(values);
                        }}
                      >
                        {(formik) => {
                          const {
                            values,
                            handleChange,
                            handleSubmit,
                            handleBlur,
                          } = formik;

                          return (
                            <Form
                              onSubmit={handleSubmit}
                              className="text-center p-lg-5 p-md-3 p-sm-1"
                            >
                              <div className="otpContainer mb-2">
                                <input
                                  name="otp1"
                                  type="text"
                                  autoComplete="off"
                                  className="otpInput"
                                  value={values.otp1}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  tabIndex="1"
                                  maxLength="1"
                                  onKeyUp={(e) => inputfocus(e, values)}
                                />
                                <input
                                  name="otp2"
                                  type="text"
                                  autoComplete="off"
                                  className="otpInput"
                                  value={values.otp2}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  tabIndex="2"
                                  maxLength="1"
                                  onKeyUp={(e) => inputfocus(e, values)}
                                />
                                <input
                                  name="otp3"
                                  type="text"
                                  autoComplete="off"
                                  className="otpInput"
                                  value={values.otp3}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  tabIndex="3"
                                  maxLength="1"
                                  onKeyUp={(e) => inputfocus(e, values)}
                                />
                                <input
                                  name="otp4"
                                  type="text"
                                  autoComplete="off"
                                  className="otpInput"
                                  value={values.otp4}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  tabIndex="4"
                                  maxLength="1"
                                  onKeyUp={(e) => inputfocus(e, values)}
                                />

                                <input
                                  name="otp5"
                                  type="text"
                                  autoComplete="off"
                                  className="otpInput"
                                  value={values.otp5}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  tabIndex="5"
                                  maxLength="1"
                                  onKeyUp={(e) => inputfocus(e, values)}
                                />
                                <input
                                  name="otp6"
                                  type="text"
                                  autoComplete="off"
                                  className="otpInput"
                                  value={values.otp6}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  tabIndex="5"
                                  maxLength="1"
                                  onKeyUp={(e) => {
                                    inputfocus(e, values);
                                  }}
                                />
                              </div>
                              {values.otp1 === "" ? (
                                <ErrorMessage
                                  className="error text-danger"
                                  component="span"
                                  name="otp1"
                                />
                              ) : values.otp2 === "" ? (
                                <ErrorMessage
                                  className="error text-danger"
                                  component="span"
                                  name="otp2"
                                />
                              ) : values.otp3 === "" ? (
                                <ErrorMessage
                                  className="error text-danger"
                                  component="span"
                                  name="otp3"
                                />
                              ) : values.otp4 === "" ? (
                                <ErrorMessage
                                  className="error text-danger"
                                  component="span"
                                  name="otp4"
                                />
                              ) : values.otp5 === "" ? (
                                <ErrorMessage
                                  className="error text-danger"
                                  component="span"
                                  name="otp5"
                                />
                              ) : values.otp6 === "" ? (
                                <ErrorMessage
                                  className="error text-danger"
                                  component="span"
                                  name="otp6"
                                />
                              ) : (
                                ""
                              )}
                              <br />
                              {/* <Button
                                className="primary px-4 mt-3"
                                type="submit"
                              >
                                Submit
                              </Button> */}
                            </Form>
                          );
                        }}
                      </Formik>
                    </Modal.Body>
                    {/* <Modal.Body className="p-sm-3 p-md-4">
                      <Formik
                        initialValues={{ verificationCode: "" }}
                        validationSchema={verifyCodevalidation}
                        onSubmit={(values) => {
                          verifyCode(values);
                        }}
                      >
                        {(formik) => {
                          const {
                            values,
                            handleChange,
                            handleSubmit,
                            handleBlur,
                            isValid,
                          } = formik;
                          return (
                            <Form onSubmit={handleSubmit}>
                              <Form.Group
                                xs={12}
                                lg={6}
                                className="mt-2 create-user-firstname"
                              >
                                <Form.Label>
                                  <h5>
                                  Check your mail & Enter your Verification Code
                                    <span className="form-header">
                                    </span>
                                  </h5>
                                </Form.Label>
                                <Form.Control
                                  className="no-arrows"
                                  autoComplete="off"
                                  placeholder="Enter Verfication code"
                                  name="verificationCode"
                                  type="string"
                                  autoFocus="autofocus"
                                  maxLength={5}
                                  value={values.verificationCode}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                />
                                <ErrorMessage
                                  name="verificationCode"
                                  component="span"
                                  className="text-danger"
                                />
                              </Form.Group>
                              <div className="d-flex justify-content-end mt-3 mb-2">
                                <Button
                                  className="mx-2"
                                  variant="outline-secondary"
                                  onClick={handleClose}
                                >
                                  Cancel
                                </Button>
                                <Button
                                  variant="primary"
                                  type="submit"
                                  disabled={!isValid}
                                  onClick={verifyCode}
                                >
                                  Verify
                                </Button>
                              </div>
                            </Form>
                          );
                        }}
                      </Formik>
                    </Modal.Body> */}
                  </Modal>
                </Form>
              );
            }}
          </Formik>
        </Col>
      </Row>
    </Container>
  );
}

export default ForgetPassword;
