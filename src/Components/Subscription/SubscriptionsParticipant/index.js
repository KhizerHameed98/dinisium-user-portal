import React, { useEffect, useState } from "react";
import Moment from "react-moment";
import { Link, useHistory } from "react-router-dom";
import browserRoute from "../../../Constants/browserRoutes";
import Calculator from "./Calculator";
import Invest from "./Invest";

const SubscriptionsParticipant = ({ location }) => {
  const history = useHistory();
  const {
    id,
    ito_name,
    ito_token,
    threshold,
    current,
    threshold_type,
    description,
    start_date,
    end_date,
    term_sheets,
  } = history.location.state || {};

  return (
    <div className="col-12 col-md-10 offset-md-1">
      {/* <!-- inner row --> */}
      <div className="row">
        <div className="col-md-12">
          <div className="row">
            <div className="col-md-9">
              <div className="row">
                <div className="col-12">
                  <h4 className="font-18">Participate in subscription</h4>
                </div>
                <div className="col-md-7">
                  <div className="card text-dark font-weight-bold mb-4">
                    <div className="card-body py-2 px-2">
                      <div className="d-inline-block">
                        <p className="mb-0">{ito_token}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-5">
                  <div className="card text-dark font-weight-bold mb-4">
                    <div className="card-body py-2 px-2">
                      <div className="d-inline-block">
                        <p className="mb-0">
                          <span className="pro-date border-0 mb-0">
                            <i className="far fa-calendar"></i>
                            <Moment format="DD MMM YYYY">
                              {start_date}
                            </Moment> -{" "}
                            <Moment format="DD MMM YYYY">{end_date}</Moment>
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card bg-cr-1 text-white mb-4">
                <div className="card-body d-flex justify-content-between flex-wrap">
                  {/* <div className="d-inline-block mr-3">
                    <span className="dashboard-cd-blc">Price</span>
                    <p className="dashboard-cd-amot">{token_price}$</p>
                  </div> */}
                  {threshold_type === "limited" ? (
                    <>
                      <div className="d-inline-block">
                        <span className="dashboard-cd-blc">
                          Remaining Threshold
                        </span>
                        <p className="dashboard-cd-amot">
                          <small>$</small> {threshold - current}
                        </p>
                      </div>
                      <div className="d-inline-block float-right">
                        <span className="dashboard-cd-blc">
                          Total Threshold
                        </span>
                        <p className="dashboard-cd-amot">
                          <small>$</small> {threshold}
                        </p>
                      </div>
                    </>
                  ) : (
                    <div className="row flex">
                      <div className="mr-3">
                        <span className="dashboard-cd-blc">
                          Minimum Threshold
                        </span>
                        <p className="dashboard-cd-amot">
                          <small>$</small> {threshold}
                        </p>
                      </div>
                      <div className="">
                        <span className="dashboard-cd-blc">Raised</span>
                        <p className="dashboard-cd-amot">
                          <small>$</small> {current || 0}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-5">
          <div className="card mb-4">
            <div className="card-body bg-lit-gr">
              <h4 className="font-18">Description</h4>
              <p className="font-14 text-justify">{description}</p>
              <div className="mt-4">
                <b>Term Sheets</b>
                <ul>
                  {term_sheets?.map((termSheet, index) => (
                    <li>
                      <a
                        target="_blank"
                        href={`${browserRoute.HOST}/${termSheet}`}
                      >
                        Term Sheet {index + 1}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-7">
          <Invest
            id={id}
            threshold={threshold}
            current={current}
            threshold_type={threshold_type}
          />
        </div>
      </div>
      {/* <!-- end inner row --> */}

      {/* <!-- inner row --> */}
      <div className="row">
        <div className="col-md-5">
          <div className="row flex ml-1">
            <div className="mr-3">
              <h6>Token Name</h6>
              <div className="card mb-3">
                <div className="card-body bg-lit-gr py-2 px-3">
                  <p className="font-12 text-center mb-0 text-justify">
                    {ito_token}
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h6>ITO Name</h6>
              <div className="card mb-3">
                <div className="card-body bg-lit-gr py-2 px-3">
                  <p className="font-12 text-center mb-0 text-justify">
                    {ito_name}
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
                    padding: "0",
                    margin: "0",
                    transform: "inherit",
                    color: "red",
                    fontSize: "400",
                  }}
                  // style="position: absolute; left: 50%; top: 50%; padding: 0px; margin: 0px; transform: translate(-50%, -50%); color: rgb(0, 0, 0); font-size: 0.8rem;"
                >
                  34%
                </div>
              </div>
            </div> */}
          </div>
        </div>
        {/* <div className="col-md-7">
          <Calculator tokenPrice={token_price} />
        </div> */}
      </div>
      {/* <!-- end inner row --> */}
    </div>
  );
};

export default SubscriptionsParticipant;
