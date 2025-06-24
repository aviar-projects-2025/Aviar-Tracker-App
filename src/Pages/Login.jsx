import React, { useState } from "react";
import { Button, Col, Form, FormControl, InputGroup, Row, Container } from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { Link, useLocation, useNavigate } from "react-router-dom";
// import Header from "../Header";
// import Aviar from "../Login/aviar.png";
import { useAppContext } from "../Hooks/AppContext";
import Services from "../Services";
import "../css/defect-details.scss";
import Loader from "../core/Loader";

function Login() {
  const { login } = useAppContext();
  const [passwordShown, setPasswordShown] = useState(false);
  const navigate = useNavigate();
  const Lowercase = (str) => {
    return str.toLowerCase();
  };
  const [isLoading, setIsLoading] = useState(false);

  const tooglePasswordVisibility = () => {
    setPasswordShown(!passwordShown);
  };
  const loginSchema = Yup.object().shape({
    email: Yup.string().email().required("Email is Required"),
    password: Yup.string().required("Password is Required"),
  });

  const submitForm = (values) => {
    setIsLoading(true);

    Services.login(values)
      .then((res) => {
        const data = res?.userDetails;
        // const data = res?.user;
        const role = data?.role;
        localStorage.setItem("role", role);
        localStorage.setItem("firstName", data?.firstName);
        localStorage.setItem("lastName", data?.lastName);
        localStorage.setItem("employeId", data?.userId);
        localStorage.setItem("userId", data?.id);
        localStorage.getItem("token", data?.token);
        localStorage.getItem("email", data?.email);
        if (data?.role === "admin") {
          setIsLoading(false);
          navigate("/admin/dashboard");
        } else if (data?.role === "customer") {
          localStorage.setItem("projectId", data?.projectId);
          setIsLoading(false);
          navigate("/project/defects/list", {
            state: { defectData: res?.userDetails },
          });
          // navigate("/project/defects/list", { state: { values: res?.userDetails } });
        } else {
          setIsLoading(false);
          const logindate = localStorage.setItem("loginDate", data?.loginDate);
          navigate("/employee/dashboard");
        }
      })
      .catch((err) => {
        setIsLoading(false);
        toast.error("Invalid login Credential !..");
      });
  };

  return isLoading ? (
    <Loader />
  ) : (
    <Container className="login-container-size">
      <Row className="login-container-width">
        <Col sm={10} md={5} lg={5} className="mx-auto shadow rounded margin-height" style={{ marginTop: "6%" }}>
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={loginSchema}
            onSubmit={(values) => submitForm(values)}
          >
            {(formik) => {
              const { values, handleChange, handleSubmit, handleBlur } = formik;
              return (
                <Form onSubmit={handleSubmit} className="p-sm-4 p-lg-5 mb-2 login-text-space ">
                  <h1 className="text-center ">Login</h1>
                  <div>
                    <Form.Group className="login-text-style">
                      <Form.Label className="required mb-0">Email</Form.Label>
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
                        placeholder="Enter email address"
                        name="email"
                        type="email"
                        autoComplete="off"
                        value={Lowercase(values.email)}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <ErrorMessage className="error text-danger" component="span" name="email" />
                    </Form.Group>
                    <Form.Group className="mt-3 login-text-style">
                      <Form.Label className="required mb-0">Password</Form.Label>
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
                          placeholder="Enter password"
                          value={values.password}
                          onChange={handleChange}
                          autoComplete="off"
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
                    <p className="d-flex justify-content-end mt-3">
                      <Link to={"/forgot/password"}>Forgot password</Link>
                    </p>
                    <Col className="d-flex justify-content-center">
                      <Button variant="primary" className="px-5 login-buttom-space mt-3" type="submit">
                        Login
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

export default Login;
