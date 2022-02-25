import React, { useState } from "react";
import logo from "../../../App/Assets/images/danisium-logo-02.png";
import SignUpForm from "./SignUpForm";
import CodeVerificationForm from "./CodeVerificationForm";

const SignUp = () => {
  const [codeVerificationPage, setCodeVerificationPage] = useState(false);

  return (
    <div className="login-pge row m-0" style={{ height: "100vh" }}>
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
        {!codeVerificationPage ? (
          <SignUpForm setCodeVerificationPage={setCodeVerificationPage} />
        ) : (
          <CodeVerificationForm
            setCodeVerificationPage={setCodeVerificationPage}
          />
        )}
      </div>
    </div>
  );
};

export default SignUp;
