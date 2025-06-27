import React, { useEffect, useState } from "react";
import { Col, Form, Row, Button, Card, InputGroup, Container, Dropdown } from "react-bootstrap";
import Avatar from "react-avatar";
import { ErrorMessage, Formik } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as Yup from "yup";
import "../css/defect-details.scss";
import { faEye, faEyeSlash, faPen } from "@fortawesome/free-solid-svg-icons";
import Api from "../Config/Api";
import Select from "react-select";
import { toast } from "react-toastify";
import "../css/AdminProjects.scss";
import { Navigate, useNavigate, Link } from "react-router-dom";
import profile from "../Components/ClientHeader/NoProfile.png";

import Services from "../Services";
import Loader from "../core/Loader";

const EditProfile = () => {
  const [image, setImage] = useState(null);
  const [view, setView] = useState(false);
  const [passwordShown, setPasswordShown] = useState(false);
  const [confirmPasswordShown, setConfirmPasswordShown] = useState(false);
  const [userData, setUserData] = useState();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState();
  const [imageType, setImageType] = useState();
  const inputReference = React.useRef();
  const Lowercase = (str) => {
    return str.toLowerCase();
  };
  const Capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const validation = Yup.object().shape({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    email: Yup.string().email().required("Email is required"),
    phoneNumber: Yup.string()
      .matches(/^[0-9\s]+$/, "Enter Valid Phone Number")
      .min(10, "Enter valid number")
      .max(10, "Enter valid number"),
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
      .required("Confirm Password is required"),
  });
  const removeImage = () => {
    const employeeId = localStorage.getItem("employeId");
    Api.delete(`employe/profile/image/remove/`, {
      params: {
        employeeId: employeeId,
      },
    }).then((res) => {
      toast.success("Profile image Deleted Successfully!...");
      window.location.reload();
      setImagePreview(null);
    });
  };

  const fileUploadAction = () => inputReference.current.click();
  const selectFile = async (event, { setFieldValue }) => {
    setImage(event);
    const file = event.target.files[0];
    const type = file?.type?.split("/")[0];
    const base64 = await convertBase64(file);
    setImage(base64);
    setImagePreview(base64);
    setImageType(type);
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

  const fileUploadInputChange = async (e) => {
    const userId = localStorage.getItem("employeId");
    const file = e.target.files[0];
    const type = file?.type?.split("/")[0];
    const base64 = await convertBase64(file);
    const token = localStorage.getItem("sessionId");
    setImagePreview(base64);
    setImageType(type);
    if (type === "image") {
      Api.patch("employe/image/update", {
        userId: userId,
        imgUrl: base64,
      })
        .then((res) => {
          window.location.reload();
          const status = res.status;
          if (status === 201) {
            toast.success("Profile image Upload Successfully!...");
          }
        })
        .catch((error) => {
          if (error.response && error.response.status >= 400) {
            let errorMessage;
            const errorRequest = error.response.request;
            if (errorRequest && errorRequest.response) {
              errorMessage = JSON.parse(errorRequest.response).message;
            }
            toast.error(error.response.data.message);
          }

          const errorStatus = error?.response?.status;
          if (errorStatus === 401) {
            this.logout();
            toast.error("Session Timeout");
          }
        });
    } else {
      toast.error("Image Only Accept");
    }
  };

  const tooglePasswordVisibility = () => {
    setPasswordShown(!passwordShown);
  };
  const toogleConfirmPasswordVisibility = () => {
    setConfirmPasswordShown(!confirmPasswordShown);
  };

  //Edit user
  const updateProfile = (values) => {
    const userId = localStorage.getItem("employeId");
    Services.EmployeeEdit(values, userId).then((res) => {
      setImage("");
      getEditData();
      toast.success(`Updated ${res?.updatedData?.firstName} details`);

      // }
    });
  };

  const getEditData = () => {
    const userId = localStorage.getItem("userId");
    Api.get(`/user/${userId}`).then((res) => {
      const data = res?.data?.data?.getOne;
      if (data.imgUrl) {
        setImagePreview(data?.imgUrl);
      }
      setUserData(res?.data?.data?.getOne);
    });
  };

  useEffect(() => {
    getEditData();
  }, []);

  return isLoading ? (
    <Loader />
  ) : (
    <div>
      <Container className="p-3 mt-2">
        <Row className=" py-0 profile-dropdown-status">
          <Formik
            enableReinitialize={true}
            initialValues={{
              firstName: userData?.firstName,
              lastName: userData?.lastName,
              email: userData?.email,
              phoneNumber: userData?.phone,
              password: userData?.password,
              confirmPassword: userData?.password,
              address: userData?.address,
              role: userData?.role ? { label: userData?.role, value: userData?.role } : "",
              myImage: imagePreview ? imagePreview : null,
            }}
            validationSchema={validation}
            onSubmit={async (values, { resetForm }) => {
              await updateProfile(values, { resetForm });
            }}
          >
            {(Formik) => {
              const { values, isValid, dirty, handleChange, handleBlur, handleSubmit, setFieldValue } = Formik;

              return (
                // <div class="d-flex justify-content-center mb-4">
                //   <div className="w-100 h-100 flex center justify-content-evenly ">
                <Form onSubmit={handleSubmit}>
                  <Row>
                    {" "}
                    <Col
                      sm={12}
                      xs={12}
                      md={12}
                      lg={4}
                      className="d-flex justify-content-center px-4 pt-2"
                      style={{ backgroundColor: "#0000000a" }}
                    >
                      {/* <div class="w-100 h-100 d-flex ">
                        <div class="w-100 h-100 d-flex justify-content-center align-items-center">
                          <Avatar
                            name={`${userData?.firstName}   ${userData?.lastName}`}
                            size="220"
                            align-items-center
                            round={true}
                          />
                        </div>
                      </div> */}
                      <Dropdown className="dropdown-profile-list">
                        <Dropdown.Toggle className="teacher-menu-dropdown p-0" varient="link">
                          <div>
                            <div>
                              {/* <Avatar src={profile} size="220" round={true} color="silver" className="image-size" /> */}
                              {imagePreview ? (
                                <Avatar
                                  src={imagePreview}
                                  size="220"
                                  round={true}
                                  color="silver"
                                  className="image-size"
                                />
                              ) : (
                                <Avatar src={profile} size="220" round={true} color="silver" className="image-size" />
                              )}
                            </div>
                            <div className="d-flex justify-content-center mt-3">
                              <p style={{ fontSize: 14, color: "black" }}>Click Here To Upload Profile</p>
                              <FontAwesomeIcon icon={faPen} size="md" color="#1d1464" className="mx-2 mt-1" />
                            </div>
                          </div>
                        </Dropdown.Toggle>
                        <Dropdown.Menu center className="profile-dropdown-status  ms-4 py-0">
                          <Dropdown.Item className="status-list ms-3 p-0">
                            <Link to="#" className="change-profile-text-style" onClick={() => fileUploadAction()}>
                              Change Profile
                            </Link>
                          </Dropdown.Item>
                          <hr />
                          <Dropdown.Item className="status-list ms-3 p-0">
                            <Link to="#" className="change-profile-text-style" onClick={() => removeImage()}>
                              Remove Profile
                            </Link>
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                      <input
                        type="file"
                        name="myImage"
                        accept="image/*"
                        className="fileToUpload"
                        ref={inputReference}
                        id="myImage"
                        style={{ display: "none" }}
                        onChange={(e) => fileUploadInputChange(e)}
                      />
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={8} className="py-3 px-3">
                      <div class="d-flex justify-content-center mb-2">
                        <div class="mr-auto p-2 mt-2">
                          <h4>Edit Profile Page</h4>
                        </div>
                      </div>
                      <Row>
                        <Col md={12} lg={6}>
                          <Form.Group className="mb-3 editright">
                            <Form.Label className="required label mb-0">First Name</Form.Label>
                            <Form.Control
                              className="editright"
                              type="text"
                              placeholder="Enter First Name"
                              name="firstName"
                              onChange={handleChange}
                              onblur={handleBlur}
                              value={values.firstName ? Capitalize(values.firstName) : null}
                            />
                            <ErrorMessage className="text-danger" component="span" name="firstName" />
                            <ErrorMessage className="text-danger" component="span" name="firstName" />
                          </Form.Group>
                        </Col>
                        <Col md={12} lg={6}>
                          <Form.Group className="mb-3 secondright">
                            <Form.Label className="required mb-0">Last Name</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Enter Last Name"
                              name="lastName"
                              onChange={handleChange}
                              onblur={handleBlur}
                              value={values.lastName ? Capitalize(values.lastName) : null}
                            />
                            <ErrorMessage className="text-danger" component="span" name="lastName" />
                          </Form.Group>
                        </Col>
                      </Row>{" "}
                      <Row>
                        <Col md={12} lg={6}>
                          <Form.Group className="mb-3 editright">
                            <Form.Label className="required label mb-0">E-Mail</Form.Label>
                            <Form.Control
                              className="editright"
                              type="text"
                              onPaste={(e) => {
                                e.preventDefault();
                                return false;
                              }}
                              onCopy={(e) => {
                                e.preventDefault();
                                return false;
                              }}
                              placeholder="Enter E-Mail Address"
                              name="email"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.email ? Lowercase(values.email) : null}
                            />
                            <ErrorMessage className="text-danger" component="span" name="email" />
                          </Form.Group>
                        </Col>
                        <Col md={12} lg={6}>
                          <Form.Group className="mb-3">
                            <Form.Label className="mb-0">Phone Number</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Enter Phone Number"
                              name="phoneNumber"
                              maxLength={10}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.phoneNumber}
                            />
                            <ErrorMessage className="text-danger" component="span" name="phoneNumber" />
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={12} lg={6}>
                          <Form.Group className="mb-3 editright">
                            <Form.Label className="required label mb-0">Password</Form.Label>
                            <InputGroup>
                              <Form.Control
                                className="editright"
                                placeholder="Enter Password"
                                onPaste={(e) => {
                                  e.preventDefault();
                                  return false;
                                }}
                                onCopy={(e) => {
                                  e.preventDefault();
                                  return false;
                                }}
                                name="password"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.password}
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
                            <ErrorMessage className="text-danger" component="span" name="password" />
                          </Form.Group>
                        </Col>
                        <Col md={12} lg={6}>
                          <Form.Group className="mb-3">
                            <Form.Label className="required mb-0">Confirm Password</Form.Label>
                            <InputGroup>
                              <Form.Control
                                placeholder="Enter Confirm Password"
                                onPaste={(e) => {
                                  e.preventDefault();
                                  return false;
                                }}
                                onCopy={(e) => {
                                  e.preventDefault();
                                  return false;
                                }}
                                name="confirmPassword"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.confirmPassword}
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
                            <ErrorMessage className="text-danger" component="span" name="confirmPassword" />
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Col xs={12} sm={12} md={12} lg={6} className="px-3">
                          <Form.Group className="mt-2 create-user-firstname">
                            <Form.Label className="required">Address </Form.Label>{" "}
                            <InputGroup>
                              <textarea
                                className="addressField"
                                placeholder="Enter Address"
                                onPaste={(e) => {
                                  e.preventDefault();
                                  return false;
                                }}
                                onCopy={(e) => {
                                  e.preventDefault();
                                  return false;
                                }}
                                name="address"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                rows={3}
                                value={values?.address}
                                type={"text"}
                              />
                            </InputGroup>
                          </Form.Group>
                        </Col>
                        <Col xs={12} sm={12} md={12} lg={6} className="px-3">
                          <Form.Group className="mt-2 create-user-firstname">
                            <Form.Label className="required">Role </Form.Label>{" "}
                            <Select
                              name="role"
                              type="select"
                              onBlur={handleBlur}
                              isDisabled
                              value={values.role}
                              onChange={(e) => {
                                setFieldValue("role", e);
                              }}
                              options={[
                                {
                                  value: "employee",
                                  label: "employee",
                                },
                                {
                                  value: "customer",
                                  label: "customer",
                                },
                              ]}
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Col className="mt-3 d-flex justify-content-end ">
                          <Button
                            variant="outline-secondary"
                            className="me-2"
                            type="button"
                            onClick={() => navigate(-1)}
                          >
                            Cancel
                          </Button>
                          <Button disabled={!(dirty && isValid)} className="ms-1 button-style-signup" type="submit">
                            Update
                          </Button>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Form>
                //   </div>
                // </div>
              );
            }}
          </Formik>
        </Row>
      </Container>
    </div>
  );
};

export default EditProfile;
