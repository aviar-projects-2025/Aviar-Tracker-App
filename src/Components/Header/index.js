import React, { useEffect, useState } from "react";
import { Container, Nav, Button, Modal } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import { Link, useNavigate } from "react-router-dom";
import Aviar from "./aviar.png";
import NavDropdown from "react-bootstrap/NavDropdown";
import Avatar from "react-avatar";
import { toast } from "react-toastify";

function Header() {
  const firstName = localStorage.getItem("firstName");
  const Capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  const lastName = localStorage.getItem("lastName");
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [closeDrop, setCloseDrop] = useState(false)
  const handleClose = () => setShow(false);
  const role = localStorage.getItem("role");
  const confirmLogout = () => {
    const id = localStorage.getItem("role");
    localStorage.clear(navigate("/"));
    toast.success("logged out Successfully!");
  };

  return (
    <Navbar bg="light" expand="lg" className="mx-auto">
      <Container fluid className="mx-4">
        <Link to={"/admin/dashboard"}>
          <img alt="" src={Aviar} width="200" height="65" className="d-inline-block align-top" />
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className="">
          {role === "admin" ? (
            <div className="navbarAdmin" style={{

            }}>
              <Link to={"/admin/dashboard"} className="nav-link text-body text-decoration-none adminalignRight menu-text nav-font-color">
                Users
              </Link>
              <Link to={"/project/list"} className=" nav-link text-body text-decoration-none adminalignRight menu-text nav-font-color">
                Projects
              </Link>
              <Link to={"/project/defects"} className=" nav-link text-body text-decoration-none adminalignRight menu-text nav-font-color">
                Defects
              </Link>
              <Link to={"/project/statuses"} className=" nav-link text-body text-decoration-none adminalignRight menu-text nav-font-color">
                Project Status
              </Link>
            </div>
          ) : (
            ""
          )}
          <Nav className="me-auto w-100 d-flex justify-content-end">
            <NavDropdown
              className="drop adminalignRight"
              align="end"
              title={<Avatar name={`${firstName} ${lastName}`} size="40" color="silver" round={true}  onClick={()=>{setCloseDrop(true)}}/>}
              id="basic-nav-dropdown"
              show={closeDrop}
            >
              <div className="logoutModal">
                <Link
                  to={"/edit/screen"}
                  className="text-decoration-none w-100  text-center hoverclr p-2"
                  onClick={()=>{setCloseDrop(false)}}
                >
                  Edit Profile{" "}
                </Link>
                <Link
                  className="text-decoration-none  w-100  text-center hoverclr p-2"
                  onClick={() => {
                    setShow(true);
                    setCloseDrop(false)
                  }}
                >
                  Logout
                </Link>
              </div>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
      <Modal show={show} centered onHide={handleClose} backdrop="static" keyboard={false} className="modal-background">
        <Modal.Header closeButton className="bg-light text header-text-color renctangeled-5">
          <Modal.Title className="modal-div">
            {/* {firstName} {Capitalize(lastName)} */}
            Logout
          </Modal.Title>
        </Modal.Header>
        <Modal.Body classnNmae="">
          <h4>Are you sure?</h4>
          <p>You want to logout ? </p>
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

export default Header;
