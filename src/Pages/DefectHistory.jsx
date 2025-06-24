import { Form } from "formik";
import MaterialTable from "material-table";
import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { tableIcons } from "../core/tableIcons";
import Services from "../Services";
import moment from "moment";

function DefectHistory(props) {
  const [data, setData] = useState();
  const [show, setShow] = useState(false);
  const getDefectHistory = () => {
    Services.getDefecHistory(props?.data?.id).then((res) => {
      setData(res?.data);
    });
  };
  useEffect(() => {
    getDefectHistory();
  }, []);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const columns = [
    {
      title: "S.No",
      field: "sNo",
      render: (rowData) => `${rowData?.tableData?.id + 1}`,
    },
    { title: "Ticket No", field: "ticketNo" },
   
    { title: "Old ", field: "oldStatus" },
    { title: "New ", field: "newStatus" },
    {
      title: "Updated By",
      render: (rowData) =>
        `${rowData?.updateBy?.firstName} ${rowData?.updateBy?.lastName}`,
      //  field: "updateBy"
    },
    {
      title: "Updated Time",
      field: "updatedTime",
    },
  ];
  return (
    <div>
      <div className="m-4">
        <MaterialTable
          title="History"
          columns={columns}
          icons={tableIcons}
          data={data}
          options={{
            cellStyle: { border: "1px solid #eee",textAlign:"center"},
            addRowPosition: "first",
            actionsColumnIndex: -1,
            headerStyle: {
              backgroundColor: "#14539a",
              color: "whitesmoke",
              textAlign: "center",
              zIndex: 0,
            },
          }}
        />
      </div>
      <div className="m-3">
        <Modal show={show} onHide={handleClose} backdrop="static">
          <Modal.Header className="header-text-color" closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group>
                <Form.Label>Ticket Id</Form.Label>
                <Form.Control />
              </Form.Group>
              <Form.Group>
                <Form.Label>Assigned To</Form.Label>
                <Form.Control type="text" name="imageName" />
              </Form.Group>
              <Form.Group>
                <Form.Label>Old Status</Form.Label>
                <Form.Control type="text" name="createdOn" />
              </Form.Group>
              <Form.Group>
                <Form.Label>New Status</Form.Label>
                <Form.Control />
              </Form.Group>
              <Form.Group>
                <Form.Label>Updated By</Form.Label>
                <Form.Control type="text" name="imageName" />
              </Form.Group>
              <Form.Group>
                <Form.Label>Created On</Form.Label>
                <Form.Control type="text" name="createdOn" />
              </Form.Group>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={handleClose}>
                Save Changes
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
}

export default DefectHistory;
