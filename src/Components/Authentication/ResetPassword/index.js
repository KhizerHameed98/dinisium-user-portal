import React, { Fragment, useState } from "react";
// import { withRouter } from "react-router-dom";
import { withRouter, useHistory } from "react-router-dom";

import logo from "../../../App/Assets/images/danisium-logo-02.png";
import ResetPasswordForm from "./ResetPasswordForm/index";

const ResetPassword = ({ history, props }) => {
  const [verificationPage, setVerificationPage] = useState({
    resetPage: false,
    smsPage: false,
    googlePage: false,
  });
  const { resetPage, smsPage, googlePage } = verificationPage;

  return (
    <Fragment>
      <div
        className="login-pge row m-0"
        style={{ justifyItems: "center", alignItems: "center" }}
      >
        <div className="col-sm-5" style={{ backgroundColor: "#038ff9" }}>
          <div className="logo">
            <img
              className="img2"
              src={logo}
              style={{ width: "300px", height: "100px" }}
              alt="..."
            />
          </div>
        </div>
        <div className="col-sm-7">
          {!resetPage && !smsPage && !googlePage && (
            <ResetPasswordForm
              setVerificationPage={setVerificationPage}
              verificationPage={verificationPage}
              history={history}
            />
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default withRouter(ResetPassword);
