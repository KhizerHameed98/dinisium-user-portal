import React, { useState } from "react";
// import verificationImg from "../../../../App/Assets/images/verification.png";

const SmsVerificationForm = ({ setVerificationPage,handleVerifySMSCode,auth}) => {
  const [verificationCode, setVerificationCode] = useState("");
  const contactLength = auth && auth.contact_no && auth.contact_no.length;
  const contactSteric =
    auth &&
    auth.contact_no && 
    auth.contact_no
      .substring(0, contactLength - 3)
      .split("")
      .reduce((acc, value) => {
        return acc.concat("*");
      }, "");
  const onChange = (e) => {
    setVerificationCode(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if(!verificationCode) return
    handleVerifySMSCode(verificationCode);
    // setVerificationPage({ emailPage: false, smsPage: false, googlePage: true });
  };
 
  return (
    <form className="form" onSubmit={onSubmit}>
      <h3 className="h3">2-Step Verification</h3>
      <p>
        {" "}
        {/* <img
          src={verificationImg}
          style={{ width: "25px", height: "25px" }}
          alt="..."
        />{" "} */}
        {`Enter the Verification code Send through this ${contactSteric}${
          auth&&auth.contact_no &&
          auth.contact_no.substring(contactLength - 3, contactLength + 1)
        }`}
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

export default SmsVerificationForm;
