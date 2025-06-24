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
        <Navbar.Brand href="#home">
          <img alt="" src={Aviar} width="200" height="65" className="d-inline-block align-top" />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse className="">
          {role === "admin" ? (
            <Nav className="me">
              <Nav.Link href="/admin/dashboard" className="text-body adminalignRight menu-text nav-font-color">
                Users
              </Nav.Link>
              <Nav.Link href="/project/list" className="text-body adminalignRight menu-text nav-font-color">
                Projects
              </Nav.Link>
              {/* <Nav.Link href="/products" className="text-body adminalignRight menu-text nav-font-color">
              Products
            </Nav.Link> */}
              <Nav.Link href="/project/defects" className="text-body adminalignRight menu-text nav-font-color">
                Defects
              </Nav.Link>
              <Nav.Link
                href="/project/statuses"
                className="text-body adminalignRight menu-text nav-font-color project-status"
              >
                Project Status
              </Nav.Link>
            </Nav>
          ) : (
            ""
          )}
          <Nav className="me-auto w-100 d-flex justify-content-end">
            <NavDropdown
              className="drop adminalignRight"
              align="end"
              title={<Avatar name={`${firstName} ${lastName}`} size="50" color="silver" round={true} />}
              id="basic-nav-dropdown"
            >
              <NavDropdown.Item
                href="/edit/screen"
                height="10"
                width="45"
                className="navbar-dropdown edit-profile nav-font-color menu-text"
              >
                Edit Profile{" "}
              </NavDropdown.Item>
              <hr />
              <NavDropdown.Item
                onClick={() => {
                  setShow(true);
                }}
                className="navbar-dropdown nav-font-color edit-profile menu-text "
              >
                Logout
              </NavDropdown.Item>
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
