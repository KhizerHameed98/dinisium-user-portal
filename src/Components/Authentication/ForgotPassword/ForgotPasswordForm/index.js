import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Route from "../../../../Constants/browserRoutes";
import { connect } from "react-redux";
import { forgetPassword } from "../../../../Redux/actions/actions";
import {withRouter} from "react-router-dom";
const ForgotPasswordForm = ({ setVerificationPage, forgetPassword ,history}) => {
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    email: "",
  });
  const { email } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    forgetPassword({ formData, setVerificationPage, history, setLoading });
    // setVerificationPage({
    //   forgotdPage: true,
    //   smsPage: false,
    // });
  };

  return (
    <form className="form" onSubmit={onSubmit}>
      <h3 className="h3">Forgot Password</h3>
      <div className="form-group">
        <label>Email</label>

        <input
          type="text"
          placeholder="Enter Email*"
          className="form-control"
          name="email"
          value={email}
          onChange={(e) => onChange(e)}
          required
        />
      </div>

      {/* <div
        className="form-group"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <div className="custom-control custom-checkbox">
          <input
            type="checkbox"
            className="custom-control-input"
            id="customCheck1"
          />
          <label className="custom-control-label" htmlFor="customCheck1">
            Keep me Signed in
          </label>
        </div>
        <a href="#">Forget your Password ?</a>
      </div> */}
      {/* <!-- <p style="padding-left: 300px;">forget your Password?</p> --> */}

      {/* <button
            type="submit"
            style={{ marginBottom: "20px" }}
            className="btn btn-outline-primary"
          >
            LOG IN
          </button> */}
      <button
        className="btn btn-primary shadow-2 mb-4"
        type="submit"
        disabled={loading}
      >
        {loading && <span className="spinner-border spinner-border-sm"></span>}{" "}
        SUBMIT
      </button>
      {/* <p className="mb-2 text-muted">
        Forgot password? <NavLink to={Route.SIGNIN}>Reset</NavLink>
      </p> */}
      {/* <p className="mb-0 text-muted">
        Don’t have an account? <NavLink to={Route.SIGNIN}>Signup</NavLink>
      </p> */}
    </form>
  );
};



export default connect(null, { forgetPassword })(withRouter(ForgotPasswordForm));
