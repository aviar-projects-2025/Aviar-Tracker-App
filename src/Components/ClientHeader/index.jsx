import React, { useEffect, useState } from "react";
import { Container, Nav, Button, Modal } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link, useNavigate } from "react-router-dom";
import Aviar from "./aviar.png";
import Avatar from "react-avatar";
import { toast } from "react-toastify";
import "../../css/defect-details.scss";
import profile from "../../Components/ClientHeader/NoProfile.png";
import Api from "../../Config/Api";

function ClientHeader() {
  const firstName = localStorage.getItem("firstName");
  const lastName = localStorage.getItem("lastName");
  const role = localStorage.getItem("role");
  const [show, setShow] = useState(false);
  const [userData, setUserData] = useState();
  const [imagePreview, setImagePreview] = useState();

  const handleClose = () => setShow(false);
  const Capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  const navigate = useNavigate();
  const confirmLogout = () => {
    const id = localStorage.getItem("role");
    localStorage.clear(navigate("/"));
    toast.success("logged out Successfully!");
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

  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand href="#home">
          <img alt="" src={Aviar} width="200" height="65" className="d-inline-block align-top" />
        </Navbar.Brand>
        {role === "customer" ? <Navbar.Toggle aria-controls="basic-navbar-nav" /> : null}
        {role === "customer" ? (
          <Navbar.Collapse className="">
            <Nav className="me">
              <Nav.Link href="/project/defects/list" className="alignRight menu-text nav-font-color">
                Home
              </Nav.Link>
            </Nav>
            <Nav className="me-auto w-100 d-flex justify-content-end">
              <NavDropdown
                className="drop alignRight"
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
                  href="/edit"
                  height="10"
                  width="45"
                  className="navbar-dropdown nav-font-color menu-text"
                >
                  Edit Profile
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
        ) : null}
      </Container>
      <Modal show={show} centered onHide={handleClose} backdrop="static" keyboard={false} className="modal-background">
        <Modal.Header closeButton className="bg-light text header-text-color renctangeled-5">
          <Modal.Title className="modal-div">
            {firstName} {Capitalize(lastName)}{" "}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body classnNmae="">
          <h4>Are you sure?</h4>
          <p> You want to logout ? </p>
        </Modal.Body>
        <div className="m-4 d-flex justify-content-end">
          <Button className="w-25 mx-2" variant="outline-secondary" onClick={handleClose}>
            No
          </Button>
          <Button className="ms-2 mx-2 w-25" onClick={() => confirmLogout()} variant="primary">
            Yes
          </Button>
        </div>
      </Modal>
    </Navbar>
  );
}

export default ClientHeader;
