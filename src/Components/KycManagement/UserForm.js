import React, { useEffect, useState } from "react";
import { addKyc } from "../../Redux/actions/actions";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import Route from "../../Constants/browserRoutes";
import moment from "moment";

const UserForm = ({ setUserStatus, addKyc, obj, setrefresh, refresh }) => {
  const [loading, setLoading] = useState(false);
  const [disable, setDisable] = useState(true);
  console.log("OBJ==========>", obj);

  const [imagebox, setimagebox] = useState({
    boxpersonalPhoto: obj?.boxpersonalPhoto || false,
    boxlicensePhoto: obj?.boxlicensePhoto || false,
    boxdocument: obj?.boxdocument || false,
  });
  const [formData, setFormData] = useState({
    fullName: obj?.fullName || "",
    nationality: obj?.nationality || "",
    dob: obj?.dob || "",
    permanentAddress: obj?.permanentAddress || "",
    userId: JSON.parse(localStorage.getItem("user")).id,
    city: obj?.city || "",
    state: obj?.state || "",
    country: obj?.country || "",
    bankName: obj?.bankName || "",
    swift: obj?.swift || "",
    accountNumber: obj?.accountNumber || "",
    accountTitle: obj?.accountTitle || "",
    personalPhoto: obj?.personalPhoto || {},
    licensePhoto: obj?.licensePhoto || {},
    document: obj?.document || {},
  });
  console.log("checking", formData.personalPhoto);
  const {
    fullName,
    nationality,
    dob,
    permanentAddress,
    city,
    state,
    country,
    bankName,
    swift,
    accountNumber,
    accountTitle,
    personalPhoto,
    licensePhoto,
    document,
  } = formData;
  const { boxpersonalPhoto, boxlicensePhoto, boxdocument } = imagebox;
  console.log("FORM______DATA", formData);
  useEffect(() => {
    checkDisable();
  }, [formData]);
  const onChange = (e) => {
    let alpha = e.target.value.replace(/[^A-Za-z ]*$/gm, "");

    if (
      e.target.name === "fullName" ||
      e.target.name === "nationality" ||
      e.target.name === "city" ||
      e.target.name === "state" ||
      e.target.name === "country" ||
      e.target.name === "bankName" ||
      e.target.name === "accountTitle"
    ) {
      setFormData({
        ...formData,

        [e.target.name]: alpha,
      });
    } else {
      setFormData({
        ...formData,

        [e.target.name]: e.target.value,
      });
    }
  };
  // const onLocationChange = (e) => {
  //   let value = e.target.value;
  //   value = value.replace(/[^A-Za-z- ]/gi, "");
  //   setFormData({ ...formData, [e.target.name]: value });
  // };

  const checkMimeType = (event) => {
    let files = event.target.files[0];
    console.log("files=============>", files);
    let err = "";
    const types = ["image/png", "image/jpeg", "image/jpg"];
    if (types.every((type) => files.type !== type)) {
      err += files.type + " is not a supported format\n";
      toast.error(err, { draggable: true });
    }

    if (err !== "") {
      event.target.value = null;
      return false;
    }
    return true;
  };
  const onPersonalFileChange = (e) => {
    if (checkMimeType(e)) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(e.target.files[0]);
      fileReader.onload = () => {
        const image = fileReader.result;
        setFormData({
          ...formData,
          personalPhoto: e.target.files[0],
          pImage: image,
        });
      };
      setimagebox({
        ...imagebox,
        boxpersonalPhoto: true,
      });
      console.log("Form Data =============>", formData);
    }
  };
  console.log("PIMAGE--------->", formData.pImage);
  const onLicenceFileChange = (e) => {
    if (checkMimeType(e)) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(e.target.files[0]);
      fileReader.onload = () => {
        const image = fileReader.result;
        setFormData({
          ...formData,
          licensePhoto: e.target.files[0],
          lImage: image,
        });
      };
      setimagebox({ ...imagebox, boxlicensePhoto: true });
    }
  };

  const onDocumentFileChange = (e) => {
    console.log("documentfile========>", e.target.value);
    if (checkMimeType(e)) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(e.target.files[0]);
      fileReader.onload = () => {
        const image = fileReader.result;
        setFormData({
          ...formData,
          document: e.target.files[0],
          dImage: image,
        });
      };
    }
    setimagebox({ ...imagebox, boxdocument: true });
  };
  const checkDisable = () => {
    if (
      fullName !== "" &&
      nationality !== "" &&
      dob !== "" &&
      permanentAddress !== "" &&
      city !== "" &&
      state !== "" &&
      country !== "" &&
      bankName !== "" &&
      swift !== "" &&
      accountNumber !== "" &&
      accountTitle !== "" &&
      boxpersonalPhoto === true &&
      boxlicensePhoto === true &&
      boxdocument === true
    ) {
      setDisable(false);
    } else {
      setDisable(true);
    }
  };
  const onSubmit = (e) => {
    e.preventDefault();
    // console.log("%c I am here", "font-size: 3rem", formData);
    setLoading(true);
    var data = new FormData();
    data.append("fullName", fullName);
    data.append("userId", JSON.parse(localStorage.getItem("user")).id);
    data.append("nationality", nationality);
    data.append("dob", dob);
    data.append("permanentAddress", permanentAddress);
    data.append("city", city);
    data.append("state", state);
    data.append("country", country);
    data.append("bankName", bankName);
    data.append("swift", swift);
    data.append("accountNumber", accountNumber);
    data.append("accountTitle", accountTitle);
    data.append("personalPhoto", personalPhoto);
    data.append("licensePhoto", licensePhoto);
    data.append("document", document);

    // Comapring Dates
    const dbo = new Date(dob);
    const current = new Date();
    const dbo2 = Date.parse(dbo);
    const current2 = Date.parse(current);
    if (current2 >= dbo2) {
      setLoading(true);
      addKyc({ data, setUserStatus, setLoading, setrefresh, refresh });
    } else {
      toast.error("Date Should Not be In Future");
    }
  };
  console.log("submit photo===========>", personalPhoto);
  return (
    <div className="col-12 col-md-8 offset-md-2">
      {/* <!-- inner row --> */}
      <div className="row">
        <div className="col-md-12">
          <div className="card mb-4">
            <div className="card-body p-5">
              <h2 className="page-title-heading text-center mb-4 font-30">
                Know your Customer
              </h2>
              <form className="form">
                <div className="form-group row">
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label>Full_name</label>
                      <input
                        type="text"
                        placeholder="Full Name"
                        className={fullName?"form-control py-4":"form-control is-invalid py-4"}
                        name="fullName"
                        value={fullName}
                        onChange={onChange}
                        // onChange={(e) => onLocationChange(e)}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label>Nationality</label>
                      <input
                        type="text"
                        placeholder="Nationality"
                        className={nationality?"form-control py-4":"form-control is-invalid py-4"}
                        name="nationality"
                        value={nationality}
                        onChange={onChange}
                        // onChange={(e) => onLocationChange(e)}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label>Date of birth</label>
                      <input
                        type="date"
                        placeholder="Date of birth"
                        className={dob?"form-control py-4":"form-control is-invalid py-4"}
                        name="dob"
                        value={dob}
                        max={new Date().toISOString().split("T")[0]}
                        onChange={(e) => onChange(e)}
                        required
                        pattern="\d{2}-\d{2}-\d{4}"
                      />
                    </div>
                  </div>

                  <div className="col-sm-6">
                    <div className="form-group">
                      <label>Permanent_Address</label>
                      <input
                        type="text"
                        placeholder="Permanent Address"
                        className={permanentAddress?"form-control py-4":"form-control is-invalid py-4"}
                        name="permanentAddress"
                        value={permanentAddress}
                        // onChange={(e) => onLocationChange(e)}
                        onChange={onChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label>City</label>
                      <input
                        type="text"
                        placeholder="City"
                        className={city?"form-control py-4":"form-control is-invalid py-4"}
                        name="city"
                        value={city}
                        // onChange={(e) => onLocationChange(e)}
                        onChange={onChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label>State_or_Province</label>
                      <input
                        type="text"
                        placeholder="State_or_Province"
                        className={state?"form-control py-4":"form-control is-invalid py-4"}
                        name="state"
                        value={state}
                        // onChange={(e) => onLocationChange(e)}
                        onChange={onChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label>Country</label>
                      <input
                        type="text"
                        placeholder="Country"
                        className={country?"form-control py-4":"form-control is-invalid py-4"}
                        name="country"
                        value={country}
                        // onChange={(e) => onLocationChange(e)}
                        onChange={onChange}
                        required
                      />
                    </div>
                  </div>
                  {/* AhmedCoding */}
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label>Bank Name</label>
                      <input
                        type="text"
                        placeholder="Bank Name"
                        className={bankName?"form-control py-4":"form-control is-invalid py-4"}
                        name="bankName"
                        value={bankName}
                        // onChange={(e) => onLocationChange(e)}
                        onChange={onChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label>Swift Code</label>
                      <input
                        type="number"
                        placeholder="Swift Code"
                        className={swift?"form-control py-4":"form-control is-invalid py-4"}
                        name="swift"
                        value={swift}
                        onChange={onChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label>Account Number</label>
                      <input
                        type="number"
                        placeholder="Account Number"
                        className={accountNumber?"form-control py-4":"form-control is-invalid py-4"}
                        name="accountNumber"
                        value={accountNumber}
                        onChange={onChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label>Account Title</label>
                      <input
                        type="text"
                        placeholder="Account Title"
                        className={accountTitle?"form-control py-4":"form-control is-invalid py-4"}
                        name="accountTitle"
                        value={accountTitle}
                        // onChange={(e) => onLocationChange(e)}
                        onChange={onChange}
                        required
                      />
                    </div>
                  </div>

                  {/* //Ahmed coding End */}
                  <div className="col-sm-12">
                    <div className="row">
                      <div className="col-sm-4">
                        <div
                          className="form-group upload-input-sty"
                          style={{ margin: "auto" }}
                        >
                          {imagebox.boxpersonalPhoto ? (
                            <img
                              class="img-fluid rounded mx-auto"
                              src={formData.pImage}
                              alt={
                                formData.personalPhoto.name ||
                                formData.personalPhoto
                              }
                            />
                          ) : (
                            <p className="upload-icon">
                              <i className="far fa-image"></i>
                            </p>
                          )}
                          <label htmlFor="exampleFormControlFile1">
                            Personal_Photo{" "}
                            <i className="fas fa-plus-circle"></i>
                          </label>
                          <input
                            type="file"
                            className={personalPhoto?"form-control-file" : "form-control-file is-invalid"}
                            id="exampleFormControlFile1"
                            name="personalPhoto"
                            onChange={(e) => onPersonalFileChange(e)}
                            required
                            // onInvalid={() =>
                            //   toast.error("PersonalPhoto Required")
                            // }
                          />
                        </div>
                      </div>
                      <div className="col-sm-4">
                        <div
                          className="form-group upload-input-sty"
                          style={{
                            margin: "auto",
                            width: "100%",
                          }}
                        >
                          {imagebox.boxlicensePhoto ? (
                            <img
                              class="img-fluid rounded mx-auto"
                              // max-width="200px"
                              // width="auto"
                              // height="auto"
                              // src={`${Route.SERVER_URLL}/${formData.licensePhoto}`}
                              src={formData.lImage}
                              alt={
                                formData.licensePhoto.name ||
                                formData.licensePhoto
                              }
                            />
                          ) : (
                            <p className="upload-icon">
                              <i className="far fa-file-alt"></i>
                            </p>
                          )}

                          <label htmlFor="exampleFormControlFile2">
                            License_Photo <i className="fas fa-plus-circle"></i>
                          </label>
                          <input
                            type="file"
                            className={licensePhoto?"form-control-file" : "form-control-file is-invalid"}
                            id="exampleFormControlFile2"
                            name="licensePhoto"
                            onChange={(e) => onLicenceFileChange(e)}
                            required
                            // onInvalid={() =>
                            //   toast.error("licensePhoto Required")
                            // }
                          />
                        </div>
                        {/* <p className="font-weight-bold ml-3 mt-2">
                          {" "}
                          {formData.licensePhoto.name || ""}
                        </p> */}
                      </div>
                      <div className="col-sm-4">
                        <div
                          className="form-group upload-input-sty"
                          style={{ margin: "auto" }}
                        >
                          {imagebox.boxdocument ? (
                            <img
                              class="img-fluid rounded mx-auto"
                              max-width="200px"
                              width="auto"
                              height="100px"
                              // src={`${Route.SERVER_URLL}/${formData.document}`}
                              src={formData.dImage}
                              alt={formData.document.name || formData.document}
                            />
                          ) : (
                            <p className="upload-icon">
                              <i className="far fa-image"></i>
                            </p>
                          )}

                          <label htmlFor="exampleFormControlFile3">
                            Other_Document{" "}
                            <i className="fas fa-plus-circle"></i>
                          </label>
                          <input
                            type="file"
                            className={document?"form-control-file" : "form-control-file is-invalid"}                            id="exampleFormControlFile3"
                            name="document"
                            onChange={(e) => onDocumentFileChange(e)}
                            required
                            // onInvalid={() => toast.error("Document  Required")}
                          />
                        </div>
                        {/* <p className="font-weight-bold ml-3 mt-2">
                          {" "}
                          {formData.document.name || ""}
                        </p> */}
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-12 text-center mt-3">
                    <button
                      // type="submit"
                      className="btn btn-dark w-25 btn-lg"
                      onClick={onSubmit}
                      disabled={disable}
                      // disabled={loading}
                    >
                      {/* {loading && (
                        <span className="spinner-border spinner-border-sm"></span>
                      )}{" "} */}
                      SUBMIT
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- end inner row --> */}
    </div>
  );
};

export default connect(null, { addKyc })(UserForm);
