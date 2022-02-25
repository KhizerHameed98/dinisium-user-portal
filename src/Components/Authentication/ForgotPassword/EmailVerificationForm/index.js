import React, { useState } from "react";
import verificationImg from "../../../../../src/App/Assets/images/verification.png";

import { useHistory } from "react-router-dom";
import Route from "../../../../Constants/browserRoutes";

const EmailVerificationForm = ({ setVerificationPage }) => {
  const [verificationCode, setVerificationCode] = useState("");

  const history = useHistory();

  const onChange = (e) => {
    setVerificationCode(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setVerificationPage({ emailPage: false, smsPage: true });
    history.push(Route.RESET_PASSWORD);
  };

  return (
    <form className="form" action="" onSubmit={onSubmit}>
      <h3 className="h3">2-Step Verification</h3>
      <p>
        {" "}
        <img
          src={verificationImg}
          style={{ width: "25px", height: "25px" }}
          alt="..."
        />{" "}
        Enter the Verification code Send through this hasnain@optimusfox.com
      </p>
      <div className="form-group">
        <label>Enter Code</label>
        <input
          type="text"
          placeholder="Enter Code"
          className="form-control"
          name="verificationCode"
          value={verificationCode}
          onChange={(e) => onChange(e)}
          required
        />
      </div>
      <button
        style={{ marginBottom: "20px" }}
        type="submit"
        className="btn btn-outline-primary"
      >
        VERIFY
      </button>
    </form>
  );
};

export default EmailVerificationForm;
