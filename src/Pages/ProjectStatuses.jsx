import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import { tableIcons } from "../core/tableIcons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Button, Col, Form, Modal, Container } from "react-bootstrap";
import { toast } from "react-toastify";
import Loader from "../core/Loader";
import "../css/AdminProjects.scss";
import Services from "../Services";
function ProjectStatuses() {
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  const [name, setName] = useState();
  const Capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  const handleCloseDelete = () => {
    setShowDelete(!showDelete);
  };
  const [isLoading, setIsLoading] = useState(false);
  const [showDelete, setShowDelete] = useState();
  const getprojStatus = () => {
    Services.getProjectStatus().then((res) => {
      const data = res?.data;
      setData(data);
    });
  };
  useEffect(() => {
    getprojStatus();
  }, []);
  const confirmDelete = () => {
    // setIsLoading(true);
    const id = name?.id;
    Services.projectStatusDelete(id).then((res) => {
      getprojStatus();
      // setIsLoading(false);
      handleCloseDelete();
      // setIsLoading(false);
      toast.success("Project Status Deleted Successfully !");
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
      render: (rowData) => <text className="">{rowData?.projectId?.name} </text>,
    },
    {
      title: "Project Status",
      field: " projectStatus",
      render: (rowData) => <text className="">{rowData?.status} </text>,
    },
    // { title: "New Status", field: "newStatus" },
    {
      title: "Created By",
      field: "createdBy",
      render: (rowData) => (
        <text className="">
          {rowData?.createdBy?.firstName} {Capitalize(rowData?.createdBy?.lastName)}
        </text>
      ),
    },
    { title: "Created At", field: "createdAt" },
  ];
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <Container className="mt-5 mt-width mb-2" fluid>
          <MaterialTable
            title="Project-Status"
            icons={tableIcons}
            columns={columns}
            data={data}
            actions={[
              (rowData) => ({
                icon: () => (
                  <Col onClick={() => deleteProjecStatus(rowData)}>
                    <FontAwesomeIcon
                      className=" ms-2 fs-5 nav-fonts-color nav-font-color"
                      color="#6495ED"
                      size={20}
                      title="Delete"
                      icon={faTrash}
                    />
                  </Col>
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
                zIndex: 0,
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
              <p>Do you want to delete {name?.name}</p>
            </Modal.Body>
            <footer className="m-4 d-flex justify-content-end">
              <Button variant="outline-secondary" onClick={handleCloseDelete}>
                Cancel
              </Button>
              <Button className="ms-2" onClick={() => confirmDelete()} variant="primary">
                Delete
              </Button>
            </footer>
          </Modal>
        </Container>
      )}
    </>
  );
}
export default ProjectStatuses;
