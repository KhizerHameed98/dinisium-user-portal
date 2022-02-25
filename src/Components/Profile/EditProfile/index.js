import React, { useState, useEffect } from "react";

import { connect } from "react-redux";
import { useLocation } from "react-router";
import { updateProfile } from "../../../Redux/actions/actions";

const EditProfile = ({ updateProfile, profileData }) => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  // console.log(location);

  const [formData, setFormData] = useState({
    fname: location.state.fname || "",
    lname: location.state.lname || "",
    contact_no: location.state.contact || "",
    country: location.state.country || "",
  });
  const { fname, lname, contact_no, country } = formData;

  const { userDetails } = profileData;
  const id = userDetails.id;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onNameChange = (e) => {
    let value = e.target.value;

    value = value.replace(/[^A-Za-z]/gi, "");
    setFormData({ ...formData, [e.target.name]: value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (fname === "" || lname === "" || contact_no === "" || country === "") {
      setError(true);
    } else {
      setError(false);
      setLoading(true);
      const data = {
        fname,
        lname,
        contact_no,
        country,
      };
      updateProfile({ data, id, setFormData, setLoading });
    }
  };

  return (
    <div className="col-12 col-md-8 offset-md-2">
      {/* <!-- inner row --> */}
      <div className="row">
        <div className="col-md-12">
          <div className="card mb-4">
            <div className="card-body p-5">
              <form className="form" onSubmit={onSubmit}>
                <div className="form-group row">
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label>First Name</label>
                      <input
                        type="text"
                        placeholder={"First Name"}
                        className="form-control"
                        name="fname"
                        value={fname}
                        onChange={(e) => onNameChange(e)}
                        required
                      />
                      {error && fname === "" ? (
                        <div className="error-msg">
                          {" "}
                          First Name is required{" "}
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label>Last Name</label>
                      <input
                        type="text"
                        placeholder="Last Name"
                        className="form-control"
                        name="lname"
                        value={lname}
                        onChange={(e) => onNameChange(e)}
                        required
                      />
                      {error && lname === "" ? (
                        <div className="error-msg"> Last Name is required </div>
                      ) : null}
                    </div>
                  </div>

                  <div className="col-sm-6">
                    <label>Contact No</label>
                    <input
                      type="number"
                      placeholder="Contact No"
                      className="form-control"
                      name="contact_no"
                      value={contact_no}
                      onChange={(e) => onChange(e)}
                      required
                    />
                    {error && contact_no === "" ? (
                      <div className="error-msg"> Contact No is required </div>
                    ) : null}
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label>Country</label>
                      <input
                        type="text"
                        placeholder="Country"
                        className="form-control"
                        name="country"
                        value={country}
                        onChange={(e) => onNameChange(e)}
                        required
                      />
                      {error && country === "" ? (
                        <div className="error-msg"> Country is required </div>
                      ) : null}
                    </div>
                  </div>
                </div>
                <button
                  type="submit"
                  className="btn btn-primary btn-lg"
                  disabled={loading}
                >
                  {loading && (
                    <span className="spinner-border spinner-border-sm"></span>
                  )}{" "}
                  SUBMIT
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- end inner row --> */}
    </div>
  );
};

const mpaStateToProps = (state) => {
  return {
    profileData: state.auth,
  };
};

export default connect(mpaStateToProps, { updateProfile })(EditProfile);
