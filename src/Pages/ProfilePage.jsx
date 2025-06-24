import React from "react";
import Avatar from "react-avatar";
import { Card, Col, Row } from "react-bootstrap";
import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import { stateToHTML } from "draft-js-export-html";
// import Header from "../Header";
// import nonImg from "../EmployeeProfile/nonImg.png";

function ProfileView(props) {
  //   const userData = props.location.state.details;
  // const contentState = convertFromRaw(JSON.parse(userData.description));
  // const editorState = EditorState.createWithContent(contentState);

  //   const convertFromJSONToHTML = (value) => {
  //     try {
  //       return { __html: stateToHTML(convertFromRaw(JSON.parse(value))) };
  //     } catch (exp) {
  //       return { __html: "Error" };
  //     }
  //   };
  return (
    <div>
      {/* <Header /> */}
      {/* <div className="profile-main">
        <div className="profile-sec-div form-div">
          <Card className="profile-card">
            <div className="d-flex">
              <Col className="profile-col-one">
                <Avatar
                  className="avatar-div-profile"
                  round
                
                  // src={userData.imgUrl ? userData.imgUrl : nonImg}
                  alt=""
                />
              </Col>
              <Col className="profile-col-two">
                <div>
                  <h5>Name:</h5>
                  {/* <p>{`${userData.firstName + " " + userData.lastName}`}</p> */}
      <h5>Email: </h5>
      {/* <p>{userData.email}</p> */}
      <h5>Phone Number:</h5>
      {/* <p>{userData.phoneNumber}</p> */}
      {/* {userData.description ? ( */}
      {/* <div>
                    <h5>Description:</h5>
                    <p
                    // dangerouslySetInnerHTML={convertFromJSONToHTML(
                    //   userData.description
                    // )}
                    ></p>{" "}
                  </div> */}
      {/* ) : null} */}
      {/* </div>
              </Col>
            </div>
          </Card>
        </div> */}
      <div>
        <Card className="profile-div">
          <Row>
            <Col>
              <Avatar round className=" me-3" size="130" />
            </Col>
            <Col className="profile-details">
              <div>
                <h5>Name:</h5>
                <h5>Email: </h5>
                <h5>Phone Number:</h5>
                <h5>Description:</h5>
              </div>
            </Col>
          </Row>
        </Card>
      </div>
    </div>
  );
}

export default ProfileView;
