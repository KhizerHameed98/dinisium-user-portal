import React, { useState, useEffect } from "react";
import userImage from "../../App/Assets/images/user-img.png";
import Route from "../../Constants/browserRoutes";
import UserForm from "./UserForm";

const UserDetails = ({ kyc: { data }, setUserStatus }) => {
  const [showKycForm, setShowKycForm] = useState(false);
  // console.log("Data :", data);
  const openKycForm = () => {
    setShowKycForm(true);
  };
  console.log("Data==============>", data);
  const obj = {
    fullName: data?.full_name,
    nationality: data?.nationality,
    dob: data?.dob,
    permanentAddress: data?.permanent_address,
    city: data?.city,
    state: data?.state_or_province,
    country: data?.country,
    bankName: data?.bank_name,
    status: data?.kyc_status,
    swift: data?.swift,
    accountNumber: data?.account_number,
    accountTitle: data?.account_title,
    personalPhoto: data?.personal_photo,
    licensePhoto: data?.license_photo,
    document: data?.other_document,
    boxpersonalPhoto: true,
    boxlicensePhoto: true,
    boxdocument: true,
  };

  // console.log(data);

  return (
    <>
      {showKycForm ? (
        <UserForm setUserStatus={setUserStatus} obj={obj} />
      ) : (
        <div className="col-12 col-md-10 offset-md-1">
          {/* <!-- inner row --> */}
          <div className="row">
            <div className="col-sm-12">
              <div className="card pu-rel text-dark p-5 mb-3">
                <div className="mb-3">
                  <h2
                    className="page-title-heading mb-4 font-30 text-center pl-4"
                    style={{ display: "inline" }}
                  >
                    Details
                  </h2>
                  {data?.kyc_status === "rejected" ? (
                    <button
                      type="button"
                      className="btn btn-success btn-green float-right btn-sm"
                      onClick={openKycForm}
                    >
                      Resubmit KYC
                    </button>
                  ) : null}
                </div>

                <div className="row">
                  <div className="col-12 col-md-12">
                    <ul className="row profile-detail">
                      <li className="col-12 col-md-6">
                        <span>Name</span>
                        <span>{data?.full_name || " "}</span>
                      </li>

                      <li className="col-12 col-md-6">
                        <span>Nationality</span>
                        <span>{data?.nationality || " "}</span>
                      </li>
                      <li className="col-12 col-md-6">
                        <span>Date Of Birth</span>
                        <span>{data?.dob || " "}</span>
                      </li>
                      <li className="col-12 col-md-6">
                        <span>Address</span>
                        <span>{data?.permanent_address || " "}</span>
                      </li>
                      <li className="col-12 col-md-6">
                        <span>City</span>
                        <span>{data?.city || " "}</span>
                      </li>
                      <li className="col-12 col-md-6">
                        <span>State or Province</span>
                        <span>{data?.state_or_province || " "}</span>
                      </li>
                      <li className="col-12 col-md-6">
                        <span>Country</span>
                        <span>{data?.country || " "}</span>
                      </li>

                      <li className="col-12 col-md-6">
                        <span>Bank Name</span>
                        <span>{data?.bank_name || " "}</span>
                      </li>

                      <li className="col-12 col-md-6">
                        <span>Swift Code</span>
                        <span>{data?.swift || " "}</span>
                      </li>

                      <li className="col-12 col-md-6">
                        <span>Account Number</span>
                        <span>{data?.account_number || " "}</span>
                      </li>

                      <li className="col-12 col-md-6">
                        <span>Account Title</span>
                        <span>{data?.account_title || " "}</span>
                      </li>

                      <li className="col-12 col-md-6">
                        <span>Status</span>
                        {data?.kyc_status == "single_approved" ? (
                          <span>Pending</span>
                        ) : (
                          <span>{(data && data.kyc_status) || " "}</span>
                        )}

                        {/* <span>{data && data.kyc_status}</span> */}
                      </li>
                    </ul>
                  </div>
                  {data?.kyc_status == "rejected" ? (
                    <div class="col-12">
                      <ul className="row profile-detail">
                        <li className="col-12">
                          <span>
                            <strong>Rejection Reason</strong>
                          </span>
                          <div class="alert alert-primary" role="alert">
                            <span>{data?.rejection_message || ""}</span>
                          </div>
                        </li>
                      </ul>
                    </div>
                  ) : (
                    <></>
                  )}
                  <div className="col-12">
                    <div className="row mt-4">
                      <div className="col-sm-4" style={{ textAlign: "center" }}>
                        <a
                          href={
                            data
                              ? `${Route.SERVER_URLL}/${data.personal_photo}`
                              : Route.BLANK_LINK
                          }
                          target="_blank"
                        >
                          <img
                            max-width="200px"
                            width="auto"
                            height="100px"
                            src={
                              data
                                ? `${Route.SERVER_URLL}/${data.personal_photo}`
                                : Route.BLANK_LINK
                            }
                            alt="..."
                          />
                        </a>
                        {/* <div className="form-group upload-input-sty">
                        <p className="upload-icon text-center">
                          <i className="far fa-image"></i>
                        </p>
                      </div> */}

                        <p className="text-center">Personal Photo</p>
                      </div>
                      <div className="col-sm-4" style={{ textAlign: "center" }}>
                        <a
                          href={
                            data
                              ? `${Route.SERVER_URLL}/${data.license_photo}`
                              : Route.BLANK_LINK
                          }
                          target="_blank"
                        >
                          <img
                            max-width="200px"
                            width="auto"
                            height="100px"
                            src={
                              data
                                ? `${Route.SERVER_URLL}/${data.license_photo}`
                                : Route.BLANK_LINK
                            }
                            alt="..."
                          />
                        </a>
                        {/* <div className="form-group upload-input-sty">
                        <p className="upload-icon text-center">
                          <i className="far fa-image"></i>
                        </p>
                      </div> */}
                        <p className="text-center">License Photo</p>
                      </div>
                      <div className="col-sm-4" style={{ textAlign: "center" }}>
                        <a
                          href={
                            data
                              ? `${Route.SERVER_URLL}/${data.other_document}`
                              : Route.BLANK_LINK
                          }
                          target="_blank"
                        >
                          {" "}
                          <img
                            max-width="200px"
                            width="auto"
                            height="100px"
                            src={
                              data
                                ? `${Route.SERVER_URLL}/${data.other_document}`
                                : Route.BLANK_LINK
                            }
                            alt="..."
                          />
                        </a>
                        {/* <div className="form-group upload-input-sty">
                        <p className="upload-icon text-center">
                          <i className="far fa-image"></i>
                        </p>
                      </div> */}
                        <p className="text-center">Other Document</p>
                      </div>
                    </div>
                  </div>
                  {/* <div className="col-md-12 my-5 ">
                  <button
                    type="button"
                    data-toggle="modal"
                    data-target="#exampleModalCentered"
                    className="btn btn-success btn-green w-25 btn-lg"
                  >
                    Approved
                  </button>
                  <button
                    type="button"
                    className="btn btn-dark w-25 btn-lg ml-3"
                  >
                    Rejected
                  </button>
                </div> */}
                  {/* <!-- Modal --> */}
                  <div
                    className="modal fade bd-example-modal-sm"
                    id="exampleModalCentered"
                    tabIndex="-1"
                    role="dialog"
                    aria-labelledby="exampleModalCenteredLabel"
                    aria-hidden="true"
                  >
                    <div
                      className="modal-dialog modal-sm modal-sm-cu modal-dialog-centered"
                      role="document"
                    >
                      <div className="modal-content">
                        <div className="modal-header border-0">
                          <button
                            type="button"
                            className="close"
                            data-dismiss="modal"
                            aria-label="Close"
                          >
                            <span className="font-18" aria-hidden="true">
                              &times;
                            </span>
                          </button>
                        </div>
                        <div className="modal-body text-center ">
                          <p>
                            You have approved <strong>data</strong> request
                          </p>
                          <button
                            type="button"
                            className="btn btn-primary w-25 btn-md"
                          >
                            Ok
                          </button>
                        </div>
                        <div className="modal-footer border-0"></div>
                      </div>
                    </div>
                  </div>
                  {/* <!--end Modal --> */}
                </div>
              </div>
            </div>
          </div>
          {/* <!-- end inner row --> */}
        </div>
      )}
    </>
  );
};

export default UserDetails;
