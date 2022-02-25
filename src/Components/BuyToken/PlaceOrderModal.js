import React from "react";
import { Button, Modal } from "react-bootstrap";

const CreateSeriesModal = ({ show, setShow }) => {
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Modal
      size="sm"
      show={show}
      onHide={handleClose}
      style={{ opacity: 1 }}
      centered
    >
      <div className="modal-header border-0">
        <button type="button" className="close" onClick={handleClose}>
          <span className="font-18">&times;</span>
        </button>
      </div>
      <Modal.Body className="text-center">
        <p>
          ITO series create <strong>successfully</strong>
        </p>
        <button
          type="button"
          className="btn btn-primary w-25 btn-md"
          onClick={handleClose}
        >
          Ok
        </button>
      </Modal.Body>
      <Modal.Footer className="border-0"></Modal.Footer>
    </Modal>
  );
};

export default CreateSeriesModal;
