import React from "react";

const OrderListItem = ({
  item: {
    transaction_hash,
    token_name,
    token_symbol,
    order_type,
    status,
    amount,
    price_limit,
  },
}) => {
  return (
    <>
      <td>{token_name}</td>
      <td>{token_symbol}</td>
      <td>{order_type}</td>
      {/* text-dr-pink --> red color */}
      <td className="text-dr-green">{status}</td>
      <td>{amount}</td>
      <td>{price_limit || "Market Price"}</td>
      <td>{transaction_hash}</td>
    </>
  );
};

export default OrderListItem;
