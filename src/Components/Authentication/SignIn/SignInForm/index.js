import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Route from "../../../../Constants/browserRoutes";

import { connect, useSelector } from "react-redux";
import { login } from "../../../../Redux/actions/actions";
import { toast } from "react-toastify";


const SignInForm = ({
  setVerificationPage,
  verificationPage,
  login,
  history,
}) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "user",
  });
  const { email, password } = formData;

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

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    login({
      formData,
      setVerificationPage,
      verificationPage,
      history,
      setLoading,
    });
  };

  const isBlocked = useSelector((state) => state?.auth?.userDetails?.is_blocked);




  return (
    <form className="form" onSubmit={onSubmit}>
      <h3 className="h3">Login</h3>
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
      <div className="form-group" style={{ width: "100%" }}>
        <label>Password</label>

        <input
          type="Password"
          placeholder="Enter Password*"
          className="form-control"
          name="password"
          value={password}
          onChange={(e) => onChange(e)}
          required
        />
      </div>
      <div
        className="form-group"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <div className="custom-control custom-checkbox">
          <input
            type="checkbox"
            className="custom-control-input"
            id="customCheck1"
          />
        </div>
        {/* <a href="#">Forget your Password ?</a> */}
      </div>
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
        LOGIN
      </button>
      <p className="mb-2 text-muted">
        Forgot password? <NavLink to={Route.FORGOT_PASSWORD}>Reset</NavLink>
      </p>
      <p className="mb-0 text-muted">
        Don’t have an account? <NavLink to={Route.SIGNUP}>Signup</NavLink>
      </p>
    </form>
  );
};

export default connect(null, { login })(SignInForm);
