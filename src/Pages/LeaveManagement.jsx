import { faDeleteLeft, faEllipsisV, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MaterialTable from "material-table";
import React, { useEffect, useState } from "react";
import { ErrorMessage, Formik } from "formik";
import * as Yup from "yup";
import { Button, Card, Dropdown, Modal, Container, Row, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { tableIcons } from "../core/tableIcons";
import Api from "../Config/Api";
import moment from "moment";
import Services from "../Services";
import { toast } from "react-toastify";
import "../css/AdminProjects.scss";
function LeaveManagement() {
  const [role, setRole] = useState("");
  const [open, setOpen] = useState(false);
  const [empId, setEmpId] = useState("");
  const handleOpenClose = () => setOpen(false);
  const [declineShow, setDeclineShow] = useState(false);
  const handleDeclineshow = () => setDeclineShow(true);
  const handleDeclineClose = () => setDeclineShow(false);
  const [leaveData, setLeaveData] = useState([]);
  const columns = [
    {
      title: "S.No",
      field: "sNo",
      width: "4%",
      render: (rowData) => `${rowData?.tableData?.id + 1}`,
    },
    { title: "Employee Id", field: "employeeId.employeeCompanyId" },
    { title: "Employee Name", field: "employeeId.firstName" },
    { title: "Reason", field: "remarks" },
    { title: "Leave Date", render: (rowData) => `${moment(rowData?.date).format("DD-MM-YYYY")}` },
    { title: "Apply Date", render: (rowData) => `${moment(rowData?.tableData?.date).format("DD-MM-YYYY")}` },
    { title: "Status", field: "status" },
  ];
  const validation = Yup.object().shape({
    description: Yup.string().required("Description is required"),
  });
  const getAllLeave = () => {
    Api.get("/employee/leave/get/all").then((res) => {
      setLeaveData(res.data.leaveData);
    });
  };
  const approveStatus = () => {
    const employeeid = empId;
    const status = "Approved";
    const reason = "Leave Approved.";
    const datas = { status, employeeid, reason };
    Services.updateLeaveStatus(datas).then((res) => {
      setOpen(false);
      getAllLeave();
      toast.success("Leave Approved Successfully!");
    });
  };
  const declineStatus = (values) => {
    const employeeid = empId;
    const status = "Declined";
    const reason = values.description;
    const datas = { status, employeeid, reason };
    Services.updateLeaveStatus(datas).then((res) => {
      setDeclineShow(false);
      getAllLeave();
      toast.success("Leave Declined!");
    });
  };
  useEffect(() => {
    let role = localStorage.getItem("role");
    setRole(role);
    getAllLeave();
  }, []);
  return (
    <Container className="mt-5 mt-width mb-2" fluid>
      <MaterialTable
        title="Leave Management"
        icons={tableIcons}
        columns={columns}
        data={leaveData}
        actions={[
          (rowData) => ({
            icon: () => (
              <div>
                <Dropdown>
                  <Dropdown.Toggle className=" icon-size ">
                    <FontAwesomeIcon icon={faEllipsisV} />
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item className="navbar-dropdown  menu-text">
                      <div className="nav-font-color" onClick={() => setOpen(true)}>
                        Approve
                      </div>
                    </Dropdown.Item>
                    <hr />
                    <Dropdown.Item className="navbar-dropdown  menu-text">
                      <div className="nav-font-color" onClick={() => setDeclineShow(true)}>
                        Decline
                      </div>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            ),
            onClick: () => {
              setEmpId(rowData._id);
            },
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
            padding: 16,
            width: "100%",
          },
        }}
      />
      <Modal show={open} centered onHide={handleOpenClose} backdrop="static">
        <Modal.Header closeButton className="bg-light text header-text-color renctangeled-5">
          <Modal.Title className="modal-div">Approve</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Are you sure?</h4>
          <p>Do you want to Approve Leave </p>
        </Modal.Body>
        <div className="m-4 d-flex justify-content-end">
          <Button
            variant="outline-secondary px-5"
            onClick={() => {
              setOpen(false);
            }}
          >
            No
          </Button>
          <Button className="ms-2" onClick={() => approveStatus()}>
            Yes, Approve
          </Button>
        </div>
      </Modal>
      <Modal show={declineShow} centered onHide={handleDeclineClose} backdrop="static">
        <Modal.Header closeButton className="bg-light text header-text-color renctangeled-5">
          <Modal.Title className="modal-div">Decline</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={{
              description: "",
            }}
            validationSchema={validation}
            onSubmit={(values) => {
              declineStatus(values);
            }}
          >
            {(formik) => {
              const { values, handleSubmit, handleBlur, handleChange } = formik;
              return (
                <Form className="" onSubmit={handleSubmit}>
                  <Row>
                    <p className="text-danger mt-2">
                      <b>Note : </b> Update The Reason for Decline Leave
                    </p>
                    <Form.Group className="mt-0">
                      <Form.Control
                        as="textarea"
                        name="description"
                        type="text"
                        value={values.description}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        rows={3}
                      />
                    </Form.Group>
                    <ErrorMessage component="span" name="description" className="text-danger" />
                  </Row>
                  <div className="mt-3 d-flex justify-content-end">
                    <Button
                      variant="outline-secondary"
                      onClick={() => {
                        setDeclineShow(false);
                      }}
                    >
                      Cancel
                    </Button>
                    <Button variant="primary" className="ms-2" type="submit">
                      Submit
                    </Button>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </Modal.Body>
      </Modal>
    </Container>
  );
}
export default LeaveManagement;
