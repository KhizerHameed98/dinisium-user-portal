import React, { useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { register } from "../../../../Redux/actions/actions";

const SignupForm = ({ setCodeVerificationPage, register }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    contact_no: "",
    country: "",
    password: "",
    role: "user",
  });
  const history = useHistory();
  const { fname, lname, email, contact_no, country, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const emailValidation = () => {
      const regex =
        /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
      return !(!email || regex.test(email) === false);
    };
    if (emailValidation()) {
      if (
        (fname && !isNaN(parseInt(fname, 10))) ||
        (lname && !isNaN(parseInt(lname, 10)))
      ) {
        //if fname or lname start with a number then through error
        return setError(true);
      } else if (password.length >= 6) {
        setError(false);
        setLoading(true);
        // setCodeVerificationPage(true);
        formData.role = "user";
        register({ formData, setCodeVerificationPage, history, setLoading });
      } else {
        toast.error("Password should be equal or greater than 6 characters ", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } else {
      toast.error("Enter a Valid Email Address", {
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

  return (
    <form className="form" onSubmit={onSubmit}>
      <h3 className="h3">Sign up</h3>

      <div className="row">
        <div className="col-md-6">
          <div className="form-group">
            <label>First Name</label>
            <input
              style={{ width: "100%", marginBottom: "auto" }}
              type="text"
              placeholder="First Name"
              className="form-control"
              name="fname"
              value={fname}
              onChange={(e) => onChange(e)}
              required
            />
            {error && fname && !isNaN(parseInt(fname, 10)) ? (
              <div className="error-msg">Name cannot start with numbers </div>
            ) : null}
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-group">
            <label>Last Name</label>

            <input
              style={{ width: "100%", marginBottom: "auto" }}
              type="text"
              placeholder="Last Name"
              className="form-control"
              name="lname"
              value={lname}
              onChange={(e) => onChange(e)}
              required
            />
            {error && lname && !isNaN(parseInt(lname, 10)) ? (
              <div className="error-msg">Name cannot start with numbers </div>
            ) : null}
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6">
          <div className="form-group">
            <label>Email</label>

            <input
              style={{ width: "100%", marginBottom: "auto" }}
              type="text"
              placeholder="Email*"
              className="form-control"
              name="email"
              value={email}
              onChange={(e) => onChange(e)}
              required
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-group">
            <label>Contact No</label>

            <input
              style={{ width: "100%", marginBottom: "auto" }}
              type="number"
              placeholder="Contact No"
              className="form-control"
              name="contact_no"
              value={contact_no}
              onChange={(e) => onChange(e)}
              required
            />
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6">
          <div className="form-group">
            <label>Country</label>

            <input
              style={{ width: "100%", marginBottom: "auto" }}
              type="text"
              placeholder="Country"
              className="form-control"
              name="country"
              value={country}
              onChange={(e) => onChange(e)}
              required
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-group">
            <label>Password</label>

            <input
              style={{ width: "100%", marginBottom: "auto" }}
              type="password"
              placeholder="Password"
              className="form-control"
              name="password"
              value={password}
              onChange={(e) => onChange(e)}
              required
            />
          </div>
        </div>
      </div>

      <button
        style={{ marginBottom: "20px" }}
        type="submit"
        className="btn btn-outline-primary"
        disabled={loading}
      >
        {loading && <span className="spinner-border spinner-border-sm"></span>}{" "}
        SIGN UP
      </button>
    </form>
  );
};

export default connect(null, { register })(SignupForm);
