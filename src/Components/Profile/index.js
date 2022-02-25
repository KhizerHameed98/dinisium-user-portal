import React, { useState, useEffect } from "react";
import Route from "../../Constants/browserRoutes";
import image from "../../App/Assets/images/avatar.png";
import { Link } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

import { connect } from "react-redux";

import {
  emailAuthentiactionOn,
  smsAuthentiactionOn,
  googleAuthentiactionOn,
  updatePassword,
} from "../../Redux/actions/actions";
import GoogleAuthQRModal from "./GoogleAuthQRModal";
import { toast } from "react-toastify";

const Profile = ({
  auth,
  emailAuthentiactionOn,
  smsAuthentiactionOn,
  googleAuthentiactionOn,
  updatePassword,
}) => {
  // const [verifyType, SetVerifyType] = useState("");
  const [showGoogleAuthQRcode, setShowGoogleAuthQRcode] = useState(false); // It shows QRcode modal
  const [googleQRcodeUrl, setGoogleQRcodeUrl] = useState(""); // Its QRcode Image URL

  const [verifySMS, SetVerifySMS] = useState(false);
  const [verifyGoogle, SetVerifyGoogle] = useState(false);
  const [verifyEmail, SetVerifyEmail] = useState(false);
  // for disable buttons
  const [disableEmail, SetDisableEmail] = useState(false);
  const [disableSMS, SetDisableSMS] = useState(false);
  const [disableGoogle, SetDisableGoogle] = useState(false);

  const { userDetails, userWallet } = auth;

  // update password
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [formData, setFormData] = useState({
    currentPassword: "",
    password: "",
  });
  const { currentPassword, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (currentPassword === "" || password === "" || password.length < 6) {
      setError(true);
      toast.error("New Password Must be At least 6 characters");
    } else {
      setError(false);
      setLoading(true);
      const data = {
        currentPassword,
        password,
      };
      updatePassword({ data, setFormData, setLoading, setShow });
    }
  };

  // update password

  useEffect(() => {
    if (userDetails.is_email_verification_on) {
      SetVerifyEmail(true);

      SetDisableEmail(false);
      SetDisableSMS(true);
      SetDisableGoogle(true);
    } else if (userDetails.is_google_authentication_on) {
      SetVerifyGoogle(true);

      SetDisableEmail(true);
      SetDisableSMS(true);
      SetDisableGoogle(false);
    } else if (userDetails.is_number_verification_on) {
      SetVerifySMS(true);

      SetDisableEmail(true);
      SetDisableSMS(false);
      SetDisableGoogle(true);
    } else {
      SetDisableEmail(false);
      SetDisableSMS(false);
      SetDisableGoogle(false);
    }
  }, [verifySMS, verifyEmail, verifyGoogle]);

  const handleChange = (e) => {
    var onObj = {
      status: true,
    };
    var offObj = {
      status: false,
    };
    if (e.target.name === "SMS") {
      // SetVerifyType(e.target.name);
      if (verifySMS) {
        smsAuthentiactionOn(offObj, {
          SetVerifySMS,
          SetVerifyGoogle,
          SetVerifyEmail,
          verifySMS,
        });
      } else {
        smsAuthentiactionOn(onObj, {
          SetVerifySMS,
          SetVerifyGoogle,
          SetVerifyEmail,
          verifySMS,
        });
      }
    } else if (e.target.name === "Email") {
      // SetVerifyType(e.target.name);
      if (verifyEmail) {
        emailAuthentiactionOn(offObj, {
          SetVerifySMS,
          SetVerifyGoogle,
          SetVerifyEmail,
          verifyEmail,
        });
      } else {
        emailAuthentiactionOn(onObj, {
          SetVerifySMS,
          SetVerifyGoogle,
          SetVerifyEmail,
          verifyEmail,
        });
      }
    } else if (e.target.name === "Google") {
      // SetVerifyType(e.target.name);
      if (verifyGoogle) {
        googleAuthentiactionOn(
          offObj,
          {
            SetVerifySMS,
            SetVerifyGoogle,
            SetVerifyEmail,
            verifyGoogle,
          },
          setShowGoogleAuthQRcode,
          setGoogleQRcodeUrl
        );
      } else {
        googleAuthentiactionOn(
          onObj,
          {
            SetVerifySMS,
            SetVerifyGoogle,
            SetVerifyEmail,
            verifyGoogle,
          },
          setShowGoogleAuthQRcode,
          setGoogleQRcodeUrl
        );
      }
    }
  };

  const obj = {
    fname: userDetails?.fname,
    lname: userDetails?.lname,
    contact: userDetails?.contact_no,
    country: userDetails?.country,
  };

  return (
    <div className="col-12 col-md-8 offset-md-2">
      {/* <!-- inner row --> */}
      <div className="row">
        <div className="col-sm-12">
          <div className="card pu-rel p-5 mb-3">
            <img
              className="profile-img"
              src={
                userDetails && userDetails.image
                  ? `${Route.HOST}/${userDetails.image}`
                  : image
              }
              alt="User Image"
            />
            <div className="row">
              <div className="col-12 col-md-12">
                <ul className="row profile-detail">
                  <li className="col-12 col-md-6">
                    <span>Name</span>
                    <span>
                      {(userDetails &&
                        userDetails.fname &&
                        userDetails.fname + " " + userDetails.lname) ||
                        ""}
                    </span>
                  </li>

                  <li className="col-12 col-md-6">
                    <span>Email</span>
                    <span style={{ display: "contents" }}>
                      {userDetails.email || ""}
                    </span>
                  </li>
                  <li className="col-12 col-md-6">
                    <span>Contact No</span>
                    <span>{userDetails.contact_no || ""}</span>
                  </li>
                  <li className="col-12 col-md-6">
                    <span>Country</span>
                    <span>{userDetails.country || ""}</span>
                  </li>
                  <li className="col-12 col-md-6">
                    <span>Role</span>
                    <span>{userDetails.role}</span>
                  </li>
                  <li className="col-12 col-md-6">
                    <span>Account Address</span>
                    <span style={{ display: "contents" }}>
                      {userWallet.account_address || ""}
                    </span>
                  </li>
                </ul>

                <div className="row">
                  <div className="col-12 col-md-6">
                    <div className="custom-control custom-switch custom-sw-nu">
                      <input
                        type="checkbox"
                        className="custom-control-input"
                        id="customSwitch1"
                        disabled={disableGoogle}
                        checked={verifyGoogle}
                        name="Google"
                        onChange={handleChange}
                      />
                      <label
                        className="custom-control-label"
                        htmlFor="customSwitch1"
                      >
                        Google Authentication
                      </label>
                    </div>
                    <GoogleAuthQRModal
                      showGoogleAuthQRcode={showGoogleAuthQRcode}
                      setShowGoogleAuthQRcode={setShowGoogleAuthQRcode}
                      googleQRcodeUrl={googleQRcodeUrl}
                    />
                  </div>
                  <div className="col-12 col-md-6">
                    <div className="custom-control custom-switch custom-sw-nu">
                      <input
                        type="checkbox"
                        className="custom-control-input "
                        id="customSwitch2"
                        disabled={disableEmail}
                        checked={verifyEmail}
                        name="Email"
                        onChange={handleChange}
                      />
                      <label
                        className="custom-control-label"
                        htmlFor="customSwitch2"
                      >
                        Email Authentication
                      </label>
                    </div>
                  </div>
                  <div className="col-12 col-md-6">
                    <div className="custom-control custom-switch custom-sw-nu">
                      <input
                        type="checkbox"
                        className="custom-control-input "
                        id="customSwitch3"
                        disabled={disableSMS}
                        checked={verifySMS}
                        name="SMS"
                        onChange={handleChange}
                      />
                      <label
                        className="custom-control-label"
                        htmlFor="customSwitch3"
                      >
                        SMS Authentication
                      </label>
                    </div>
                  </div>
                </div>

                <div className="d-flex justify-content-start">
                  <Link
                    className="btn btn-secondary btn-sm mt-5"
                    to={{
                      pathname: Route.EDIT_PROFILE,
                      state: obj,
                    }}
                  >
                    Update Profile
                  </Link>{" "}
                  <Link
                    className="btn btn-primary btn-sm mt-5 ml-3"
                    to="#"
                    onClick={handleShow}
                  >
                    Update Password
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- end inner row --> */}

      <Modal
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={show}
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>Update Password</Modal.Title>
        </Modal.Header>
        <form className="form" onSubmit={onSubmit}>
          <Modal.Body>
            {" "}
            <div className="form-group row">
              <div className="col-sm-12">
                <div className="form-group">
                  <label>Current Password</label>
                  <input
                    type="password"
                    placeholder="Current Password"
                    className="form-control"
                    name="currentPassword"
                    value={currentPassword}
                    onChange={(e) => onChange(e)}
                    required
                  />
                  {error && currentPassword === "" ? (
                    <div className="error-msg">
                      {" "}
                      Current Password is required{" "}
                    </div>
                  ) : null}
                </div>
              </div>

              <div className="col-sm-12">
                <div className="form-group">
                  <label>New Password</label>
                  <input
                    type="password"
                    placeholder="New Password"
                    className="form-control"
                    name="password"
                    value={password}
                    onChange={(e) => onChange(e)}
                    required
                  />
                  {error && password === "" ? (
                    <div className="error-msg"> New Password is required </div>
                  ) : null}
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" type="submit" disabled={loading}>
              {loading && (
                <span className="spinner-border spinner-border-sm"></span>
              )}{" "}
              Save Changes
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </div>
  );
};

const mpaStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mpaStateToProps, {
  emailAuthentiactionOn,
  smsAuthentiactionOn,
  googleAuthentiactionOn,
  updatePassword,
})(Profile);
