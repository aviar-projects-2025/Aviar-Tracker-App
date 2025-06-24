import React from "react";
import { Col, Nav, Row, Tab, Tabs } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Attachment from "./Attachment";
import DefectHistory from "./DefectHistory";
import Defectportal from "./defectportal";
import "../css/defect-details.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { faArrowLeftLong, faCopy } from "@fortawesome/free-solid-svg-icons";

function DefectDatas() {
  const location = useLocation();
  const defectData = location.state.values;
  const data = useParams();
  const navigate = useNavigate();
  return (
    <div className="mx-4 mt-2 mb-5  mb-0">
      <div className="d-flex justify-content-between  mb-1  ">
        <FontAwesomeIcon
          color="#3B71CA"
          size={25}
          style={{ fontSize: "30" }}
          icon={faArrowLeftLong}
          onClick={() => navigate(-1)}
          className="ms-4 mb-2 cursor"
        />
      </div>
      <h5>
        <text className="ticketLink nav-font-color ms-4 mt- ">{defectData?.ticketNo}</text>:
        <text className="mx-2 ticketLink">{defectData?.summary}</text> <br />
      </h5>

      <Tabs className="mb-3 tab-style custom-tabs border mx-4 rounded tab-active  " fill variant="pills">
        <Tab eventKey="general" className="mx-5" title="General">
          <Defectportal defectData={location} />
        </Tab>

        <Tab eventKey="attachments" title="Attachment" className="attachment-tab attachment-table">
          <Attachment defectData={location} />
        </Tab>
        <Tab eventKey="historys" title="History" className="history-tab">
          <DefectHistory data={data} />
        </Tab>
      </Tabs>
    </div>
  );
}

export default DefectDatas;
