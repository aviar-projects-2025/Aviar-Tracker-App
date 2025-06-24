import React from "react";
import { Container, Spinner } from "react-bootstrap";

function Loader() {
  return (
    <>
      <div className="bouncing-loader loader-center">
        <div></div>
        <div></div>
        <div></div>
      </div>
      {/* <Container className="loader-center">
        <Spinner animation="grow" variant="primary" />
        <Spinner
          animation="grow"
          variant="secondary"
          className="mx-2"
          style={{ width: "25px", height: "25px" }}
          size="md"
        />
        <Spinner animation="grow" variant="success" size="sm" />
        <span>
          <h4 style={{ paddingLeft: 20 }}>Loading...</h4>
        </span>
      </Container> */}
    </>
  );
}

export default Loader;

