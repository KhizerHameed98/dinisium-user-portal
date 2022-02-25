import React, { Fragment } from "react";
import Route from "../../../Constants/browserRoutes";
import { Link } from "react-router-dom";
import Moment from "react-moment";

const UpcmminngSubscriptionItem = ({
  item: { id, ito_name, ito_token, threshold, current, start_date, end_date },
}) => {
  return (
    <Fragment>
      <td>
        <p className="mb-0">{ito_name}</p>
      </td>
      <td>
        <p className="mb-0">{ito_token}</p>
      </td>
      <td>
        <p className="mb-0">$ {threshold}</p>
      </td>
      <td>
        <p className="mb-0">$ {current}</p>
      </td>
      <td>
        <span className="pro-date mb-0">
          <i className="far fa-calendar"></i>{" "}
          <Moment format="DD MMM YYYY">{start_date}</Moment> {"-"}
          <Moment format="DD MMM YYYY">{end_date}</Moment>
        </span>
      </td>
    </Fragment>
  );
};

export default UpcmminngSubscriptionItem;
