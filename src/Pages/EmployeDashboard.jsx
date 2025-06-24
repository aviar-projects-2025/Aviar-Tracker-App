import MaterialTable from "material-table";
import React, { useEffect, useState } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { toast } from "react-toastify";
import Header from "../Components/Header";
import { tableIcons } from "../../src/core/tableIcons";
import Sidebar from "../Components/Sidebar";
import Api from "../Config/Api";
import Services from "../Services";
// import Loader from "../Loader";

function EmployeeDashboard(props) {
  const [show, setShow] = useState(false);
  const [userData, setUserData] = useState([]);
  const [isLoding, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const columns = [
    {
      title: "S.No",
      width: "10%",
      render: (rowData) => `${rowData?.tableData?.id + 1}`,
    },
    {
      title: "Designation",
      field: "employeeId",
      // render: (rowData) => (
      //   <div className="linkColor">
      //     <u>
      //       <text>{`${rowData.firstName} ${rowData.lastName}`}</text>
      //     </u>
      //   </div>
      // ),
    },
    // {
    //   title: "Employee Id",
    //   field: "employeeId",
    // },
    {
      title: "LogIn Date",
      field: "loginDate",
      render: (rowData) => (
        <div className="linkColor">
          <u>
            <text>{rowData.loginDate}</text>
          </u>
        </div>
      ),
    },
    { title: "LogIn Time", field: "loginTime" },
    // { title: "Logout Time", field: "logoutTime" },
  ];

  const createEmployeeAttendance = () => {
    const id = localStorage.getItem("employeeId");
    const currentDate = moment().format("L");
    const currentTime = moment().format("h:mm A");
    const values = { employeeId: id, loginDate: currentDate, loginTime: currentTime };
    Services.createEmployeeAttendance(values).then((res) => {
      getEmployeeAttendance();
      setShow(false);
    });
    // Api.post("api/v1/employee/create", {
    //   employeeId: id,
    //   loginDate: currentDate,
    //   loginTime: currentTime,
    // }).then((res) => {
    //   getEmployeeAttendance();
    //   setShow(false);
    // });
  };

  const getEmployeeAttendance = () => {
    const employeeId = localStorage.getItem("employeeId");
    Services.getEmployeeAttendance(employeeId).then((res) => {
    });
    // Api.get(`/api/v1/employee/get/${employeeId}`).then((res) => {
    //   const userData = res.data.data;
    //   setUserData(userData);
    // });
  };

  const getUserDetails = () => {
    const userId = localStorage.getItem("employeeId");
    Services.getUserDetails(userId).then((res) => {

      const data = res?.data?.getOne;
      setUserData(data);
      setIsLoading(false);
    });
    // Api.get(`api/v1/employe/${userId}`).then((response) => {
    //   const userData = response.data.data.getOne;
    //   setUserData(userData);
    //   setIsLoading(false);
    // });
  };

  // const onChangeFormat = (props) => {
  //   const id = localStorage.getItem("employeeId");
  //   const currentDate = moment().format("L");
  //   const currentTime = moment().format("h:mm A");
  //   Api.patch(`api/v1/employe/update/time/format`, {
  //     id: id,
  //     loginTime: currentTime,
  //     loginDate: currentDate,
  //   }).then((res) => {
  //     setShow(false);
  //     toast.success("Login In time updated successfully");
  //   });
  // };

  const currentDate = moment().format("L");
  const currentTime = moment().format("h:mm A");

  useEffect(() => {
    getUserDetails();
    getEmployeeAttendance();
  }, []);

  return (
    <div>
      {/* {isLoding ? <Loader/> : ( */}
      {/* <Sidebar /> */}
      <div>
        <div className="d-flex justify-content-end mx-5">
          <Button
            onClick={() => {
              navigate("/employee/Leave");
            }}
          >
            Apply Leave
          </Button>
          <Button className="mx-4 button-style-signup" onClick={() => setShow(true)}>
            +Add Attendance
          </Button>
        </div>
        <div className="mt-3 mx-5">
          <MaterialTable
            title="Employee Attendance"
            icons={tableIcons}
            columns={columns}
            data={userData}
            options={{
              cellStyle: { border: "1px solid #eee",textAlign:"center" },
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
        </div>
        <div>
          <Modal className="modal-show" show={show} backdrop="static">
            <Modal.Header className="d-flex justify-content-center header-text-color" style={{ borderBottom: 0 }}>
              <h2>Today's Attendance</h2>
            </Modal.Header>
            <Modal.Body>
              <div>
                <h6 className="d-flex justify-content-center">Are you sure want to submit your today Attendance!</h6>
                <div>
                  <p className="d-flex justify-content-center">{`Date: ( ${currentDate} )`}</p>
                  <p className="d-flex justify-content-center">{`LogIn Time: ( ${currentTime} )`}</p>
                </div>
              </div>
              <div className="button-two-div d-flex justify-content-center">
                <Button
                  className="mx-2"
                  variant="outline-secondary"
                  onClick={() => {
                    setShow(false);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  onClick={() => {
                    // onChangeFormat();
                    createEmployeeAttendance();
                  }}
                >
                  Submit
                </Button>
              </div>
            </Modal.Body>
          </Modal>
        </div>{" "}
      </div>
      {/* )} */}
    </div>
  );
}

export default EmployeeDashboard;
