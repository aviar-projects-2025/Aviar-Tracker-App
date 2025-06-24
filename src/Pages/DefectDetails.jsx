import React, { useEffect, useState } from "react";
import { faArrowLeftLong, faCopy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Api from "../Config/Api";
import "../css/defect-details.scss";
import ListGroup from "react-bootstrap/ListGroup";
import { toast } from "react-toastify";
import Stack from "react-bootstrap/Stack";
import Loader from "../core/Loader";
import Accordion from "react-bootstrap/Accordion";
function DefectDetails(props) {
  const location = useLocation();
  const defectID = useParams();
  const defectData = location?.state?.values;
  const [data, setData] = useState();
  const role = localStorage.getItem("role");
  const [isLoading, setIsLoading] = useState();
  const navigate = useNavigate();
  const getDefectDetail = () => {
    setIsLoading(true);
    Api.get(`/defects/detail/get/${defectID?.id}`).then((res) => {
      const data = res?.data?.data?.getOne;
      setData(data);
      setIsLoading(false);
    });
  };
  useEffect(() => {
    getDefectDetail();
  }, []);
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <Container>
          <div className="d-flex justify-content-between mt-5 mb-4 ">
            <FontAwesomeIcon
              color="#3B71CA"
              size={25}
              style={{ fontSize: "30" }}
              icon={faArrowLeftLong}
              onClick={() => navigate(-1)}
              className="ms-3 cursor"
            />
            <h4 className="defect-detail-header">
              {data?.ticketNo} - {data?.defect}
            </h4>
            <Button
              onClick={() => {
                role === "admin"
                  ? navigate(`/defect/${defectData?.defect}/${defectData?.id}`, { state: { values: defectData } })
                  : role === "employee"
                  ? navigate(`/${defectData?.defect}/${defectData?.id}`, {
                      state: { values: defectData },
                    })
                  : navigate(`/edit/${defectData?.defect}/${defectData?.id}`, {
                      state: { values: defectData },
                    });
              }}
              className="me-2 px-4  custom-btn-hover "
            >
              Edit Defect
            </Button>
          </div>
          {/* <div class="container my-4 shadow"> */}
          <Card className="container align-center mb-4">
            <Card.Header className="ticketitle nav-font-color fw-bold cursor mt-3">
              <Stack direction="horizontal" className="d-flex justify-content-between  " gap={3}>
                <div>
                  Ticket No:
                  <label className="cursor ms-1 ">{data?.ticketNo}</label>
                </div>
                <div
                  onClick={() => {
                    navigator?.clipboard?.writeText(window?.location?.href);
                    toast.success("URL copied Successfully!");
                  }}
                >
                  <FontAwesomeIcon icon={faCopy} title="Copy URL" />
                </div>
              </Stack>
            </Card.Header>
            <div class="d-flex justify-content-center row">
              <Container fluid className="mb-4 col-md-6 col-lg-6">
                <div classname="container my-4 shadow">
                  <div className="h-100">
                    <div className="">
                      <Accordion className="mb-4" flush>
                        <Accordion.Item eventKey="0">
                          <Accordion.Header>
                            {" "}
                            <b className="Accordian-font-clr">Summary</b>
                          </Accordion.Header>
                          <Accordion.Body>
                            <label>{data?.summary}</label>
                          </Accordion.Body>
                        </Accordion.Item>
                      </Accordion>
                    </div>
                    <div className="">
                      <Accordion className="mb-4  " flush>
                        <Accordion.Item eventKey="0">
                          <Accordion.Header>
                            <b className="Accordian-font-clr">Priority</b>
                          </Accordion.Header>
                          <Accordion.Body>
                            <label>{data?.priority?.value}</label>
                          </Accordion.Body>
                        </Accordion.Item>
                      </Accordion>
                    </div>
                    <div className="">
                      <Accordion className="mb-4 " flush>
                        <Accordion.Item eventKey="0">
                          <Accordion.Header>
                            <b className="Accordian-font-clr">Status</b>
                          </Accordion.Header>
                          <Accordion.Body>
                            <label>{data?.status?.value ? data?.status?.value : data?.status}</label>
                          </Accordion.Body>
                        </Accordion.Item>
                      </Accordion>
                    </div>
                    <div className="">
                      <Accordion flush>
                        <Accordion.Item eventKey="0">
                          <Accordion.Header>
                            {" "}
                            <b className="Accordian-font-clr">Description</b>
                          </Accordion.Header>
                          <Accordion.Body>
                            <label>{data?.description}</label>
                          </Accordion.Body>
                        </Accordion.Item>
                      </Accordion>
                    </div>
                  </div>
                </div>
              </Container>
              <Container fluid className="mb-4 accordion-collapse col-md-6 col-lg-6">
                <div className="">
                  <Accordion className="mb-4  " flush>
                    <Accordion.Item eventKey="0">
                      <Accordion.Header>
                        <b className="Accordian-font-clr"> Actual Result</b>
                      </Accordion.Header>
                      <Accordion.Body>
                        <label>{data?.actualResult}</label>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </div>
                <div className="">
                  <Accordion className="mb-4 " flush>
                    <Accordion.Item eventKey="0">
                      <Accordion.Header>
                        <b className="Accordian-font-clr ">Expected Result</b>
                      </Accordion.Header>
                      <Accordion.Body>
                        <label>{data?.expectedResult}</label>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </div>
                <div>
                  <Accordion flush>
                    <Accordion.Item eventKey="0">
                      <Accordion.Header>
                        <b className="Accordian-font-clr">Type of Defect</b>
                      </Accordion.Header>
                      <Accordion.Body>
                        <label>{data?.typeOfDefect}</label>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </div>
              </Container>
            </div>
            <div>
              <Container>
                <Accordion className="mb-4 px-3 " flush>
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>
                      <b className="Accordian-font-clr">Attachments</b>
                    </Accordion.Header>
                    <Accordion.Body>
                      <label>
                        <text className="fw-bold">Show Image</text>
                      </label>
                      <Col>
                        <Card.Img
                          expand="top"
                          src={data?.errorFile}
                          width={400}
                          height={350}
                          className="px-5 mt-0   px-4 mb-0"
                        />
                      </Col>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </Container>
            </div>
          </Card>
        </Container>
      )}
    </>
  );
}
export default DefectDetails;









