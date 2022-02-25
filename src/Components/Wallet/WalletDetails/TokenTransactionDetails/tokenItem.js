import React from "react";
import Moment from "react-moment";

const TokenItem = ({
  item: {
    user_firstname,
    user_lastname,
    token_transaction_status,
    token,
    transform_hash,
    created_at,
  },
}) => {
  return (
    <>
      <td className="fn-600">{user_firstname + " " + user_lastname || ""}</td>

      <td>{token || ""}</td>

      <td className="fn-500">{token_transaction_status || ""}</td>
      <td>{transform_hash || ""}</td>

      <td style={{ whiteSpace: "nowrap" }}>
        {" "}
        <span className="pro-date mb-0">
          <i className="far fa-calendar mr-1"></i>
          <Moment format="D MMM YYYY" withTitle>
            {created_at || ""}
          </Moment>
        </span>
      </td>
    </>
  );
};

export default TokenItem;
