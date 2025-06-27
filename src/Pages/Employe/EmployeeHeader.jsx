import React, { useEffect, useState } from "react";
import { Container, Nav, Button, Modal, Col } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link, useNavigate } from "react-router-dom";
import Aviar from "../../Components/ClientHeader/aviar.png";
import Avatar from "react-avatar";
import "../../css/defect-details.scss";
import Services from "../../Services";
import moment from "moment";
import { toast } from "react-toastify";
import Api from "../../Config/Api";
import Loader from "../../core/Loader";
import profile from "../../Components/ClientHeader/NoProfile.png";
import { QRCodeCanvas } from "qrcode.react";
function EmployeHeader() {
  const firstName = localStorage.getItem("firstName");
  const [imagePreview, setImagePreview] = useState();
  const [userData, setUserData] = useState();
  const [show, setShow] = useState(false);
  const [logoutshow, setLogoutShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const handleClose = () => [setShow(false), setLogoutShow(false)];
  const handleCloseQr = () => [setQrModal(false)];
  const lastName = localStorage.getItem("lastName");
  const [empId, setEmpId] = useState('')
  const [qrImage, setQrImage] = useState('')
  const [qrModal, setQrModal] = useState(false)


  const navigate = useNavigate();
  const Capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  const confirmlogout = () => {
    localStorage.clear(navigate("/"));
    toast.success("logged out Successfully!");
  };
  const updateLogStatus = () => {
    const day = new Date();
    const date = moment(day).format("DD-MM-YYYY");
    const logoutTime = moment(day).format("h:mma");
    const status = "inActive";
    const userId = localStorage.getItem("userId");
    const datas = { date, logoutTime, status, userId };
    Services.updateLoginStatus(datas)
      .then((res) => {
        const id = localStorage.getItem("role");
        localStorage.clear(navigate("/"));
        toast.success("logged out Time Updated!");
      })
      .catch((err) => {
        toast.error("logintime not updated");
      });
  };

  const handleQrClick = () => {
    // setQrImage()
    setQrModal(true)
  }


  const getEditData = () => {
    setIsLoading(true);
    const userId = localStorage.getItem("userId");
    // setEmpId(userId)
    Api.get(`/user/${userId}`).then((res) => {
      setIsLoading(false);
      const data = res?.data?.data?.getOne;
      if (data.imgUrl) {
        setImagePreview(data?.imgUrl);
      }
      setUserData(res?.data?.data?.getOne);
    });
  };
  useEffect(() => {
    getEditData();
    const userId = localStorage.getItem("userId");
    setEmpId(userId)
  }, []);
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#home">
          <img alt="" src={Aviar} width="200" height="65" className="d-inline-block align-top" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className="employeealignRight">
          <Nav className="me">
            <Nav.Link href="/employee/dashboard" className="alignRight menu-text nav-font-color ">
              Home
            </Nav.Link>
          </Nav>
          <Nav className="me">
            <Nav.Link href="/project" className="alignRight menu-text nav-font-color ">
              Projects
            </Nav.Link>
          </Nav>
          <Nav className="w-100 me-2 d-flex justify-content-end" style={{ marginTop: -10 }} onClick={() => { handleQrClick() }}>
            <div style={{
              width: 100,
              height: 60,
              position: 'relative'
            }}>

              <QRCodeCanvas
                className="shadow-lg qrImageStyle"
                value={`http://aviar-tracker.s3-website.ap-south-1.amazonaws.com/EmployeeId/${empId}`}
              //   value={`http://localhost:3000/EmployeeId/${empId}`}
              />

            </div>
          </Nav>
          <Nav className="me-auto  d-flex justify-content-end border">
            <NavDropdown
              className="drop"
              align="end"
              title={
                imagePreview ? (
                  <Avatar src={imagePreview} size="65" round={true} color="silver" className="image-size" />
                ) : (
                  <Avatar src={profile} size="65" round={true} color="silver" className="image-size" />
                )
              }
              id="basic-nav-dropdown"
            >
              <NavDropdown.Item
                href="/edit/profile"
                height="10"
                width="45"
                className="navbar-dropdown nav-font-color menu-text"
              >
                Edit Profile{" "}
              </NavDropdown.Item>
              <hr />
              <NavDropdown.Item
                onClick={() => {
                  setShow(true);
                }}
                className="navbar-dropdown nav-font-color menu-text"
              >
                Logout
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
      <Modal
        show={show}
        centered
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        className="modal-background edit"
      >
        <Modal.Header closeButton className="bg-light text header-text-color renctangeled-5">
          <Modal.Title className="modal-div">
            {/* {firstName} {Capitalize(lastName)} */}
            Logout
          </Modal.Title>
        </Modal.Header>
        <Modal.Body classnNmae="">
          <h4>Are you sure?</h4>
          <p>You want to Logout ? </p>
        </Modal.Body>
        <div className="m-4 d-flex justify-content-end">
          <Button md={2} lg={4} className="mx-1" onClick={() => setLogoutShow(true)} variant="primary">
            Attendance Logout
          </Button>
          <Button className=" mx-1" variant="outline-secondary" onClick={handleClose}>
            No
          </Button>
          <Button className="mx-1" onClick={() => confirmlogout()} variant="primary">
            Yes
          </Button>
          <Modal show={logoutshow} centered onHide={handleClose} backdrop="static" keyboard={false} className="edit">
            <Modal.Header closeButton className="bg-light text header-text-color renctangeled-5">
              <Modal.Title className="modal-div">
                {/* {firstName} {Capitalize(lastName)} */}
                Attendance Logout
              </Modal.Title>
            </Modal.Header>
            <Modal.Body classNmae="">
              <h4>Are you sure?</h4>
              <p> You want to Logout a Day ? </p>
            </Modal.Body>
            <div className="m-4 d-flex justify-content-end">
              <Button className="w-25 mx-2" variant="outline-secondary" onClick={handleClose}>
                No
              </Button>
              <Button className="ms-2 mx-2 w-25" onClick={() => updateLogStatus()} variant="primary">
                Yes
              </Button>
            </div>
          </Modal>
        </div>
      </Modal>
      <Modal
        show={qrModal}
        centered
        onHide={handleCloseQr}
        // backdrop="static"
        // keyboard={false}
        // className="modal-background edit"
      >
        <div className="d-flex justify-content-center align-items-center"> 
          <QRCodeCanvas
            className="shadow-lg "
            style={{
              width:300,
              height:300,
            }}
            value={`http://aviar-tracker.s3-website.ap-south-1.amazonaws.com/EmployeeId/${empId}`}

          />
        </div>

      </Modal>
    </Navbar>
  );
}
export default EmployeHeader;
