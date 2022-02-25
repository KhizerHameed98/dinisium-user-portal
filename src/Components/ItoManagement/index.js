import React from "react";
import Ongoing from "./Ongoing";
import Upcoming from "./Upcoming/index";
import Past from "./Past/index";
import { Link } from "react-router-dom";

import Route from "../../Constants/browserRoutes";

const ITOManagement = () => {
  return (
    <div className="col-12 col-md-10 offset-md-1">
      {/* <!-- inner row --> */}
      <div className="row">
        <div className="col-md-12 mb-2">
          <h2 className="tbl-small-heading d-inline font-24">Ongoing ITO </h2>
          <Link
            className="exp-mr-link text-dr-green"
            to={Route.CREATE_NEW_SERIES}
          >
            ADD NEW SERIES <i className="fa fa-plus-circle ml-1 font-24"></i>
          </Link>
        </div>
        <div className="col-md-12">
          <Ongoing />
        </div>

        <div className="col-md-12 my-2">
          <h2 className="tbl-small-heading d-inline font-24">Upcoming</h2>
        </div>
        <div className="col-md-12">
          <Upcoming />
        </div>

        <div className="col-md-12 my-2">
          <h2 className="tbl-small-heading d-inline font-24">Past</h2>
        </div>

        <div className="col-md-12">
          <Past />
        </div>
      </div>
      {/* <!-- end inner row --> */}
    </div>
  );
};

export default ITOManagement;
