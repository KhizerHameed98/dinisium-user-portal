import React from "react";
import { connect } from "react-redux";
const TokenDetail = ({
  exchange: {
    tokenData: { data },
    tokenSelected,
  },
}) => {
  return (
    <div className="row">
      <div className="col-12 col-sm-4">
        <h6>Token Name</h6>
        <div className="card mb-3">
          <div className="card-body bg-lit-gr py-2 px-3">
            <p className="font-12 text-center mb-0 text-justify">
              {tokenSelected && data
                ? data.token_name || "Token Name?"
                : "Token Name?"}
            </p>
          </div>
        </div>
      </div>
      <div className="col-12 col-sm-4">
        <h6>Token Symbol</h6>
        <div className="card mb-3">
          <div className="card-body bg-lit-gr py-2 px-3">
            <p className="font-12 text-center mb-0 text-justify">
              {tokenSelected && data
                ? data.token_symbol || "Token Symbol?"
                : "Token Symbol?"}
            </p>
          </div>
        </div>
      </div>
      <div className="col-12 col-sm-4">
        <h6>Token Status</h6>
        <div className="card mb-3">
          <div className="card-body bg-lit-gr py-2 px-3">
            <p className="font-12 text-center mb-0 text-justify">
              {/* {tokenSelected && data
                ? data.ito_status || "ITO Status?"
                : "ITO Status?"} */}
              {tokenSelected && data ? "Ongoing" : "Status?"}
            </p>
          </div>
        </div>
      </div>
      {/* <div className="col-12 text-center">
        <div id="circleProgress2" className="progressbar-js-circle-2">
          <svg viewBox="0 0 100 100">
            <path
              d="M 50,50 m 0,-48 a 48,48 0 1 1 0,96 a 48,48 0 1 1 0,-96"
              // stroke="#eee"
              // stroke-width="4"
              // fill-opacity="0"
              style={{
                stroke: "#eee",
                strokeWidth: "4",
                fillOpacity: "0",
              }}
            ></path>
            <path
              d="M 50,50 m 0,-48 a 48,48 0 1 1 0,96 a 48,48 0 1 1 0,-96"
              style={{
                strokeDasharray: "301.635, 301.635",
                strokeDashoffset: " 199.079",
                strokeWidth: "4",
                fillOpacity: "0",
                stroke: "gray",
              }}
              // stroke="rgb(55, 109, 194)"
              // stroke-width="4"
              // fill-opacity="0"
              // style="stroke-dasharray: 301.635, 301.635; stroke-dashoffset: 199.079;"
            ></path>
          </svg>
          <div
            className="progressbar-text"
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              padding: "0px",
              margin: "0px",
              transform: "inherit",
              color: "black",
              fontSize: "0.8rem",
            }}
            //   style="position: absolute; left: 50%; top: 50%; padding: 0px; margin: 0px; transform: translate(-50%, -50%); color: rgb(0, 0, 0); font-size: 0.8rem;"
          >
            34%
          </div>
        </div>
      </div> */}
    </div>
  );
};

const mapStateToProps = (state) => ({
  exchange: state.exchange,
});

export default connect(mapStateToProps, null)(TokenDetail);
