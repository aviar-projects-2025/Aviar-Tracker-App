import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import { tableIcons } from "../core/tableIcons";
import Loader from "../core/Loader";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import { QRCodeCanvas } from "qrcode.react";
import "../css/AdminProjects.scss";

import Services from "../Services";
import { Col, Row } from "react-bootstrap";
function EmployeAttendance() {
  const [data, setData] = useState([]);
  const [name, setName] = useState();
  const navigate = useNavigate();

  // const Capitalize = (str) => {
  //   return str.charAt(0).toUpperCase() + str.slice(1);
  // };
  // const handleCloseDelete = () => {
  //   setShowDelete(!showDelete);
  // };
  const [isLoading, setIsLoading] = useState(false);
  const [showDelete, setShowDelete] = useState();
  const location = useLocation();
  const empName = location.state.data.firstName + " " + location.state.data.lastName;
  const empId = location.state.data.employeeCompanyId;
  const joiningDate = location.state.data.joiningDate;
  const phoneNumber = location.state.data.phoneNumber;
  const email = location.state.data.email;
  // const [ip,setIp]=usestate();
  const status = location.state.data.status;
  const getLogStatus = () => {
    const id = location.state.data.id;
    Services.getLoginStatus(id).then((res) => {
      const data = res?.data;
      setData(data);
    });
  };

  useEffect(() => {
    getLogStatus();
  }, []);

  const deleteProjecStatus = (values) => {
    setName(values);
    setShowDelete(true);
  };

  const columns = [
    {
      title: "S.No",
      width: "5%",
      render: (rowData) => `${rowData?.tableData?.id + 1}`,
    },
    {
      title: "Date",
      field: "date",
      // render: (rowData) => (
      //   // <text className="">{rowData?.projectId?.name} </text>
      // ),
    },
    {
      title: "Login Time",
      field: "loginTime",
      // render: (rowData) => <text className="">{rowData?.status} </text>,
    },
    {
      title: "Ip-Address",
      field: "userIpAddress",
      // render: (rowData) => <text className="">{rowData?.status} </text>,
    },
    {
      title: "Logout Time",
      field: "logoutTime",
      // render: (rowData) => (
      //   <text className="">
      //     {rowData?.createdBy?.firstName}{" "}
      //     {Capitalize(rowData?.createdBy?.lastName)}
      //   </text>
      // ),
    },
    // { title: "Created At", field: "createdAt" },
  ];
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <h3>Employee Details</h3> <hr></hr>
          <div></div>
          <Row className="mt-3 ms-5 me-3">
            <Col>
              <p className="menu-text nav-font-color">
                <text>Employee Name :</text> <span>{empName}</span>
              </p>
              <p className="menu-text nav-font-color">
                <text>Employee Id :</text> <span>{empId}</span>
              </p>
              <p className="menu-text nav-font-color">
                <text>Jonined Date :</text> <span>{moment(joiningDate).format("DD/MM/YYYY")}</span>
              </p>
              <p className="menu-text nav-font-color">
                <text>Phone Number :</text> <span>{phoneNumber}</span>
              </p>
              <p className="menu-text nav-font-color">
                <text>E-mail : </text> <span>{email}</span>
              </p>
              {/* <p className="menu-text nav-font-color">
              <text>Status : </text> <span>{status}</span>
            </p> */}
            </Col>
            <Col>
              <p>Scan QR Code</p>
              <QRCodeCanvas
                className="shadow-lg p-3 m"
                value={`http://aviar-tracker.s3-website.ap-south-1.amazonaws.com/EmployeeId/${location?.state?.data?.id}`}
                // value={`http://localhost:3000/EmployeeId/${location?.state?.data?.id}`}
                onClick={() =>
                  navigate(`/EmployeeId/${location?.state?.data?.id}`, {
                    state: { data: location?.state?.data },
                  })
                }
              />
            </Col>
          </Row>
          <div className="mt-2 p-4">
            <MaterialTable
              title="Employee-Attendance"
              icons={tableIcons}
              columns={columns}
              data={data}
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
            {/* <Modal
            show={showDelete}
            centered
            onHide={handleCloseDelete}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header
              closeButton
              className="bg-light text header-text-color renctangeled-5"
            >
              <Modal.Title className="modal-div">
                {`${name?.projectId?.name}`} status -{" "}
                {`${name?.status}`}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <h4>Are you sure?</h4>
              <p>Do you want to delete {name?.name}</p>
            </Modal.Body>
            <footer className="m-4 d-flex justify-content-end">
              <Button variant="outline-secondary" onClick={handleCloseDelete}>
                Cancel
              </Button>
              <Button
                className="ms-2"
                onClick={() => confirmDelete()}
                variant="primary"
              >
                Delete
              </Button>
            </footer>
          </Modal> */}
          </div>
        </div>
      )}
    </>
  );
}
export default EmployeAttendance;
