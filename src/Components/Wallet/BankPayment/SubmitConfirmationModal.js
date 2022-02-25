import React from "react";

const SubmitConfirmationModal = () => {
  return (
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
              Payment details submitted <strong>successfully</strong>
            </p>
            <button type="button" className="btn btn-primary w-25 btn-md">
              Ok
            </button>
          </div>
          <div className="modal-footer border-0"></div>
        </div>
      </div>
    </div>
  );
};

export default SubmitConfirmationModal;
