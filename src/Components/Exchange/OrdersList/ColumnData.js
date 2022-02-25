// import { approveWithdraw } from "../../../Services/approveWithdraw";
import { Modal, Button, Form } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import UpdationModal from "./UpdationModal";
import moment from "moment";
import Tooltip from "@material-ui/core/Tooltip";

export const columns = (handleShow, readMore, setReadMore) => {
  return [
    { title: "Token Name	", field: "token_name" },
    { title: "Token Symbol	", field: "token_symbol" },
    { title: "Order Type	", field: "order_type" },
    { title: "Status	", field: "status" },
    {
      title: "Amount",
      render: (rowData) => {
        // console.log("%c ROW data is", "font-size: 2rem", rowData);
        if (rowData?.spreadedamount === null) {
          return "";
        } else {
          const spreadAmount = parseFloat(rowData?.spreadedamount);
          return spreadAmount?.toFixed(2);
        }
      },
    },

    { title: "Tokens", field: "tokens" },
    // { title: "Price Limit	", field: "price_limit" },

    // {
    //   title: "Token Price",
    //   render: (rowData) => {
    //     return `${rowData.token_price?.toFixed(4)}`;
    //   },
    // },

    {
      title: "Token Price",
      render: (rowData) => {
        if (rowData?.token_price === null) {
          return 0;
        } else {
          return (rowData?.spreadedamount / rowData?.tokens)?.toFixed(2);
        }
      },
    },

    // { title: "Transaction Hash", field: "transaction_hash" },

    // { title: "Date", field: "created_at" },

    // {
    //   title: "Hash",
    //   render: (rowData) => {
    //     return `${rowData.transaction_hash.substring(0, 10)}.....`;
    //   },
    // },

    {
      title: "Transaction Hash",
      render: (rowData) => {
        // return `${
        //   rowData?.transaction_hash == undefined
        //     ? " "
        //     : `${rowData?.transaction_hash.substring(0, 10)}...`
        // }`;
        if (rowData?.transaction_hash == undefined) {
          return "";
        } else {
          return (
            <Tooltip title={rowData?.transaction_hash} placement="top">
              <p> {`${rowData?.transaction_hash.substring(0, 10)}....`}</p>
            </Tooltip>
          );
        }
      },
    },

    // { title: "Date", field: "created_at" },

    {
      title: "Date",
      render: (rowData) => {
        return `${moment(rowData.created_at).format("YYYY-MM-DD " + "h:mm:a")}`;
      },
    },
    {
      title: null,
      field: "button",

      // key = "ito_token_id",
      render: (rowData) => (
        <>
          {rowData.status == "pending" ? (
            <>
              {" "}
              <button
                style={{ marginRight: "3%" }}
                className="dls-btn bg-semi-black text-white width-max-content"
                onClick={() => {
                  handleShow({
                    type: false,
                    data: rowData,
                  });
                }}
              >
                Update
              </button>
              <button
                style={{ marginRight: "10%", marginTop: "10px" }}
                className="dls-btn bg-semi-black text-white width-max-content"
                onClick={(e) => {
                  e.preventDefault();
                  handleShow({
                    type: true,
                    data: rowData,
                  });
                }}
              >
                Cancel
              </button>{" "}
            </>
          ) : null}
        </>
      ),
    },
  ];
};
