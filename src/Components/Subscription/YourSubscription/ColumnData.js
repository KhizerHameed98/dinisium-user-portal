import moment from "moment";
export const columns = [
  { title: "ITO Name", field: "ito_name" },
  { title: "Token Name", field: "ito_token" },
  { title: "Series Name", field: "ito_series" },
  { title: "Investments", field: "investment" },
  // { title: "Tokens", field: "token_price" },
  // { title: "Start Date", field: "start_date" },
  {
    title: "Start Date",
    render: (rowData) => {
      return `${moment(rowData.start_date).format("YYYY-MM-DD")}`;
    },
  },
  // { title: "End Date", field: "end_date" },
  {
    title: "End Date",
    render: (rowData) => {
      return `${moment(rowData.end_date).format("YYYY-MM-DD")}`;
    },
  },
];
