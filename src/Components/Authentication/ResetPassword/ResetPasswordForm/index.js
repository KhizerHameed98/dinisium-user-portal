import React, { useState } from "react";
import { NavLink } from "react-router-dom";

import Route from "../../../../Constants/browserRoutes";
import { connect } from "react-redux";
import { resetPasswordFunction } from "../../../../Redux/actions/actions";
import { toast } from "react-toastify";
const ResetPasswordForm = (
  // props,
  { setVerificationPage, history, resetPasswordFunction }
) => {
  const alertToast = (error, message) => {
    if (!error) {
      toast.success(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast.error(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const { password, confirmPassword } = formData;

  let url1 = history.location.pathname;
  var id = url1.substring(url1.lastIndexOf("/") + 1);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // setVerificationPage({
    //   resetPage: true,
    //   smsPage: false,
    //   googlePage: false,
    // });
    // history.push(Route.SIGNIN);
    if (password === confirmPassword) {
      let data = {
        password: formData.password,
        token: id,
      };
      resetPasswordFunction({ data, setVerificationPage });
    } else {
      alertToast(true, "Password does not match");
    }
  };

  return (
    <form className="form" onSubmit={onSubmit}>
      <h3 className="h3">Reset Password</h3>
      <div className="form-group">
        <label>Password</label>

        <input
          type="password"
          placeholder="Enter password*"
          className="form-control"
          name="password"
          value={password}
          onChange={(e) => onChange(e)}
          required
        />
      </div>
      <div className="form-group">
        <label>Confirm Password</label>

        <input
          type="password"
          placeholder="Confirm password*"
          className="form-control"
          name="confirmPassword"
          value={confirmPassword}
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
      <button className="btn btn-primary shadow-2 mb-4" type="submit">
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

export default connect(null, { resetPasswordFunction })(ResetPasswordForm);
