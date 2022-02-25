import React from "react";

const TransferItem = ({ item }) => {
  return (
    <>
      <td className="fn-600">
        <div className="icon-flex">
          <div className="icon-wrapper">
            <i className="fas fa-user"></i>
          </div>
        </div>

        {item && item.fname + " " + item.lname}
      </td>

      <td className="text-dr-blu">{item && item.email}</td>
      <td>{item && item.country}</td>
      <td>
        <button
          className="dls-btn bg-semi-black text-white"
          data-toggle="modal"
          data-target="#exampleModalCentered"
        >
          Tranfer
        </button>
      </td>

      {/* <!--agree Modal --> */}
      <div
        className="modal fade bd-example-modal-sm"
        id="exampleModalCentered"
        // tabindex="-1"
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
              <h3> Tranfer Ammount</h3>
              <hr />
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
              <form className="form">
                <div className="form-group row">
                  <div className="col-sm-12">
                    <div className="form-group">
                      <label>To Address</label>
                      <input
                        type="text"
                        placeholder="To Address"
                        className="form-control"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>To Address</label>

                      <input
                        type="text"
                        placeholder="From Address"
                        className="form-control"
                        required
                      />
                    </div>
                  </div>
                </div>
              </form>

              <button
                type="button"
                className="btn btn-primary btn-md"
                data-dismiss="modal"
                aria-label="Close"
              >
                Transfer
              </button>
            </div>
            <div className="modal-footer border-0"></div>
          </div>
        </div>
      </div>
      {/* <!--end Modal --> */}
    </>
  );
};

export default TransferItem;
