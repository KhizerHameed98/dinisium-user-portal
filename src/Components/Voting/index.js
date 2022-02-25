import React, { useState, useEffect } from "react";
import OngoingVoting from "./OngoingVoting/index";
import SelectITO from "./SelectITO/index";
import UpcomingVoting from "./UpcomingVoting/index";
import PastVoting from "./PastVoting/index";
import { Link } from "react-router-dom";
import Route from "../../Constants/browserRoutes";

import { connect } from "react-redux";
import { getAllITO } from "../../Redux/actions/actions";

const Voting = ({ getAllITO, voting: { itoList } }) => {
  const [selectedITO, setSelectedITO] = useState("");

  useEffect(() => {
    // getAllITO();
  }, []);

  const handleSelectITO = (e) => {
    setSelectedITO(e.target.value);
  };

  return (
    <>
      <div className="col-12 col-md-10 offset-md-1">
        {/* <!-- inner row --> */}
        <div className="row">
          <div className="col-md-12 mb-2">
            {/* <Link
              className="exp-mr-link text-dr-green"
              to={Route.CREATE_NEW_VOTE}
            >
              Create Election
              <i className="fa fa-plus-circle ml-1 font-24"></i>
            </Link> */}
          </div>
          <div className="col-sm-12">
            <div className="selct-drop d-block  ">
              {/* <select
                className="custom-select d-inline mb-2 float-right w-50"
                onChange={handleSelectITO}
              >
                <option defaultChecked value="">
                  Select ITO
                </option>
                {itoList.map((ito, index) => (
                  <option value={ito.id} key={ito.id}>
                    {ito.name}
                  </option>
                ))}
              </select> */}
              {/* <select className="custom-select d-inline mb-2 float-right w-50">
                <option defaultChecked>Select ITO</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select> */}
              {/* <SelectITO/> */}
            </div>
          </div>
          <div className="col-md-12">
            {/* OngoingVoting compo */}
            <OngoingVoting ito_id={selectedITO} />
          </div>

          <div className="col-md-12 mb-2"></div>
          <div className="col-md-12">
            {/* UpcomingVoting compo */}
            <UpcomingVoting ito_id={selectedITO} />
          </div>

          <div className="col-md-12 mb-2">
            <h2 className="page-title-heading font-24">Past</h2>
          </div>

          <div className="col-md-12">
            {/* PastVoting compo */}
            <PastVoting ito_id={selectedITO} />
          </div>
        </div>
        {/* <!-- end inner row --> */}
      </div>
    </>
  );
};

const mpaStateToProps = (state) => {
  return {
    voting: state.voting,
  };
};

export default connect(mpaStateToProps, {
  getAllITO,
})(Voting);
