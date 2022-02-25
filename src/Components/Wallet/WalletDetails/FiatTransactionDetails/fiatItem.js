import React from "react";
import Moment from "react-moment";

const FiatItem = ({
  item: {
    token_name,
    amount,
    created_at,
    currency,
    id,
    ito_series,
    user_id,
    transaction_status,
    transaction_hash,
  },
}) => {
  return (
    <>
      <td>{token_name || ""}</td>
      <td>{amount || ""}</td>
      <td>{currency || ""}</td>
      <td className="fn-500">{transaction_status || ""}</td>
      <td className="fn-500">
        {ito_series ? "Buy Order" : "Sell Order" || ""}
      </td>
      <td className="fn-500">{transaction_hash || ""}</td>

      <td style={{ whiteSpace: "nowrap" }}>
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

export default FiatItem;
