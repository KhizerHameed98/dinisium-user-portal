import React from "react";

const SubscriptionItem = ({
  item: { ito_token, ito_series, description, threshold, current },
}) => {
  return (
    <div className="subs-main-crd">
      <div className="dash-sub-list-heading">
        <h4>{ito_token || ""}</h4>{" "}
        <span className="sub-lable bg-cr-2 float-right">
          {ito_series || ""}
        </span>
      </div>
      <p>{description || ""}</p>
      <div className="dash-sub-list-footer">
        <span className="sub-lable bg-cr-3 text-dark font-weight-bold">
          Threshold ${threshold || ""}
        </span>
        <div className="sub-progress">
          <div className="progress">
            <div
              className="progress-bar"
              role="progressbar"
              style={{
                width: `${(current / threshold) * 100}%`,
              }}
              // style="width: 65%;"
              //   aria-valuenow={`${(current / threshold) * 100}`}
              aria-valuenow="25"
              aria-valuemin="0"
              aria-valuemax="100"
            >
              {(current / threshold) * 100 || "0"} %
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionItem;
