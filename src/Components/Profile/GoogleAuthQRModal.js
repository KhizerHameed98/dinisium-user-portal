import React from "react";
import { Button, Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
// import { Link } from "react-router-dom";

const GoogleAuthQRModal = ({
  showGoogleAuthQRcode,
  setShowGoogleAuthQRcode,
  googleQRcodeUrl,
}) => {
  const handleClose = () => {
    setShowGoogleAuthQRcode(false);
  };
  const handleShow = () => setShowGoogleAuthQRcode(true);

  const auth = useSelector((state) => state.auth);

  return (
    <Modal
      size="sm"
      show={showGoogleAuthQRcode}
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
        <p>Scan QRcode from Google Authenticatior mobile app</p>
        <img src={googleQRcodeUrl} alt="..." />
        {/* <button
          // to={googleQRcodeUrl}
          target="_blank"
          // type="button"
          className="btn btn-primary w-25 btn-md"
          onClick={handleClose}
        >
          Ok
        </button> */}
        <h6>
          If you have not scanned QRcode, please{" "}
          <span style={{ color: "red" }}>TURN OFF</span> Google Authentication
          button in order to avoid any inconvenience
        </h6>
      </Modal.Body>
      <Modal.Footer className="border-0"></Modal.Footer>
    </Modal>
  );
};

export default GoogleAuthQRModal;
