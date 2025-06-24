import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import Aviar from "../../Components/ClientHeader/aviar.png";

function PasswordHeader() {
  const location = useLocation();
  const path = location.pathname;
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#home">
          <img
            alt=""
            src={Aviar}
            width="200"
            height="65"
            className="d-inline-block align-top"
          />
        </Navbar.Brand>
        <Nav className="me">
          {path === "/login" ? null : (
            <Nav.Link
              href="/"
              className="text-body adminalignRight menu-text nav-font-color font-size "
            ></Nav.Link>
          )}
        </Nav>

        <Nav className="me">
          {path === "/login" ? null : (
            <Nav.Link
              href="/"
              className="text-body adminalignRight menu-text nav-font-color font-size "
            >
              Login
            </Nav.Link>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}

export default PasswordHeader;
