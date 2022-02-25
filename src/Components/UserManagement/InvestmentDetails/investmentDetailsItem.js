import React from 'react';


const InvestmentDetailsItem = ({ investmentDetailsData }) => {
  return (
    <>
      <td>{investmentDetailsData.name}</td>
      <td>{investmentDetailsData.amount}</td>
      <td>{investmentDetailsData.country}</td>
      <td className="text-dr-green">{investmentDetailsData.status}</td>
      <td>{investmentDetailsData.ITOSeriec}</td>
      <td>{investmentDetailsData.ITOName}</td>
      <th>{investmentDetailsData.time}</th>
      <th>{investmentDetailsData.date}</th>
    </>
  );
}
 
export default InvestmentDetailsItem;