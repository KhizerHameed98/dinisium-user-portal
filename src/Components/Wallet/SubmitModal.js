import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
// import { addKyc } from "../../Redux/actions/actions";
import { RequestWithdraw } from "../../Services/walletService";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
const SubmitModal = ({
  showModal,
  setShowModal,
  handleSubmit,
  data,
  setWithdraw,
}) => {
  const dispatch = useDispatch();
  const handleClose = () => {
    // toast.success("Withdraw Requsest Submitted Successfully");
    setShowModal(false);
  };

  const handleShow = () => setShowModal(true);

  return (
    <Modal
      size="sm"
      show={showModal}
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
        <div>
          <p>Withdraw request submitted</p>
          <button
            type="button"
            className="btn btn-success w-50 btn-md mr-2"
            onClick={() => {
              dispatch(RequestWithdraw(data));
              setWithdraw({ amount: "", IBAN: "" });
              handleClose();
            }}
          >
            Ok
          </button>
        </div>
      </Modal.Body>
      <Modal.Footer className="border-0"></Modal.Footer>
    </Modal>
  );
};

export default SubmitModal;
