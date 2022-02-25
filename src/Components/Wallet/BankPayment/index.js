import React, { useEffect, useState } from "react";

import SubmitConfirmationModal from "./SubmitConfirmationModal";

import { connect, useDispatch, useSelector } from "react-redux";
import { depositPayment,getKycByUserId} from "../../../Redux/actions/actions";
import { toast } from "react-toastify";
import { getBankDetails } from "../../../Services/walletService";

const BankPayment = ({ depositPayment }) => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userStatus, setUserStatus] = useState(undefined);
  const [getUserData, setGetUserData] = useState();
  const [trasnferAmount, setTransferAmount] = useState("");
  const [trasnferFees, setTrasnferFees] = useState("");
  const [totalAmount, setTotalAmount] = useState("");

  console.log("total", totalAmount);
  let userId = localStorage.getItem("user")? 
    JSON.parse(localStorage.getItem("user")).id
  : 0;

  console.log(typeof parseInt(trasnferAmount));
  console.log(typeof parseInt(trasnferFees));

  const [totalAmountState, setTotalAmountState] = useState(true);

  const [bank_draft, setBank_draft] = useState("");
  const [depositForm, setDepositForm] = useState({
    country: "",
    swift: "",
    bank_name: "",
    account_no: "",
    account_name: "",
    from_account: "",
    currency: "",
    // transfer_amount: "",
    // transfer_fee: "",
    // total_amount: "",
  });

  const checkMimeType = (event) => {
    let files = event.target.files[0];
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

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBankDetails());
    dispatch(getKycByUserId({
      userId: userId,
      setUserStatus,
      setGetUserData,
    }))
  }, []); 
  const onChange = (e) => {
    let alpha = e.target.value.replace(/[^A-Za-z ]*$/gm, "");

    if (
      e.target.name === "country" ||
      e.target.name === "bank_name" ||
      e.target.name === "account_name"
    ) {
      setDepositForm({
        ...depositForm,

        [e.target.name]: alpha,
      });
    } else {
      setDepositForm({
        ...depositForm,

        [e.target.name]: e.target.value,
      });
      // setTotalAmount(depositForm.total_amount * depositForm.transfer_fee);
    }
  };
  const onFileChange = (event) => {
    if (checkMimeType(event)) {
      setBank_draft(event.target.files[0]);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();

    // if (
    //   bank_draft === "" ||
    //   depositForm.total_amount === "" ||
    //   depositForm.transfer_fee === "" ||
    //   depositForm.transfer_amount === "" ||
    //   depositForm.currency === "" ||
    //   depositForm.from_account === "" ||
    //   depositForm.account_name === "" ||
    //   depositForm.bank_name === "" ||
    //   depositForm.swift === "" ||
    //   depositForm.country === ""
    // ) {
    //   setError(true);
    // } else {
    //   setError(false);

    setLoading(true);

    const formData = new FormData();

    // Update the formData object
    formData.append("bank_draft", bank_draft);
    formData.append("country", depositForm.country);
    formData.append("swift", getUserData.swift?getUserData.swift: depositForm.swift);
    formData.append("bank_name", getUserData.bank_name?getUserData.bank_name:depositForm.bank_name);
    formData.append("account_no", getUserData.account_number?getUserData.account_number:depositForm.account_no);
    formData.append("account_name", getUserData.account_title?getUserData.account_title:depositForm.account_name);
    formData.append("from_account", depositForm.from_account);
    formData.append("currency", depositForm.currency);
    formData.append("transfer_amount", trasnferAmount);
    formData.append("transfer_fee", trasnferFees);
    formData.append("total_amount", totalAmount);

    depositPayment({
      formData,
      setDepositForm,
      setBank_draft,
      setLoading,
      setTransferAmount,
      setTrasnferFees,
      setTotalAmount,
    });

    // }
  };
  const BankDetails = useSelector((state) => {
    return state?.wallet?.BankDetails?.data;
  });

  const handleChange = (e) => {
    setTransferAmount(e.target.value);

    console.log("ee", typeof e.target.value);
    // setTotalAmount(parseInt(e.target.value) + parseInt trasnferFees));
    setTotalAmount(parseInt(e.target.value));
  };

  const handleTrasnferChange = (e) => {
    setTrasnferFees(e.target.value);
    setTotalAmount(parseInt(e.target.value) + parseInt(trasnferAmount));
  };
  return (
    <div className="col-12 col-md-8 offset-md-2">
      {/* <!-- inner row --> */}
      <div className="row">
        <div className="col-md-12">
          <div
            style={{
              height: 270,
              backgroundColor: "#fff",
              padding: "4%",
              borderRadius: 3,
              border: "1px solid #DFDFDF",
              // borderBlock: "#000",
              // borderWidth: 5,
              // borderColor: "#000",
            }}
          >
            <h3 style={{ paddingBottom: "2%" }}>
              Bank Details To Deposit Funds
            </h3>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
              }}
            >
              <div
                className="form-group row"
                style={{ width: "50%", padding: "0%" }}
              >
                <div className="col-sm-12">
                  <div className="form-group">
                    <label style={{ fontSize: 15, fontWeight: "bold" }}>
                      Bank Name
                    </label>
                    <p> {BankDetails?.bank_name} </p>
                  </div>
                </div>
              </div>
              <div
                className="form-group row"
                style={{ width: "50%", padding: "0%" }}
              >
                <div className="col-sm-12">
                  <div className="form-group">
                    <label style={{ fontSize: 15, fontWeight: "bold" }}>
                      Account Title
                    </label>
                    <p> {BankDetails?.account_title} </p>
                  </div>
                </div>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
              }}
            >
              <div
                className="form-group row"
                style={{ width: "50%", padding: "0%" }}
              >
                <div className="col-sm-12">
                  <div className="form-group">
                    <label style={{ fontSize: 15, fontWeight: "bold" }}>
                      IBAN
                    </label>
                    <p>{BankDetails?.iban} </p>
                  </div>
                </div>
              </div>
              <div
                className="form-group row"
                style={{ width: "50%", padding: "0%" }}
              >
                <div className="col-sm-12">
                  <div className="form-group">
                    <label style={{ fontSize: 15, fontWeight: "bold" }}>
                      Swift Code
                    </label>
                    <p> {BankDetails?.swift_code} </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="card mb-4 mt-4">
            <div className="card-body p-5">
              <h3 style={{ paddingBottom: "4%" }}>Deposit Funds</h3>
              <form className="form" onSubmit={onSubmit}>
                <div className="form-group row">
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label className="">Country</label>
                      <input
                        type="text"
                        placeholder="Country"
                        className="form-control py-4"
                        name="country"
                        value={depositForm.country}
                        onChange={onChange}
                        required
                      />
                      {error && depositForm.country === "" ? (
                        <div className="error-msg"> Country is required </div>
                      ) : null}
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label className="">Swift zzzzzzzzzzzzzzzzzzz</label>
                      <input
                        type="text"
                        placeholder="Swift Code"
                        className="form-control py-4"
                        name="swift"
                        disabled={userStatus}
                        value={userStatus?getUserData.swift:depositForm.swift}
                        onChange={onChange}
                        required
                      />
                      {console.log(getUserData)}
                      {error && depositForm.swift === "" ? (
                        <div className="error-msg"> SWIFT is required </div>
                      ) : null}
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label className="">Bank/Branch Name</label>

                      <input
                        type="text"
                        placeholder="Bank/Branch Name"
                        className="form-control py-4"
                        name="bank_name"
                        disabled={userStatus}
                        value={userStatus?getUserData.bank_name:depositForm.bank_name}
                        onChange={onChange}
                        required
                      />
                      {error && depositForm.bank_name === "" ? (
                        <div className="error-msg">
                          {" "}
                          Bank/Branch Name is required{" "}
                        </div>
                      ) : null}
                    </div>
                  </div>

                  <div className="col-sm-6">
                    <div className="form-group">
                      <label className="">Account Number</label>
                      <input
                        type="text"
                        placeholder="Account Number"
                        className="form-control py-4"
                        name="account_no"
                        disabled={userStatus}
                        value={userStatus?getUserData.account_number:depositForm.account_no}
                        onChange={onChange}
                        required
                      />
                      {error && depositForm.account_no === "" ? (
                        <div className="error-msg">
                          {" "}
                          Account Number is required{" "}
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label className="">Account Name</label>

                      <input
                        type="text"
                        placeholder="Account Name"
                        className="form-control py-4"
                        name="account_name"
                        disabled={userStatus}
                        value={userStatus?getUserData.account_title:depositForm.account_name}
                        onChange={onChange}
                        required
                      />
                      {error && depositForm.account_name === "" ? (
                        <div className="error-msg">
                          {" "}
                          Account Name is required{" "}
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label className="">From Account Number</label>

                      <input
                        type="number"
                        placeholder="From Account Number"
                        className="form-control py-4"
                        name="from_account"
                        value={depositForm.from_account}
                        onChange={onChange}
                        required
                      />
                      {error && depositForm.from_account === "" ? (
                        <div className="error-msg">
                          {" "}
                          From Account Number is required{" "}
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label className="d-block">Transfer Currency</label>
                      {/* <input
                        type="text"
                        placeholder="Transfer Currency"
                        className="form-control py-4"
                        name="currency"
                        value={depositForm.currency}
                        onChange={onChange}
                        required
                      /> */}
                      <select
                        className="form-control custom-select-currency"
                        onChange={onChange}
                        name="currency"
                        value={depositForm.currency}
                      >
                        <option
                          defaultChecked
                          value=""
                          disabled
                          className="select_currency_placeholder"
                        >
                          Select Currency
                        </option>
                        <option value="pkr">PKR</option>
                        <option value="usd">USD</option>
                        <option value="aed">AED</option>
                        <option value="eur">EURO</option>
                        <option value="gbp">GBP</option>
                      </select>
                      {error && depositForm.currency === "" ? (
                        <div className="error-msg">
                          {" "}
                          Transfer Currency is required{" "}
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label className="">Transfer Amount</label>
                      <input
                        type="number"
                        placeholder="Transfer Amount"
                        className="form-control py-4"
                        name="transfer_amount"
                        value={trasnferAmount}
                        onChange={handleChange}
                        required
                      />
                      {error && depositForm.transfer_amount === "" ? (
                        <div className="error-msg">
                          {" "}
                          Transfer Amount is required{" "}
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label className="">Transfer Fee</label>
                      <input
                        type="number"
                        placeholder="Transfer Fee"
                        className="form-control py-4"
                        name="transfer_fee"
                        value={trasnferFees}
                        onChange={handleTrasnferChange}
                        required
                      />
                      {error && depositForm.transfer_fee === "" ? (
                        <div className="error-msg">
                          {" "}
                          Transfer Feeis required{" "}
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label className="">Total Amount</label>

                      <input
                        type="number"
                        placeholder="Total Amount"
                        className="form-control py-4"
                        name="total_amount"
                        value={depositForm.total_amount}
                        disabled={totalAmountState}
                        value={totalAmount === NaN ? 0 : totalAmount}
                        // onChange={onChange}
                        required
                      />
                      {error && depositForm.total_amount === "" ? (
                        <div className="error-msg">
                          {" "}
                          Total Amount is required{" "}
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className="col-sm-12">
                    <div className="row">
                      <div className="col-sm-4">
                        <div
                          className="form-group upload-input-sty"
                          style={{ margin: "auto" }}
                        >
                          {/* <p className="upload-icon">
                            <i className="far fa-image"></i>
                          </p> */}
                          <label htmlFor="exampleFormControlFile1">
                            Upload Bank Draft
                            <i className="fas fa-plus-circle"></i>
                          </label>
                          <input
                            type="file"
                            onChange={onFileChange}
                            className="form-control-file"
                            id="exampleFormControlFile1"
                            // required
                          />
                        </div>

                        <p className="font-weight-bold ml-3 mt-2">
                          {" "}
                          {bank_draft.name || ""}
                        </p>
                        {/* {error && bank_draft === "" ? (
                          <div className="error-msg">
                            {" "}
                            Bank Draft is required{" "}
                          </div>
                        ) : null} */}
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-12 text-center mt-3">
                    <button
                      type="submit"
                      // data-toggle="modal"
                      // data-target="#exampleModalCentered"
                      className="btn btn-dark w-25 btn-lg"
                      disabled={loading}
                    >
                      {loading && (
                        <span className="spinner-border spinner-border-sm"></span>
                      )}{" "}
                      SUBMIT
                    </button>
                  </div>
                  {/* <!-- Modal --> */}
                  {/* <SubmitConfirmationModal /> */}

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
                            Payment details submitted{" "}
                            <strong>successfully</strong>
                          </p>
                          <button
                            type="button"
                            className="btn btn-primary w-25 btn-md"
                            data-dismiss="modal"
                            aria-label="Close"
                          >
                            OK
                          </button>
                        </div>
                        <div className="modal-footer border-0"></div>
                      </div>
                    </div>
                  </div>
                  {/* <!--end Modal --> */}
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

export default connect(null, { depositPayment })(BankPayment);
