import React, { Fragment, useState } from "react";
import { withRouter } from "react-router-dom";
import SignInForm from "./SignInForm";
import { compose } from "redux";
import { connect, useSelector } from "react-redux";
import logo from "../../../App/Assets/images/danisium-logo-02.png";
import {
  verifyGoogleAuthCode,
  verifyEmailAuthCode,
  verifySMSAuthCode,
} from "../../../Redux/actions/actions";
import SmsVerificationForm from "./SmsVerificationForm";
import EmailVerificationForm from "./EmailVerificationForm";
import GoogleVerificationForm from "./GoogleVerificationForm";

const SignIn = ({
  history,
  verifySMSAuthCode,
  verifyEmailAuthCode,
  verifyGoogleAuthCode,
}) => {
  const [verificationPage, setVerificationPage] = useState({
    emailPage: false,
    smsPage: false,
    googlePage: false,
  });

  const auth = useSelector((state) => state.auth.authentication);

  const handleVerifyEmailCode = (verificationCode, setLoading) => {
    verifyEmailAuthCode({
      user: auth.id,
      history,
      setVerificationPage,
      verificationCode,
      setLoading,
    });
  };

  const handleVerifyGoogleCode = (verificationCode, setLoading) => {
    verifyGoogleAuthCode({
      user: auth.id,
      history,
      setVerificationPage,
      verificationCode,
      setLoading,
    });
  };

  const handleVerifySMSCode = (verificationCode) => {
    verifySMSAuthCode({
      user: auth.id,
      history,
      setVerificationPage,
      verificationCode,
      requestId: auth.request_id,
    });
  };

  // history.push(Route.DASHBOARD);
  const { emailPage, smsPage, googlePage } = verificationPage;
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
          {!emailPage && !smsPage && !googlePage && (
            <SignInForm
              setVerificationPage={setVerificationPage}
              verificationPage={verificationPage}
              history={history}
            />
          )}
          {emailPage && !smsPage && !googlePage && auth && (
            <EmailVerificationForm
              handleVerifyEmailCode={handleVerifyEmailCode}
              auth={auth}
            />
          )}
          {!emailPage && smsPage && !googlePage && auth && (
            <SmsVerificationForm
              handleVerifySMSCode={handleVerifySMSCode}
              auth={auth}
            />
          )}
          {!emailPage && !smsPage && googlePage && (
            <GoogleVerificationForm
              handleVerifyGoogleCode={handleVerifyGoogleCode}
            />
          )}
        </div>
      </div>
    </Fragment>
  );
};
const withConnect = connect(null, {
  verifyEmailAuthCode,
  verifyGoogleAuthCode,
  verifySMSAuthCode,
});
export default compose(withConnect, withRouter)(SignIn);
