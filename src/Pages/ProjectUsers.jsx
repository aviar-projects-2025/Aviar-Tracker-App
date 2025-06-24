import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import { tableIcons } from "../core/tableIcons";
import { Button, Col, Form, Modal } from "react-bootstrap";
import Select from "react-select";
import * as Yup from "yup";
import { ErrorMessage, Formik } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import Services from "../Services";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import { toast } from "react-toastify";
import Loader from "../core/Loader";

function ProjectUsers(props) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const location = useLocation();
  const pathData = useParams();
  const [data, setData] = useState();
  const projectsData = location.state;
  const navigate = useNavigate();
  const [employeeData, setEmployeeData] = useState([]);
  const [projectUsersData, setProjectUsersData] = useState([]);
  const [editUserData, setEditUserData] = useState(false);
  const [name, setName] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [role, setRole] = useState();
  const [showDelete, setShowDelete] = useState();

  const validation = Yup.object().shape({
    name: Yup.object().required("User is required"),
    role: Yup.object().required("Role is required"),
  });
  const columns = [
    {
      title: "S.No",
      width: "5%",
      render: (rowData) => `${rowData?.tableData?.id + 1}`,
    },
    { title: "Name", field: "name" },
    { title: "Role", field: "role" },
    { title: "Updated On", field: "updatedBy" },
    { title: "Updated By", field: "updatedOn" },
  ];

  const editProjectUsers = (values) => {
    setIsLoading(true);
    Services.updateProjectUsers(values, data?.id).then((res) => {
      getprojectusersList();
      setData("");
      setIsLoading(false);
      handleClose();
      toast.success(`Updated ${res?.editedData?.name} details`);
    });
  };
  const createUsers = (values) => {
    setIsLoading(true);
    Services.createProjectUsers(values, pathData)
      .then((res) => {
        setIsLoading(false);
        getprojectusersList();
        handleClose();
        toast.success(`Project ${res?.message}`);
      })
      .catch((err) => {
        if (err.status === 500) {
          toast.error("Failed to Create User.");
          setIsLoading(false);
        } else if (err.status === 400) {
          toast.error("Project User already Exist !");
          setIsLoading(false);
        }
      });
  };
  const getprojectusersList = () => {
    Services.getProjectUsers(pathData?.id).then((res) => {
      const data = res?.data;
      setProjectUsersData(data);
      // setRole(data?.role ? { label: data?.role, value: data?.role } : "");
      // setName(data?.name ? { label: data?.name, value: data?.name } : "");
    });
  };

  const userList = () => {
    Services.AdminDashboardgetList().then((res) => {
      const data = res?.data?.data;
      setEmployeeData(data);
    });
  };

  let date = new Date();
  const currentDate = moment(date).format("DD-MM-YYYY");

  useEffect(() => {
    getprojectusersList();
    userList();
  }, [pathData]);

  const createProjectUser = () => {
    setEditUserData("");
    setData("");
    setShow(true);
  };

  const deleteProjectUser = (values) => {
    setName(values);
    setShowDelete(true);
  };
  const handleCloseDelete = () => {
    setShowDelete(!showDelete);
  };
  const confirmDelete = () => {
    setIsLoading(true);
    const id = name?.id;
    Services.projectUserDelete(id).then((res) => {
      getprojectusersList();
      // setIsLoading(false);
      handleCloseDelete();
      setIsLoading(false);
      toast.success("Project User Deleted Successfully !");
    });
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="m-5">
          <div className="w-100 d-flex justify-content-end mb-3  ">
            <Button
              variant="primary"
              onClick={() => {
                createProjectUser();
              }}
              className="text-center custom-btn-hover "
            >
              Create Project Users
            </Button>
          </div>

          <MaterialTable
            title={pathData?.name}
            icons={tableIcons}
            columns={columns}
            data={projectUsersData}
            actions={[
              (rowData) => ({
                icon: () => (
                  <>
                    {rowData?.role === "customer" ? (
                      ""
                    ) : (
                      <Col
                        className="d-flex nav-font-color me-3"
                        onClick={() => {
                          setShow(true);
                          setEditUserData(true);
                          setData(rowData);
                        }}
                      >
                        <FontAwesomeIcon className="nav-fonts-color nav-font-color" icon={faPen} title="Edit" />
                      </Col>
                    )}
                  </>
                ),
              }),
              (rowData) => ({
                icon: () => (
                  <Col onClick={() => deleteProjectUser(rowData)}>
                    <FontAwesomeIcon
                      className=" ms-2 fs-5 nav-fonts-color nav-font-color"
                      color="#6495ED"
                      size={20}
                      title="Delete"
                      icon={faTrash}
                    />
                  </Col>
                ),
              }),
            ]}
            options={{
              cellStyle: { border: "1px solid #eee", textAlign: "center" },
              addRowPosition: "first",
              actionsColumnIndex: -1,
              headerStyle: {
                backgroundColor: "#14539A",
                color: "whitesmoke",
                textAlign: "center",
                zIndex: 0,
              },
              MuiIconButton: {
                root: {
                  "&:hover": {
                    backgroundColor: "#fff !important",
                  },
                },
              },
            }}
          />
          <Modal size="sm-5" show={show} onHide={handleClose} centered backdrop="static" className="edit">
            <Modal.Header closeButton className="p-4 text-center bg-light text header-text-color renctangeled-5 ">
              <Modal.Title>
                {editUserData ? (
                  <h3 className="text-center nav-font-color">Edit Project User</h3>
                ) : (
                  <h3 className="text-center nav-font-color">Create Project User</h3>
                )}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body className="m-3 mt-2">
              <Formik
                initialValues={{
                  name: data?.name ? { label: data?.name, value: data?.userId } : "",
                  role: data?.role ? { label: data?.role, value: data?.role } : "",
                  updatedby: currentDate,
                  updatedon: localStorage.getItem("role"),
                }}
                validationSchema={validation}
                onSubmit={(values) => {
                  editUserData ? editProjectUsers(values) : createUsers(values);
                }}
              >
                {(formik) => {
                  const { values, handleSubmit, handleBlur, setFieldValue, isValid } = formik;
                  return (
                    <Form onSubmit={handleSubmit}>
                      <Form.Group className="mt-3">
                        <Form.Label className="required mb-0">Select User</Form.Label>
                        <Select
                          type="object"
                          name="name"
                          id="name"
                          options={[
                            {
                              options: employeeData?.map((list) => ({
                                label: `${list?.firstName} ${list?.lastName}   (${list?.role})`,
                                value: list?.id,
                                isDisabled: editUserData ? true : false,
                              })),
                            },
                          ]}
                          value={values.name}
                          onChange={(e) => {
                            setFieldValue("name", e);
                          }}
                          onBlur={handleBlur}
                          placeholder="Select user"
                        />
                        <ErrorMessage name="name" className="error text-danger" component="span" />
                      </Form.Group>
                      <Form.Group className="mt-3">
                        <Form.Label className="required mt-1 mb-0">Role</Form.Label>
                        <Select
                          name="role"
                          type="select"
                          onBlur={handleBlur}
                          value={values.role}
                          placeholder="Select role"
                          onChange={(e) => {
                            setFieldValue("role", e);
                          }}
                          options={[
                            { value: "Admin", label: "Admin" },
                            { value: "Developer", label: "Developer" },
                            { value: "Lead", label: "Lead" },
                            {
                              value: "customer",
                              label: "customer",
                              isDisabled: editUserData ? true : false,
                            },
                          ]}
                        />
                        <ErrorMessage name="role" className="error text-danger" component="span" />
                      </Form.Group>
                      {/* <Form.Group>
                        <Form.Label className="required">Updated By</Form.Label>
                        <Form.Control
                          name="updatedby"
                          id="updatedby"
                          type="date"
                          readOnly={true}
                          // value="2023-01-03"
                          value={values.updatedby}
                          // value={updatedBy.values}
                        />
                      </Form.Group>
                      <Form.Group className="mt-3">
                        <Form.Label className="required">Updated On</Form.Label>
                        <Form.Control
                          type="string"
                          name="updatedon"
                          id="updatedon"
                          readOnly={true}
                          value={values.updatedon}
                        />
                      </Form.Group> */}

                      <div className="mt-4 d-flex justify-content-end">
                        <Button variant="outline-secondary" onClick={handleClose} className="me-3 ml-1 ">
                          Cancel
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
          <Modal show={showDelete} centered onHide={handleCloseDelete} backdrop="static" keyboard={false}>
            <Modal.Header closeButton className="bg-light text header-text-color renctangeled-5">
              <Modal.Title className="modal-div">{name?.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <h4>Are you sure?</h4>
              <p>Do you want to delete {name?.name}</p>
            </Modal.Body>
            <footer className="m-4 d-flex justify-content-end">
              <Button variant="outline-secondary" onClick={handleCloseDelete}>
                Cancel
              </Button>
              <Button className="ms-2" onClick={() => confirmDelete()} variant="primary">
                Delete
              </Button>
            </footer>
          </Modal>
        </div>
      )}
    </>
  );
}

export default ProjectUsers;
