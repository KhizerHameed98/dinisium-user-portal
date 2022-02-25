export const columns = (handleShow) => {
  return [
    { title: "Token Name", field: "token_name" },
    { title: "Tokens", field: "holdings" },
    {
      title: "Token Price",
      render: (rowData) => {
        return `${parseFloat(rowData.price).toFixed(3)}`
      }
    },
    {
      title: "Value",
      render: (rowData) => {
        return `$${parseFloat(rowData.price * rowData.holdings).toFixed(3)}`;
      },
    },

    // {
    //   title: null,
    //   field: "button",
    //   render: (rowData) => (
    //     <>
    //       {/* <button
    //         className="dls-btn bg-semi-black text-white width-max-content"
    //         onClick={handleShow}
    //       >
    //         Transfer
    //       </button> */}
    //     </>
    //   ),
    // },
  ];
};
