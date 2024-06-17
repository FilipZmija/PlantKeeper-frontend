// src/MyChart.js
import React, { useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  displayReadableDate,
  displayReadableShortDate,
  getDate,
} from "../../../helpers/date";

const data = [
  { name: getDate(-6).getTime(), pv: 24 },
  { name: getDate(-5).getTime(), pv: 13 },
  { name: getDate(-4).getTime(), pv: 98 },
  { name: getDate(-3).getTime(), pv: 39 },
  { name: getDate(-2).getTime(), pv: 48 },
  { name: getDate(-1).getTime(), pv: 38 },
  { name: getDate(0).getTime(), pv: 43 },
];

const MyChart = () => {
  const [expanded, setExpanded] = React.useState(false);
  useEffect(() => {
    setExpanded(true);
  }, []);

  return (
    <div
      className={`${
        expanded ? "max-h-20" : "max-h-4"
      } transition-max-h duration-300 overflow-hidden`}
    >
      <ResponsiveContainer height={80}>
        <LineChart
          data={data}
          margin={{ top: 5, right: 25, left: -25, bottom: 0 }}
        >
          <XAxis
            dataKey="name"
            domain={["auto", "auto"]}
            name="Date"
            type="number"
            scale="time"
            tickFormatter={(tick) => displayReadableShortDate(new Date(tick))}
          />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />

          <Tooltip
            labelFormatter={(value) => displayReadableDate(new Date(value))}
          />
          <Line type="monotone" dataKey="pv" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MyChart;
