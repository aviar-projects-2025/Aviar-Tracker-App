import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import { tableIcons } from "../core/tableIcons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Button, Col, Modal, Container, Card, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import Loader from "../core/Loader";
import "../css/AdminProjects.scss";
import Services from "../Services";
import { Dropdown } from "react-bootstrap";

function ProjectStatuses() {
  const [data, setData] = useState([]);
  const [showDelete, setShowDelete] = useState(false);
  const [name, setName] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [hover, setHover] = useState(null);
  const [viewChange, setViewChange] = useState('Grid')

  const Capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  const handleCloseDelete = () => setShowDelete(false);

  const getprojStatus = () => {
    Services.getProjectStatus().then((res) => {
      setData(res?.data || []);
    });
  };

  useEffect(() => {
    getprojStatus();
  }, []);

  const confirmDelete = () => {
    const id = name?.id;
    Services.projectStatusDelete(id).then(() => {
      getprojStatus();
      handleCloseDelete();
      toast.success("Project Status Deleted Successfully!");
    });
  };

  const deleteProjecStatus = (values) => {
    setName(values);
    setShowDelete(true);
  };

  const columns = [
    {
      title: "S.No",
      width: "5%",
      render: (rowData) => `${rowData?.tableData?.id + 1}`,
    },
    {
      title: "Project Name",
      field: "projectName",
      render: (rowData) => <span>{rowData?.projectId?.name}</span>,
    },
    {
      title: "Project Status",
      field: "projectStatus",
      render: (rowData) => <span>{rowData?.status}</span>,
    },
    {
      title: "Created By",
      field: "createdBy",
      render: (rowData) => (
        <span>
          {rowData?.createdBy?.firstName} {Capitalize(rowData?.createdBy?.lastName)}
        </span>
      ),
    },
    { title: "Created At", field: "createdAt" },
  ];

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <div className=" px-5 mt-3 d-flex justify-content-between align-items-center">
            <h3>Project Status</h3>
            <select
              className="dropDownStyle"
              value={viewChange}
              onChange={(e) => setViewChange(e.target.value)}>
              <option value="Grid">Grid View</option>
              <option value="List">List View</option>
            </select>
          </div>
          {viewChange === "Grid" &&
            <Container className="mt-5 mb-4" fluid>
              <Row className="g-3 m-3">
                {data.map((val, index) => (
                  <Col
                    lg={3}
                    md={6}
                    sm={12}
                    key={index}
                    onMouseEnter={() => setHover(index)}
                    onMouseLeave={() => setHover(null)}
                  >
                    <Card className="shadow-sm rounded boxhover cardContainer">
                      <div className="p-3">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                          <div
                            className="d-flex justify-content-center align-items-center"
                            style={{
                              background: 'gray',
                              width: 43,
                              height: 43,
                              borderRadius: '50%',
                            }}
                          >
                            <div
                              style={{
                                background: 'white',
                                width: 40,
                                height: 40,
                                borderRadius: '50%',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                fontSize: 12,
                              }}
                            >
                              0%
                            </div>
                          </div>
                          {/* <div className="me-2" onClick={() => {
                          setEllipse(true)
                        }}>
                          <FontAwesomeIcon icon={faEllipsisVertical} />
                        </div> */}
                          <Dropdown align="end">
                            <Dropdown.Toggle variant="light" size="sm" className="border-0 p-0">
                              <FontAwesomeIcon icon={faEllipsisVertical} />
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                              <Dropdown.Item onClick={'onEdit'}>Edit</Dropdown.Item>
                              <Dropdown.Item onClick={'onDelete'}>Delete</Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </div>

                        <h5 className="fw-semibold">{val?.projectId?.name}</h5>
                        <p className="text-muted">Aviar</p>
                        <div
                          className="mt-3"
                          style={{
                            fontSize: 10,
                            border: '1px solid green',
                            borderRadius: 4,
                            padding: '2px 6px',
                            color: 'green',
                            width: 'fit-content',
                          }}
                        >
                          Open
                        </div>
                        <div className="d-flex mt-4 ms-2">
                          {[1, 2].map((_, i) => (
                            <div
                              key={i}
                              style={{
                                border: '1px solid rgb(139, 139, 139)',
                                borderRadius: '50%',
                                background: 'rgb(231, 231, 231)',
                                height: 35,
                                width: 35,
                                display: 'flex',
                                marginLeft: -10,
                                justifyContent: 'center',
                                alignItems: 'center',
                                fontSize: 15,
                              }}
                            >
                              AA
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Slide-up content on hover */}
                      <div className={`bottomSlide ${hover === index ? 'show' : ''}`}>
                        <p className="mb-1">Created by: {val?.createdBy?.firstName}</p>
                        <p className="mb-0">Created at: {val?.createdAt}</p>
                      </div>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Container>
          }
          {viewChange === "List" &&
            <Container className="mt-4" fluid>
              <MaterialTable
                title="Project-Status"
                icons={tableIcons}
                columns={columns}
                data={data}
                actions={[
                  (rowData) => ({
                    icon: () => (
                      <FontAwesomeIcon
                        className="ms-2 fs-5 nav-fonts-color"
                        color="#6495ED"
                        size="lg"
                        title="Delete"
                        icon={faTrash}
                        onClick={() => deleteProjecStatus(rowData)}
                      />
                    ),
                  }),
                ]}
                options={{
                  cellStyle: { border: "1px solid #eee", textAlign: "center" },
                  addRowPosition: "first",
                  actionsColumnIndex: -1,
                  pageSizeOptions: [5, 10, 20, 50],
                  pageSize: 5,
                  headerStyle: {
                    backgroundColor: "#14539A",
                    color: "whitesmoke",
                    textAlign: "center",
                  },
                }}
              />

              <Modal show={showDelete} centered onHide={handleCloseDelete} backdrop="static" keyboard={false}>
                <Modal.Header closeButton className="bg-light text header-text-color renctangeled-5">
                  <Modal.Title className="modal-div">
                    {`${name?.projectId?.name}`} status - {`${name?.status}`}
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <h4>Are you sure?</h4>
                  <p>Do you want to delete <strong>{name?.name}</strong>?</p>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="outline-secondary" onClick={handleCloseDelete}>
                    Cancel
                  </Button>
                  <Button variant="danger" onClick={confirmDelete}>
                    Delete
                  </Button>
                </Modal.Footer>
              </Modal>
            </Container>
          }
        </div >
      )
      }
    </>
  );
}

export default ProjectStatuses;
