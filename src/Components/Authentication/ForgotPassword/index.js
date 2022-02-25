import React, { Fragment, useState } from "react";
import { withRouter } from "react-router-dom";
import logo from "../../../App/Assets/images/danisium-logo-02.png";

import ForgotPasswordForm from "./ForgotPasswordForm";
import EmailVerificationForm from "./EmailVerificationForm/index";

const ForgotPassword = ({ history }) => {
  const [verificationPage, setVerificationPage] = useState({
    forgotdPage: false,
    smsPage: false,
  });
  const { forgotdPage, smsPage } = verificationPage;

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
          {!forgotdPage && !smsPage && (
            <ForgotPasswordForm
              setVerificationPage={setVerificationPage}
              verificationPage={verificationPage}
            />
          )}
          {forgotdPage && !smsPage && (
            <EmailVerificationForm
              setVerificationPage={setVerificationPage}
              verificationPage={verificationPage}
            />
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default withRouter(ForgotPassword);
