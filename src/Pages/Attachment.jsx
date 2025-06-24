import { faPen, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ErrorMessage, Formik } from "formik";
import MaterialTable from "material-table";
import React, { useEffect, useRef, useState } from "react";
import { Button, Col, Form, Modal } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import * as Yup from "yup";
import moment from "moment";
import Loader from "../core/Loader";
import { tableIcons } from "../core/tableIcons";
import "../css/defect-details.scss";
import Services from "../Services";
import { toast } from "react-toastify";

function Attachment(props) {
  const [show, setShow] = useState(false);
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const defectData = location?.state?.values;
  const handleClose = () => setShow(false);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState();
  const [view, setView] = useState(false);
  const [editImage, setEditImage] = useState(false);
  const [imageId, setImageId] = useState("");
  const [defectsName, setDefectsName] = useState();
  const [imageName, setImageName] = useState();
  const [imagePreview, setImagePreview] = useState("");
  const [showDelete, setShowDelete] = useState();
  const fileInputRef = useRef(null);
  const [name, setName] = useState();
  const Capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  // const [isSubmit, setIsSubmit] = useState(false);

  function handleRemove() {
    setImage(null);
    setPreview(null);
    // reset the file input field
    document.getElementById("imagePreview").value = "";
  }

  const imageClose = () => {
    setView(false);
  };

  useEffect(() => {
    // Reset the file input element value when the component is unmounted
    return () => {
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    };
  }, []);

  const datas = [
    {
      ticketNo: "Mehmet",
      imagePreview: "Baran",
      imageName: 1987,
      createdOn: 63,
    },
  ];
  const columns = [
    {
      title: "S.No",
      render: (rowData) => `${rowData?.tableData?.id + 1}`,
    },
    {
      title: "Image Preview",
      field: "imagePreview",
      render: (rowData) => (
        <text
          onClick={() => {
            setPreview(rowData);
            setView(!view);
          }}
          className="text-info cursor"
        >
          View Image
        </text>
      ),
    },

    { title: "Image Name", field: "imageName" },
    { title: "Created On", field: "createdOn" },
  ];

  const deleteImage = (values) => {
    setName(values);
    setShowDelete(true);
  };

  const handleCloseDelete = () => {
    setShowDelete(!showDelete);
  };

  const confirmDelete = () => {
    const id = name?.id;
    Services.attachmentDelete(id).then((res) => {
      getAttachment();
      handleCloseDelete();
      toast.success("User Deleted Successfully");
    });
  };
  let date = new Date();
  const currentDate = moment(date).format("DD-MM-YYYY");

  const validation = Yup.object().shape({
    imageName: Yup.string().required("Image name is required"),
    imagePreview: Yup.mixed().required("Image preview is required"),
  });
  const submitForm = (values) => {
    Services.DefectAttachment(values, defectData).then((res) => {
      setIsLoading(true);
      const attachmentId = res?.defectAttachments?.id;
      if (attachmentId) {
        Services.attachmentUpload(values, attachmentId, defectData).then((res) => {
          getAttachment();
          setImage(null);
          handleClose();
          setIsLoading(false);
          toast.success("Attachment created successfully!.");
        });
      }
    });
  };

  const editForm = (values) => {
    // setIsSubmit(true);
    setIsLoading(true);
    Services.editAttachment(values, imageId).then((res) => {
      getAttachment();
      setImage(null);
      setEditImage(false);
      setImageName("");
      handleClose();
      toast.success("Attachment updated successfully!.");
      setIsLoading(false);
    });
  };

  // Convert Image to Base64
  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader?.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const selectFile = async (event, { setFieldValue }) => {
    setImage(event);
    const file = event.target.files[0];
    const type = file?.type?.split("/")[0];
    const base64 = await convertBase64(file);
    setFieldValue("imagePreview", base64);
  };

  const getAttachment = () => {
    Services.getDefectAttachment(defectData?.id).then((res) => {
      setData(res?.getDetails);
    });
  };

  useEffect(() => {
    getAttachment();
  }, [defectData]);
  return (
    <div className="m-3">
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <div className="d-flex justify-content-end mt-4">
            <Button
              onClick={() => {
                setEditImage(false);
                setImageName("");
                setImage(null);
                setShow(true);
                setPreview(null);
                // setIsSubmit(false);
              }}
              className="button-style-signup custom-btn-hover"
            >
              Add Attachment
            </Button>
          </div>
          <div className="mt-3 attachment-table attachment-table">
            <MaterialTable
              title="Attachments"
              icons={tableIcons}
              columns={columns}
              data={data}
              actions={[
                (rowData) => ({
                  icon: () => (
                    <FontAwesomeIcon
                      className="nav-font-color fa-sm"
                      onClick={() => {
                        setEditImage(true);
                        setShow(true);
                        setImageId(rowData?.id);
                        setDefectsName(rowData?.defectName);
                        setImageName(rowData?.imageName ? rowData?.imageName : "");
                        setImagePreview(rowData?.imagePreview ? rowData?.imagePreview : "");
                        setPreview(rowData);
                      }}
                      icon={faPen}
                      title="Edit"
                    />
                  ),
                }),
                (rowData) => ({
                  icon: () => (
                    <FontAwesomeIcon
                      className="nav-font-color ms-2 fs-5 p-0"
                      onClick={() => {
                        deleteImage(rowData);
                      }}
                      icon={faTrashCan}
                      title="Delete"
                    />
                  ),
                }),
              ]}
              options={{
                cellStyle: { border: "1px solid #eee", textAlign: "center" },
                addRowPosition: "first",
                actionsColumnIndex: -1,
                headerStyle: {
                  backgroundColor: "#14539a",
                  color: "whitesmoke",
                  textAlign: "center",
                  zIndex: 0,
                },
                actionsCellStyle: {
                  display: "flex",
                  justifyContent: "center",
                  padding: 16,

                  width: "100%",
                },
              }}
            />
          </div>
          <Modal show={show} onHide={handleClose} centered backdrop="static">
            <Modal.Header className="border-bottom bg-light text header-text-color renctangeled-5" closeButton>
              {editImage ? (
                <h3 className="modal-header nav-font-color">Edit Attachment</h3>
              ) : (
                <h3 className="modal-header nav-font-color">Add Attachments</h3>
              )}
            </Modal.Header>
            <Modal.Body className="">
              <Formik
                initialValues={{
                  imageName: imageName,
                  createdOn: currentDate,
                  imagePreview: preview?.imagePreview,
                }}
                validationSchema={validation}
                onSubmit={(values) => {
                  editImage ? editForm(values) : submitForm(values);
                }}
              >
                {(formik) => {
                  const { values, handleChange, handleSubmit, handleBlur, isValid, setFieldValue } = formik;
                  return (
                    <Form className="m-3" onSubmit={handleSubmit}>
                      <Form.Group className="mt-2">
                        <Form.Label className="required mb-0">Image Name</Form.Label>
                        <Form.Control
                          type="text"
                          name="imageName"
                          placeholder="Enter image name"
                          value={Capitalize(values.imageName)}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        <ErrorMessage component="span" className="text-danger" name="imageName" />
                      </Form.Group>
                      <Form.Group className="mt-2">
                        <Form.Label className="required mb-0">Image Preview</Form.Label>
                        <Form.Control
                          type="file"
                          name="imagePreview"
                          id="imagePreview"
                          onChange={(e) => {
                            selectFile(e, { setFieldValue });
                          }}
                        />
                        <ErrorMessage name="imagePreview" component="span" className="text-danger" />
                      </Form.Group>
                      {image ? (
                        <>
                          <img
                            alt="not found"
                            className="defect-image w-100 mt-2"
                            src={URL.createObjectURL(image?.target?.files[0])}
                          />
                          <br />
                          <Button
                            className="mt-0"
                            onClick={() => {
                              handleRemove();
                              setImage("");
                              setFieldValue("imagePreview", "");
                            }}
                          >
                            Remove
                          </Button>
                        </>
                      ) : preview ? (
                        <>
                          <img alt="not found" className="defect-image w-100 mt-2" src={preview?.imagePreview} />
                          <br />
                          <Button
                            className=""
                            onClick={() => {
                              setPreview("");
                              handleRemove();
                              setFieldValue("imagePreview", "");
                            }}
                          >
                            Remove
                          </Button>
                        </>
                      ) : null}

                      <div className="mt-3 d-flex justify-content-end">
                        <Col className="mt-3 d-flex justify-content-end " xs={12} lg={6}>
                          <Button variant="outline-secondary" className="mx-2  me-3" onClick={handleClose}>
                            Cancel
                          </Button>
                          <Button
                            // disabled={isSubmit}
                            variant="primary"
                            className="button-style-signup mr-auto p-2"
                            type="submit"
                          >
                            Save Changes
                          </Button>
                        </Col>
                      </div>
                    </Form>
                  );
                }}
              </Formik>
            </Modal.Body>
          </Modal>
          <Modal
            show={view}
            centered
            className=""
            onHide={imageClose}
            backdrop="static"
            fullscreen={true}
            scrollable={true}
          >
            <Modal.Header closeButton className="header-text-color">
              <h4>{preview?.ticketNo}</h4>
            </Modal.Header>
            <Modal.Body className="p-5">
              {preview?.imagePreview ? (
                <img src={preview?.imagePreview} className="w-100" width={"60%"} height={500} />
              ) : (
                <h4 className="text-center mt-3">No Image to show</h4>
              )}

              <div className="w-100 d-flex justify-content-end pb-4 pt-3 ">
                <Button
                  onClick={() => {
                    imageClose();
                  }}
                  className="px-4"
                >
                  Close
                </Button>
              </div>
            </Modal.Body>
          </Modal>
          <Modal show={showDelete} centered onHide={handleCloseDelete} backdrop="static" keyboard={false}>
            <Modal.Header closeButton className="bg-light text header-text-color renctangeled-5">
              <Modal.Title ClassName="modal-div"> {name?.imageName} </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <h4>Are you sure?</h4>
              <p>Do you want to delete {name?.imageName}</p>
            </Modal.Body>
            <footer className="m-4 me-2 d-flex justify-content-end">
              <Button variant="outline-secondary" onClick={handleCloseDelete}>
                Cancel
              </Button>
              <Button className="ms-2" onClick={() => confirmDelete()} variant="primary">
                Delete
              </Button>
            </footer>
          </Modal>
        </div>
      )}
    </div>
  );
}

export default Attachment;
