import React, { useEffect, useState } from "react";
import { Col, Row, Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Api from "../Config/Api";
import Aviar from "../Components/ClientHeader/aviar.png";
import Navbar from "react-bootstrap/Navbar";
import "../css/defect-details.scss";
import Avatar from "react-avatar";
import NoImage from "../Components/ClientHeader/NoProfile.png";

import moment from "moment";

function EmployeeId() {
  //   const location = useLocation();
  //   const empName = location.state.data.firstName + " " + location.state.data.lastName;
  //   const empId = location.state.data.employeeCompanyId;
  //   const joiningDate = location.state.data.joiningDate;
  //   const phoneNumber = location.state.data.phoneNumber;
  //   const email = location.state.data.email;
  //   const status = location.state.data.status;

  const empId = useParams();
  const [details, setDetails] = useState();
  const [imagePreview, setImagePreview] = useState();
  const getEmployeeDetails = () => {
    Api.get(`/employe/${empId?.id}`).then((res) => {
      const details = res?.data?.data?.getOne;
      if (details.imgUrl) {
        setImagePreview(details?.imgUrl);
      }
      setDetails(details);
      // const joiningDate = location.state.data.joiningDate;
      // const phoneNumber = location.state.data.phoneNumber;
      // const email = location.state.data.email;
      // const status = location.state.data.status;
    });
  };
  // const getEditData = () => {
  //   const userId = localStorage.getItem("userId");
  //   Api.get(`/user/${userId}`).then((res) => {
  //     console.log("resss", res);
  //     const data = res?.data?.data?.getOne;
  //     if (data.imageUrl) {
  //       setImagePreview(data?.imageUrl);
  //     }
  //     setUserData(res?.data?.data?.getOne);
  //   });
  // };
  useEffect(() => {
    getEmployeeDetails();
    // getEditData();
  });

  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home">
            <img alt="" src={Aviar} width="200" height="65" className="d-inline-block align-top" />
          </Navbar.Brand>
        </Container>
      </Navbar>
      <Container
        className="mt-4 shadow-lg p-3 rounded rounded mt-width container-bg-image container-res-bg-image loader"
        fluid
      >
        <h3>Employee Details</h3>
        <hr></hr>
        <Row>
          <Col className="col-12 col-md-8">
            <div className="">
              <Avatar src={imagePreview ? imagePreview : NoImage} size="270" color="silver" className="image-size" />
            </div>
          </Col>
          <Col sm={12} xs={12} md={12} lg={4} className="mt-2 col-6 col-md-4">
            <p className="menu-text">
              Employee Name:
              <span className="menu-textmenu-text nav-font-color">{details?.firstName + " " + details?.lastName}</span>
            </p>
            <p className="menu-text">
              Employee Id:
              <span className="menu-textmenu-text nav-font-color project-status">{details?.employeeCompanyId}</span>
            </p>
            <p className="menu-text">
              Joined Date:
              <span className="menu-textmenu-text nav-font-color">
                {moment(details?.joiningDate).format("DD/MM/YYYY")}
              </span>
            </p>
            <p className="menu-text">
              Phone Number: <span className="menu-textmenu-text nav-font-color">{details?.phoneNumber}</span>
            </p>
            <p className="menu-text">
              E-mail: <span className="menu-textmenu-text nav-font-color">{details?.email}</span>
            </p>
            <p className="menu-text">
              Status: <span className="menu-textmenu-text nav-font-color">{details?.status}</span>
            </p>
          </Col>
          {/* <p>Scan QR Code</p> */}
          {/* <QRCodeCanvas
            value={`http://aviar-tracker.s3-website.ap-south-1.amazonaws.com/EmployeeId/${details.id}`}
            //   value={`http://localhost:3000/EmployeeId/${details?.firstName}/${details?.id}`}
          /> */}
        </Row>
      </Container>

      <div className="footer-bottom clearfix">
        <div className="footer-text">
          &copy; Copyright
          <strong>
            <span> AVIAR Financial Services LLC</span>
          </strong>
          . All Rights Reserved
        </div>
        <div className="footer-text">
          Designed by
          <a href="https://aviartechservices.com/" target="_blank" className="ms-1">
            AVIAR Technology Services
          </a>
        </div>
      </div>
    </div>
  );
}
export default EmployeeId;
