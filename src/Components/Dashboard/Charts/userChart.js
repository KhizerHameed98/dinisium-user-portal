import React, { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
  Rectangle,
} from "recharts";
import "../../../App/Assets/css/new-style.css";

const UserChart = ({ chartData }) => {
  const [maxNum, setMaxNum] = useState(0);
  const data = chartData;
  console.log("data is", data);
  for (var i = 0; i < data?.length; i++) {
    if (parseInt(data[i].total_worth) > maxNum) {
      setMaxNum(parseInt(data[i].total_worth));
    }
  }
  return (
    <div>
      <ResponsiveContainer width="100%" height="100%" minHeight={400}>
        <BarChart width={150} height={40} data={chartData}>
          <Bar barSize={40} dataKey={"holdings"} fill="#006dc2" />
          <XAxis type="category" dataKey="token_name" />
          <YAxis dataKey="Amount_of_tokens" />
          <Legend />
          <Tooltip cursor={{ fill: "none" }} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default UserChart;
