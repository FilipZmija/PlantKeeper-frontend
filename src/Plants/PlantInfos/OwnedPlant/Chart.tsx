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
import { displayReadableShortDate, getDate } from "../../../helpers/date";

const data = [
  { name: displayReadableShortDate(getDate(-6)), pv: 24 },
  { name: displayReadableShortDate(getDate(-5)), pv: 13 },
  { name: displayReadableShortDate(getDate(-4)), pv: 98 },
  { name: displayReadableShortDate(getDate(-3)), pv: 39 },
  { name: displayReadableShortDate(getDate(-2)), pv: 48 },
  { name: displayReadableShortDate(getDate(-1)), pv: 38 },
  { name: displayReadableShortDate(getDate(0)), pv: 43 },
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
          <XAxis dataKey="name" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />

          <Tooltip />
          <Line type="monotone" dataKey="pv" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MyChart;
