import React from "react";
import { Link } from "react-router-dom";
import Route from "../../../Constants/browserRoutes";
import Moment from "react-moment";

const UpCommingVotingItem = ({ item: { name, start_date, end_date, id } }) => {
  return (
    <>
      <td>{name}</td>
      <td>
        <Moment format="D MMM YYYY" withTitle>
          {start_date}
        </Moment>
      </td>
      <td>
        <Moment format="D MMM YYYY" withTitle>
          {end_date}
        </Moment>
      </td>
      <td>
        <Link
          className="dls-btn bg-semi-black text-white"
          //   href="voting-ongoing.html"
          to={{
            pathname: Route.VOTING_DETAILS_BTN + `${id}`,
            state: { status: "upcoming" },
          }}
        >
          View Results
        </Link>
      </td>
    </>
  );
};

export default UpCommingVotingItem;
